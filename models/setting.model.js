const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
    _id: Number,
    projects: [String],
    roles: [
        {
            name: String,
            rate: Number,
            rateIncrease: Number,
        }
    ]

}, { versionKey: false });

const Setting = mongoose.model('Setting', settingSchema);

module.exports = Setting;
