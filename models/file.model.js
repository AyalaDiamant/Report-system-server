// models/File.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    originalName: String,   // שם הקובץ המקורי
    status: {
        type: String, enum: ['התחלה', 'בבדיקה', 'בעריכה', 'מושלם', 'מוכן לבדיקה', 'בתור ממתינים'], // הוספתי את 'בתור ממתינים'
        default: 'התחלה'
    }, // סטטוס הקובץ
    uploadedBy: { type: String, required: false },
    assignedTo: { type: String, required: false },
    filePath: String,  // נתיב הקובץ על השרת
    dateUploaded: { type: Date, default: Date.now },
    isInQueue: { type: Boolean, default: false } // שדה חדש לצורך תור הממתינים
});

module.exports = mongoose.model('File', fileSchema);
