// routes/employee.routes.js
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');

// מסלולים עבור עובדים
router.get('/employee', employeeController.getAllEmployees);
router.get('/employee/:employeeId', employeeController.getEmployeeById);
router.post('/employee', employeeController.createEmployee);
router.put('/employee/:employeeId', employeeController.updateEmployee);
router.delete('/employee/:employeeId', employeeController.deleteEmployee);

module.exports = router;
