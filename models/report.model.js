const mongoose = require('mongoose');

const deliverableSchema = new mongoose.Schema({
    type: String, // סוג
    quantity: Number, // כמות
    rate: Number, // תעריף
    role: String, // תפקיד
    project: String, // פרוייקט
    section: String, // מדור
    sign: String, // סימן/סעיף
    seif: String,
    total: Number // סכום סה"כ
}, { _id: false });

const reportSchema = new mongoose.Schema({
    _id: Number,
    date: String,
    employeeId: Number,
    deliverables: [deliverableSchema], // מערך של הספקים
    common: String // הערה כללית
}, { versionKey: false });

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
