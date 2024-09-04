const express = require('express');
const router = express.Router();
const report = require('../controllers/report.controller'); // ייבוא הפונקציות מהקונטרולר

// הגדרת מסלול לקבלת כל הדוחות
router.get('/reports', report.getReports);

// הגדרת מסלול להוספת דוח חדש
router.post('/reports', report.addReport);

module.exports = router;
