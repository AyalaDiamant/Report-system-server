const Report = require('../models/report.model'); 
let id = 0;

const getReports = async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addReport = async (req, res) => {
    const data = req.body;
    const employeeIdFromBody = data.employee._id

    const newReport = new Report({
        _id: id++ ,
        employeeId: employeeIdFromBody,
        type: data.type,
        quantity: data.quantity,
        rate: data.rate,
        role: data.role,
        project: data.project,
        section: data.section,
        sign: data.sign,
        total: data.total
    });

    try {
        const savedReport = await newReport.save();
        res.status(201).json(savedReport);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getReports,
    addReport
};
