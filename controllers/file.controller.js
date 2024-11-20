const File = require('../models/file.model');
const multer = require('multer');
const path = require('path');
const Employee = require('../models/employee.model'); // ייבוא המודל של העובד


// הגדרת ספרייה להעלאת הקבצים
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }).single('file');

// exports.uploadFile = (req, res) => {    
//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(500).json({ message: 'Error uploading file.' });
//     }
//     try {
//       if (!req.file) {
//         return res.status(400).json({ message: 'No file uploaded.' });
//       }

//       const newFile = new File({
//         originalName: req.file.originalname,
//         filePath: req.file.path,
//         uploadedBy: req.body.uploadedBy,
//         status: "מוכן לבדיקה"
//       });

//       await newFile.save();

//       res.status(200).json({ message: 'File uploaded successfully.', file: newFile });
//     } catch (error) {
//       console.error('Error saving file metadata:', error);
//       res.status(500).json({ message: 'Error saving file metadata.' });
//     }
//   });
// };

// file.controller.js
// ------------------
// exports.uploadFile = (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(500).json({ message: 'Error uploading file.' });
//     }
//     try {
//       if (!req.file) {
//         return res.status(400).json({ message: 'No file uploaded.' });
//       }

//       const newFile = new File({
//         originalName: req.file.originalname,
//         filePath: req.file.path,
//         uploadedBy: req.body.uploadedBy,
//         status: "מוכן לבדיקה"
//       });

//       // חיפוש אם יש מבקר פנוי
//       const availableReviewer = await Employee.findOne({
//         isAvailable: true,
//         "roles.name": "ביקורת" // חפש תפקיד בשם "ביקורת" בתוך המערך roles
//       });
//       if (availableReviewer) {
//         newFile.assignedTo = availableReviewer._id;
//         newFile.status = 'בבדיקה';
//         availableReviewer.isAvailable = false;
//         await availableReviewer.save();
//       } else {
//         // אם אין מבקר פנוי, המסמך נכנס לתור הממתינים
//         newFile.isInQueue = true;
//         newFile.status = 'בתור ממתינים';
//       }

//       await newFile.save();
//       res.status(200).json({ message: 'File uploaded successfully.', file: newFile });
//     } catch (error) {
//       console.error('Error saving file metadata:', error);
//       res.status(500).json({ message: 'Error saving file metadata.' });
//     }
//   });
// };
exports.uploadFile = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error uploading file.' });
    }
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
      }

      // חיפוש אם יש מסמך בשם זהה
      const existingFile = await File.findOne({ originalName: req.file.originalname });
      if (existingFile) {
        // אם יש מסמך קיים, נבדוק מי העלה אותו
        if (existingFile.uploadedBy !== req.body.uploadedBy) {
          // אם המעלה הקודם לא היה אותו אדם, נעדכן את המידע במסד נתונים
          existingFile.uploadedBy = req.body.uploadedBy; // עדכון המעלה של המסמך
          existingFile.assignedTo = req.body.uploadedBy; // במקרה הזה, נעדכן גם את המוקצה (למבקר)
          await existingFile.save();
          res.status(200).json({ message: 'המסמך הוקצה בהצלחה למבקר', file: existingFile });
        } else {
          res.status(200).json({ message: 'המסמך כבר הועלה על ידי אותו עובד', file: existingFile });
        }
      } else {
        // אם המסמך לא קיים, ניצור אותו חדש
        const newFile = new File({
          originalName: req.file.originalname,
          filePath: req.file.path,
          uploadedBy: req.body.uploadedBy,
          status: "מוכן לבדיקה"
        });

        // חיפוש אם יש מבקר פנוי
        const availableReviewer = await Employee.findOne({
          isAvailable: true,
          "roles.name": "ביקורת" // חפש תפקיד בשם "ביקורת" בתוך המערך roles
        });

        if (availableReviewer) {
          newFile.assignedTo = availableReviewer._id;
          newFile.status = 'בבדיקה';
          availableReviewer.isAvailable = false;
          await availableReviewer.save();
        } else {
          // אם אין מבקר פנוי, המסמך נכנס לתור הממתינים
          newFile.isInQueue = true;
          newFile.status = 'בתור ממתינים';
        }

        await newFile.save();
        res.status(200).json({ message: 'File uploaded successfully.', file: newFile });
      }
    } catch (error) {
      console.error('Error saving file metadata:', error);
      res.status(500).json({ message: 'Error saving file metadata.' });
    }
  });
};

// file.controller.js
exports.assignFilesFromQueue = async () => {
  const availableReviewer = await Employee.findOne({ isAvailable: true, roles: { $in: ['ביקורת'] } });

  if (availableReviewer) {
    // חיפוש המסמך הראשון בתור הממתינים
    const fileToAssign = await File.findOne({ isInQueue: true }).sort({ dateUploaded: 1 });

    if (fileToAssign) {
      fileToAssign.assignedTo = availableReviewer._id;
      fileToAssign.status = 'בבדיקה';
      fileToAssign.isInQueue = false;
      await fileToAssign.save();

      availableReviewer.isAvailable = false;
      await availableReviewer.save();

      console.log(`Assigned file ${fileToAssign._id} to reviewer ${availableReviewer._id}`);
    }
  }
};

  exports.getAssignedFiles = async (req, res) => {
    const { userId } = req.params; // מקבלים את ה-ID של המשתמש מה-params של ה-URL
  
    try {
      // מחפשים את כל הקבצים שבהם ה-assignedTo תואם ל-userId
      const assignedFiles = await File.find({ assignedTo: userId });
  
      if (!assignedFiles || assignedFiles.length === 0) {
        return res.status(404).json({ message: "לא נמצאו קבצים שבאחריותך" });
      }
  
      // מחזירים את כל הקבצים המוקצים למשתמש
      res.status(200).json({ documents: assignedFiles });
    } catch (error) {
      console.error('Error fetching assigned files:', error);
      res.status(500).json({ message: 'שגיאה בעת הבאת הקבצים' });
    }
  };

  exports.updateAvailable = async (req, res) => {
      try {
          const { employeeId } = req.params; 
          const { isAvailable } = req.body; 
  
          const updatedEmployee = await Employee.findByIdAndUpdate(
              employeeId,
              { isAvailable: isAvailable },
              { new: true } 
          );
  
          if (!updatedEmployee) {
              return res.status(404).json({ message: 'העובד לא נמצא' });
          }
          res.status(200).json({ message: 'הסטטוס עודכן בהצלחה', employee: updatedEmployee });
      } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'שגיאה בעדכון הסטטוס' });
      }
  };

  exports.getAllDocuments = async (req, res) => {
    try {
        const documents = await File.find(); // מחזיר את כל המסמכים מהDB
        res.status(200).json(documents); // החזרת רשימת המסמכים בתגובה
    } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ message: 'שגיאה בעת הבאת המסמכים' });
    }
};


  // exports.uploadFile = (req, res) => { 
//     upload(req, res, async (err) => {
//       if (err) {
//         return res.status(500).json({ message: 'Error uploading file.' });
//       }
//       try {
//         if (!req.file) {
//           return res.status(400).json({ message: 'No file uploaded.' });
//         }
  
//         const newFile = new File({
//           originalName: req.file.originalname,
//           filePath: req.file.path,
//           uploadedBy: req.body.uploadedBy,  // ID של מי שהעלה את הקובץ
//           assignedTo: req.body.assignedTo // למי מוקצה התיקון (מגיהה)
//         });
  
//         await newFile.save();
//         res.status(200).json({ message: 'File uploaded successfully.', file: newFile });
//       } catch (error) {
//         console.error('Error saving file metadata:', error); // הדפסת השגיאה
//         res.status(500).json({ message: 'Error saving file metadata.' });
//       }
//     });
//   };

// exports.uploadFile = (req, res) => {    
//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(500).json({ message: 'Error uploading file.' });
//     }
//     try {
//       if (!req.file) {
//         return res.status(400).json({ message: 'No file uploaded.' });
//       }
      
//       // יצירת אובייקט מסמך חדש עם פרטים בסיסיים
//       const newFile = new File({
//         originalName: req.file.originalname,
//         filePath: req.file.path,
//         uploadedBy: req.body.uploadedBy,  // ID של מי שהעלה את הקובץ
//         status: "מוכן לבדיקה"
//       });
      
//       // שמירת המסמך
//       await newFile.save();

//       // חיפוש מבקר פנוי
//       const availableReviewer = await Employee.findOne({ roles: { $elemMatch: { name: 'ביקורת' } }, isAvailable: true });
      
//       if (availableReviewer) {
//         // עדכון המסמך עם מבקר וסטטוס חדש
//         newFile.assignedTo = availableReviewer._id;
//         newFile.status = "בבדיקה";
//         await newFile.save();

//         // עדכון המבקר כלא פנוי
//         availableReviewer.isAvailable = false;
//         await availableReviewer.save();
//       }

//       res.status(200).json({ message: 'File uploaded successfully.', file: newFile });
//     } catch (error) {
//       console.error('Error saving file metadata:', error); // הדפסת השגיאה
//       res.status(500).json({ message: 'Error saving file metadata.' });
//     }
//   });
// };

  


  