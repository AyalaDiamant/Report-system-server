// controllers/fileController.js
const File = require('../models/file.model');
const multer = require('multer');
const path = require('path');

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
  