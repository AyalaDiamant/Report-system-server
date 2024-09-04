
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    address: String,
    city: String,
    phoneNumber: String,
    bankDetails: {
        bankName: String,
        branchNumber: Number,
        accountNumber: String
    }
}, {versionKey: false});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;

