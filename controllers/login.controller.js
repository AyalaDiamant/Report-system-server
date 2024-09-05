// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const express = require('express');
// const employeeModel = require('../models/employee.model');

// let id = 0;

// const getEmployeesFromDatabase = async () => {
//     try {
//         const employees = await employeeModel.find();
//         return employees;
//     } catch (err) {
//         console.error(err);
//         throw err;
//     }
// };

// const login = async (req, res) => {
//     const name = req.body.name;
//     const password = req.body.password;
//     try {
//         const employees = await getEmployeesFromDatabase();
//         const hashedPassword = await bcrypt.hash(password, 10);
//         for (const emp of employees) {
//             if (emp.name === name && bcrypt.compare(hashedPassword, emp.password)) {
//                 const token = jwt.sign({
//                     _id: emp.id,
//                     name: emp.name,
//                     password: emp.password,
//                     address: emp.address,
//                     city: emp.city,
//                     phoneNumber: emp.phoneNumber,
//                     bankDetails: emp.bankDetails,
//                     isAdmin: emp.isAdmin
//                 }, 'config.TOKEN_SECRET');
//                 const isAdmin = emp.isAdmin
//                 const response = {
//                     token,
//                     employeeId: emp._id,
//                     isAdmin,
//                     newEmployee: emp,
//                 };
//                 return res.header('auth-token', token).send(response);
//             }
//         }
//         res.status(400).send('Employee does not exist.');
//     } catch (error) {
//         console.error('Error retrieving Employees:', error);
//         res.status(500).send('Internal Server Error');
//     }
// };

// const register = async (req, res) => {
//     const { name, password } = req.body;
//     const allData = req.body;

//     try {
//         const existingEmployee = await employeeModel.findOne({ password });
//         if (existingEmployee) {
//             return res.status(400).send('Employee already exists.');
//         }
//         let isAdminFromClient = false;
//         if (name === "Admin" && password === "Admin1Admin")// לשאול את אבא
//             isAdminFromClient = true;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newEmployee = new employeeModel({
//             _id: id++,
//             name: allData.name,
//             password: hashedPassword,
//             address: allData.address,
//             city: allData.city,
//             phoneNumber: allData.phoneNumber,
//             bankDetails: allData.bankDetails,
//             isAdmin: isAdminFromClient,
//         });

//         await newEmployee.save();
//         const token = jwt.sign({
//             _id: newEmployee._id,
//             name: newEmployee.name,
//             password: newEmployee.password,
//             address: newEmployee.address,
//             city: newEmployee.city,
//             phoneNumber: newEmployee.phoneNumber,
//             isAdmin: false,
//         }, 'config.TOKEN_SECRET');
//         res.header('auth-token', token).send({
//             token, name: newEmployee.name,
//             newEmployee,
//         });
//     } catch (error) {
//         console.error('Error registering employee:', error);
//         res.status(500).send('Internal Server Error');
//     }
// };

// const logout = (req, res) => {
//     res.setHeader('auth-token', null);
//     res.status(200).send('Logout successful');
// };

// module.exports = {
//     login,
//     register,
//     logout,
// };


const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const employeeModel = require('../models/employee.model');

let id = 0;

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
                isAdmin: employee.isAdmin
            });
        } else {
            res.status(400).send('Invalid credentials.');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Internal Server Error');
    }
};

// פונקציה להרשמה
const register = async (req, res) => {
    const { name, password, address, city, phoneNumber, bankDetails } = req.body;

    try {
        const existingEmployee = await employeeModel.findOne({ name });
        if (existingEmployee) return res.status(400).send('Employee already exists.');

        const hashedPassword = await bcrypt.hash(password, 10);
        const isAdmin = name === "Admin" && password === "Admin1Admin";

        const newEmployee = new employeeModel({
            _id: id++,
            name,
            password: hashedPassword,
            address,
            city,
            phoneNumber,
            bankDetails,
            isAdmin
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
        console.error('Error registering employee:', error);
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
    register,
    logout
};

