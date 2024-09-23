const express = require('express');
const router = express.Router();
const settingController = require('../controllers/setting.controller');

router.post('/setting', settingController.upsertSetting);
router.get('/setting', settingController.getAllSettings);
router.delete('/setting/delete-role', settingController.deleteRole);
router.delete('/setting/delete-project', settingController.deleteProject);
router.patch('/setting/update-role', settingController.updateRole); // מסלול לעדכון תפקיד

module.exports = router;