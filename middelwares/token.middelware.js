// // const jwt = require('jsonwebtoken');
// // const employeeModel = require('../models/employee.model');
// // const bcrypt = require('bcrypt');

// // const getUsersFromDatabase = async () => {
// //     try {
// //         const employees = await employeeModel.find();
// //         return employees;
// //     } catch (err) {
// //         console.error(err);
// //         throw err;
// //     }
// // };

// // const checkIsAdmin = async (req, res, next) => {
// //     const token = req.header('auth-token');
// //     const employee = jwt.verify(token, 'config.TOKEN_SECRET');
// //     console.log(employee, 'employee');
// //     try {
// //         if (employee.isAdmin) {
// //             next();
// //         }
// //         else {
// //             return res.status(500).send('No access to a non-admin user');
// //         }
// //     } catch (err) {
// //         console.error("Error fetching users from database:", err);
// //         return res.status(500).send('No access to a non-admin user');
// //     }
// // }

// // const verifyToken = async (req, res, next) => {
// //     const token = req.header('auth-token');
// //     if (!token) {
// //         return res.status(401).send('There is no token.');
// //     }

// //     const verified = jwt.verify(token, 'config.TOKEN_SECRET');
// //     req.user = verified;
// //     console.log(verified);

// //     try {
// //         const employees = await getUsersFromDatabase();
// //         const employeeExists = employees.some(e => e._id == verified._id);
// //         if (employeeExists) {
// //             next();
// //         } else {
// //             return res.status(400).send('employee token does not exist.');
// //         }
// //     } catch (err) {
// //         console.error("Error fetching users from database:", err);
// //         return res.status(500).send('Internal Server Error');
// //     }
// // };

// // module.exports = {
// //     verifyToken,
// //     checkIsAdmin
// // };

// const jwt = require('jsonwebtoken');
// const employeeModel = require('../models/employee.model');

// // פונקציה לבדוק אם המשתמש הוא מנהל
// const checkIsAdmin = async (req, res, next) => {
//     const token = req.header('auth-token');
//     if (!token) return res.status(401).send('No token provided.');

//     try {
//         const decoded = jwt.verify(token, 'config.TOKEN_SECRET');
//         const employee = await employeeModel.findById(decoded._id);

//         if (employee && employee.isAdmin) {
//             next();
//         } else {
//             res.status(403).send('Access denied.');
//         }
//     } catch (err) {
//         console.error("Error verifying admin access:", err);
//         res.status(500).send('Internal Server Error');
//     }
// };

// // פונקציה לאמת את הטוקן ולוודא שהמשתמש מחובר
// const verifyToken = async (req, res, next) => {
//     const token = req.header('auth-token');
//     if (!token) return res.status(401).send('No token provided.');

//     try {
//         const verified = jwt.verify(token, 'config.TOKEN_SECRET');
//         req.user = verified;
//         next();
//     } catch (err) {
//         console.error("Error verifying token:", err);
//         res.status(401).send('Invalid token.');
//     }
// };

// module.exports = {
//     verifyToken,
//     checkIsAdmin
// };

const jwt = require('jsonwebtoken');
const employeeModel = require('../models/employee.model');

// פונקציה לאמת את הטוקן ולוודא שהמשתמש מחובר
const verifyToken = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send('No token provided or incorrect format.');
    }

    const token = authHeader.split(' ')[1]; // שליפת הטוקן מתוך הכותרת

    try {
        const verified = jwt.verify(token, 'config.TOKEN_SECRET'); // פענוח הטוקן
        req.user = verified; // שמירת המשתמש המבוקש בבקשה
        next(); // ממשיכים לפעולה הבאה
    } catch (err) {
        console.error("Error verifying token:", err);
        res.status(401).send('Invalid or expired token.');
    }
};

// פונקציה לבדוק אם המשתמש הוא מנהל
const checkIsAdmin = async (req, res, next) => {
    const employee = await employeeModel.findById(req.user._id); // חיפוש המשתמש על פי המידע בטוקן

    if (employee && employee.isAdmin) {
        next(); // אם המשתמש הוא מנהל, ממשיכים
    } else {
        res.status(403).send('Access denied.');
    }
};

module.exports = {
    verifyToken,
    checkIsAdmin
};

