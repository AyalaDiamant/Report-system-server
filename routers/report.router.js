const express = require('express');
const router = express.Router();
const report = require('../controllers/report.controller'); 
const { checkIsAdmin } = require('../middlewares/token.middelware');


router.get('/report', report.getReports);
router.post('/report', report.addReport);
router.put('/report/:id', report.updatedReport);
router.delete('/report/:id', report.deleteRport);

module.exports = router;
