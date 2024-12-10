const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    password: String,
    address: String,
    city: String,
    phoneNumber: String,
    bankDetails: {
        bankName: String,
        branchNumber: Number,
        accountNumber: String
    },
    isAdmin: Boolean,
    roles: [{
        name: String,
        rate: Number,
        rateIncrease: Number
    }],
    project: String,
}, { versionKey: false });

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
