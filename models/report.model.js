const mongoose = require('mongoose');

const deliverableSchema = new mongoose.Schema({
    // type: String, 
    quantity: Number, 
    rate: Number, 
    rateIncrease: Number, 
    role: String, 
    project: String,
    sign: String, 
    seif: String,
    total: Number 
}, { _id: false });

const reportSchema = new mongoose.Schema({
    _id: Number,
    date: String,
    employeeId: Number,
    deliverables: [deliverableSchema], // מערך של הספקים
    common: String 
}, { versionKey: false });

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
