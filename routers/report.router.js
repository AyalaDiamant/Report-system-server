const express = require('express');
const router = express.Router();
const report = require('../controllers/report.controller');
const { verifyToken, checkIsAdmin } = require('../middelwares/token.middelware');

router.get('/report', verifyToken,checkIsAdmin, report.getReports);
router.post('/report', verifyToken, report.addReport);
router.put('/report/:id', verifyToken, checkIsAdmin, report.updatedReport);
router.delete('/report/:id', verifyToken, checkIsAdmin, report.deleteReport);

module.exports = router;
