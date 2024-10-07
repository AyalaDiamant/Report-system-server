// routes/fileRoutes.js
const express = require('express');
const router = express.Router();
const fileController = require('../controllers/file.controller');

// נתיב להעלאת קובץ
router.post('/upload', fileController.uploadFile);
// router.put('/update-status', fileController.updateFileStatus);

module.exports = router;
