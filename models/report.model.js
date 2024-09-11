const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    _id: Number,
    // date: { type: Date, default: Date.now }, // הוספת שדה התאריך
    date: String,
    employeeId: Number,
    type: String, // סוג
    quantity: Number, // כמות
    rate: Number, // תעריף
    role: String, // תפקיד
    project: String, // פרוייקט
    section: String, // מדור
    sign: String, // סימן/סעיף
    total: Number, // סכום סה"כ
    common: String
}, { versionKey: false });

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;

