const jwt = require('jsonwebtoken');
const employeeModel = require('../models/employee.model');
const bcrypt = require('bcrypt');

const getUsersFromDatabase = async () => {
    try {
        const employees = await employeeModel.find();
        return employees;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const checkIsAdmin = async (req, res, next) => {
    const token = req.header('auth-token');
    const employee = jwt.verify(token, 'config.TOKEN_SECRET');
    console.log(employee, 'employee');
    try {
        if (employee.isAdmin) {
            next();
        }
        else {
            return res.status(500).send('No access to a non-admin user');
        }
    } catch (err) {
        console.error("Error fetching users from database:", err);
        return res.status(500).send('No access to a non-admin user');
    }
}

const verifyToken = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send('There is no token.');
    }

    const verified = jwt.verify(token, 'config.TOKEN_SECRET');
    req.user = verified;
    console.log(verified);

    try {
        const employees = await getUsersFromDatabase();
        const employeeExists = employees.some(e => e._id == verified._id);
        if (employeeExists) {
            next();
        } else {
            return res.status(400).send('employee token does not exist.');
        }
    } catch (err) {
        console.error("Error fetching users from database:", err);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    verifyToken,
    checkIsAdmin
};
