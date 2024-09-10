// routes/settingRoutes.js
const express = require('express');
const router = express.Router();
const settingController = require('../controllers/setting.controller');

// הוספה או עדכון הגדרה
router.post('/setting', settingController.upsertSetting);

// קבלת כל ההגדרות
router.get('/setting', settingController.getAllSettings);

module.exports = router;
