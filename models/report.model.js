const mongoose = require('mongoose');
const { ReportType, ReportRole } = require('./enums')


const reportSchema = new mongoose.Schema({
    _id: Number,
    // employee: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Employee',
    //     required: true
    // },
    type: String, // סוג
    quantity: Number, // כמות
    rate: Number, // תעריף
    role: String, // תפקיד
    project: String, // פרוייקט
    section: String, // מדור
    sign: String, // סימן/סעיף
    total: Number // סכום סה"כ
}, { versionKey: false });

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;

