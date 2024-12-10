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

