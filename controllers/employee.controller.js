const Employee = require('../models/employee.model');

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

// יצירת עובד חדש
exports.createEmployee = async (req, res) => {
    try {
        const { name, email, employeeId, position } = req.body;
        const newEmployee = new Employee({ name, email, employeeId, position });
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ message: 'Error creating employee', error });
    }
};

// עדכון פרטי עובד
exports.updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await Employee.findOneAndUpdate(
            { employeeId: req.params.employeeId },
            req.body,
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
        const deletedEmployee = await Employee.findOneAndDelete({ employeeId: req.params.employeeId });
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee', error });
    }
};
