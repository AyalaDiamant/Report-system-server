
// const mongoose = require('mongoose');

// const employeeSchema = new mongoose.Schema({
//     _id: Number,
//     name: String,
//     password: String, //הסיסמא תהייה התז?
//     address: String,
//     city: String,
//     phoneNumber: String,
//     bankDetails: {
//         bankName: String,
//         branchNumber: Number,
//         accountNumber: String
//     },
//     isAdmin: Boolean
// }, {versionKey: false});

// const Employee = mongoose.model('Employee', employeeSchema);

// module.exports = Employee;

const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    password: String, // הסיסמא תהייה התז?
    address: String,
    city: String,
    phoneNumber: String,
    bankDetails: {
        bankName: String,
        branchNumber: Number,
        accountNumber: String
    },
    isAdmin: Boolean,
    role:
    {
        name: String,
        rate: Number,
        rateIncrease: Number,
    },
    project: String,
}, { versionKey: false });

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
