const express = require('express');
const router = express.Router();
const report = require('../controllers/report.controller');
const { verifyToken, checkIsAdmin } = require('../middelwares/token.middelware');

router.get('/report', verifyToken,checkIsAdmin, report.getReports);
router.get('/report/:id', verifyToken, report.getReportById);
router.post('/report', verifyToken, report.addReport);
router.put('/report/:id', verifyToken, report.updatedReport);
router.delete('/report/:id', verifyToken, report.deleteReport);

module.exports = router;
