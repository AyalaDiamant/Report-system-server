// controllers/fileController.js
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

exports.uploadFile = (req, res) => {    
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error uploading file.' });
      }
      try {
        // אם req.file הוא undefined, יש בעיה עם multer
        if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded.' });
        }
  
        const newFile = new File({
          originalName: req.file.originalname,
          filePath: req.file.path,
          uploadedBy: req.body.uploadedBy,  // ID של מי שהעלה את הקובץ
          assignedTo: req.body.assignedTo // למי מוקצה התיקון (מגיהה)
        });
  
        await newFile.save();
        res.status(200).json({ message: 'File uploaded successfully.', file: newFile });
      } catch (error) {
        console.error('Error saving file metadata:', error); // הדפסת השגיאה
        res.status(500).json({ message: 'Error saving file metadata.' });
      }
    });
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
  


  