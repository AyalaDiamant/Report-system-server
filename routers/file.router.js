// routes/fileRoutes.js
const express = require('express');
const router = express.Router();
const fileController = require('../controllers/file.controller');

// נתיב להעלאת קובץ
router.post('/upload', fileController.uploadFile);
// router.put('/update-status', fileController.updateFileStatus);
router.get('/assigned/:userId', fileController.getAssignedFiles);
router.put('/files/:employeeId/available', fileController.updateAvailable);

module.exports = router;
