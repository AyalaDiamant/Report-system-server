// models/File.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    originalName: String,   // שם הקובץ המקורי
    status: { type: String, enum: ['התחלה','בבדיקה', 'בעריכה', 'מושלם'], default: 'התחלה' }, // סטטוס הקובץ
    uploadedBy: { type: String, required: false },
    assignedTo: { type: String, required: false },
    filePath: String,  // נתיב הקובץ על השרת
    dateUploaded: { type: Date, default: Date.now }
});

module.exports = mongoose.model('File', fileSchema);
