

const Employee = require('../models/employee.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

let id = 188;

// קבלת כל העובדים
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees', error });
    }
};

// קבלת עובד לפי ID
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findOne({ _id: req.params.employeeId });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employee', error });
    }
};

exports.createEmployee = async (req, res) => {
    const { name, password, address, city, phoneNumber, bankDetails, roles, project } = req.body;

    try {
        const existingEmployee = await Employee.findOne({ name });
        if (existingEmployee) return res.status(400).send('Employee already exists.');

        const hashedPassword = await bcrypt.hash(password, 10);
        const isAdmin = name === process.env.ADMIN_NAME && password === process.env.ADMIN_PASSWORD;

        const newEmployee = new Employee({
            _id: id++,
            name,
            password: hashedPassword,
            address,
            city,
            phoneNumber,
            bankDetails,
            isAdmin,
            roles,
            project,
            isAvailable: true
        });

        await newEmployee.save();

        const token = jwt.sign({
            _id: newEmployee._id,
            isAdmin: newEmployee.isAdmin
        }, 'config.TOKEN_SECRET');

        res.header('auth-token', token).send({
            token,
            newEmployee
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating employee', error });
    }
};

// עדכון פרטי עובד
exports.updateEmployee = async (req, res) => {
    const { _id, ...data }  = req.body;
    
    try {
        const updatedEmployee = await Employee.findOneAndUpdate(
            { _id: req.params.employeeId },
            data,
            { new: true }
        );        
        
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ message: 'Error updating employee', error });
    }
};

// מחיקת עובד
exports.deleteEmployee = async (req, res) => {
    try {
        const deletedEmployee = await Employee.findOneAndDelete({ _id: req.params.employeeId });
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee', error });
    }
};
