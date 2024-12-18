const express = require('express');
const employeeController = require('../controllers/employee.controller');

const router = express.Router();

// מסלולים עבור העובדים
router.get('/employee', employeeController.getAllEmployees);
router.get('/employee/:employeeId', employeeController.getEmployeeById);
router.post('/employee', employeeController.createEmployee);
router.put('/employee/:employeeId', employeeController.updateEmployee);
router.delete('/employee/:employeeId', employeeController.deleteEmployee);

module.exports = router;
