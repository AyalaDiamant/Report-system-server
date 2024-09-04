const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const employeeModel = require('../models/employee.model');

let id = 0;

const getEmployeesFromDatabase = async () => {
    try {
        const employees = await employeeModel.find();
        return employees;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const login = async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    try {
        const employees = await getEmployeesFromDatabase();
        const hashedPassword = await bcrypt.hash(password, 10);
        for (const emp of employees) {
            if (emp.name === name && bcrypt.compare(hashedPassword, emp.password)) {
                const token = jwt.sign({
                    _id: emp.id,
                    name: emp.name,
                    password: emp.password,
                    address: emp.address,
                    city: emp.city,
                    phoneNumber: emp.phoneNumber,
                    bankDetails: emp.bankDetails,
                    isAdmin: emp.isAdmin
                }, 'config.TOKEN_SECRET');
                const isAdmin = emp.isAdmin
                const response = {
                    token,
                    employeeId: emp._id,
                    isAdmin,
                    newEmployee: emp,
                };
                return res.header('auth-token', token).send(response);
            }
        }
        res.status(400).send('Employee does not exist.');
    } catch (error) {
        console.error('Error retrieving Employees:', error);
        res.status(500).send('Internal Server Error');
    }
};


const register = async (req, res) => {
    // console.log(req.body);

    const { name, password } = req.body;
    try {
        const existingEmployee = await employeeModel.findOne({ password });
        if (existingEmployee) {
            return res.status(400).send('Employee already exists.');
        }
        let isAdminFromClient = false;
        if (name === "Admin" && password === "Admin1Admin")// לשאול את אבא
            isAdminFromClient = true;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            _id: id++,
            name,
            email,
            password: hashedPassword,
            isAdmin: isAdminFromClient,
        });
        console.log(newUser, "newUser");
        await newUser.save();
        const token = jwt.sign({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: false,
        }, 'config.TOKEN_SECRET');
        res.header('auth-token', token).send({
            token, name: newUser.name,
            newUser,
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
};

const logout = (req, res) => {
    res.setHeader('auth-token', null);
    res.status(200).send('Logout successful');
};

module.exports = {
    login,
    register,
    logout,
};

