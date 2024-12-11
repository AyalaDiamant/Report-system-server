const Report = require('../models/report.model');
let id = 20;

const getReports = async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getReportById = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const reports = await Report.find({ employeeId });
        if (!reports.length) {
            res.status(404).send('report not found');
            return;
        };
        res.send(reports);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving reports');
    }
};

const addReport = async (req, res) => {
    const data = req.body;    
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    const newReport = new Report({
        _id: id++,
        date: formattedDate,
        employeeId: data.employeeId,
        deliverables: data.deliverables, // מערך הספקים
        common: data.common
    });

    try {
        const savedReport = await newReport.save();
        res.status(201).json(savedReport);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteReport = async (req, res) => {
    try {
        const idParams = req.params.id;
        const report = await Report.findByIdAndDelete(idParams);
        if (!report) {
            res.status(404).send('report not found');
            return;
        }
        res.send('report deleted successfully!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting report');
    }
};

const updatedReport = async (req, res) => {
    try {
        const idParams = req.params.id;
        const data = req.body;

        const updatedReport = await Report.findByIdAndUpdate(
            idParams,
            data,
            { new: true },
        );
        if (!updatedReport) {
            res.status(404).send('report not found...');
            return;
        }
        res.status(200).send(updatedReport);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating report');
    }
};

module.exports = {
    getReports,
    getReportById,
    addReport,
    deleteReport,
    updatedReport
};

