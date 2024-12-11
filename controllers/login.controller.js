const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const employeeModel = require('../models/employee.model');

let id = 20;

const getEmployeesFromDatabase = async () => {    
    try {
        return await employeeModel.find();
    } catch (err) {
        console.error(err);
        throw err;
    }
};

// פונקציה להתחברות
const login = async (req, res) => {
    const { name, password } = req.body;
    
    try {
        const employees = await getEmployeesFromDatabase();
        
        const employee = employees.find(emp => emp.name === name);

        if (employee && await bcrypt.compare(password, employee.password)) {
            const token = jwt.sign({
                _id: employee._id,
                isAdmin: employee.isAdmin
            }, 'config.TOKEN_SECRET');

            res.header('auth-token', token).send({
                token,
                employeeId: employee._id,
                isAdmin: employee.isAdmin,
                name: employee.name,
                employee
            });
        } else {
            res.status(400).send('Invalid credentials.');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Internal Server Error');
    }
};

// פונקציה להתנתקות
const logout = (req, res) => {
    res.setHeader('auth-token', '');
    res.status(200).send('Logout successful');
};

module.exports = {
    login,
    logout
};
