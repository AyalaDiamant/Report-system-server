// const Report = require('../models/report.model'); // ייבוא המודל של הדוח

// const getRports = ('', async (req, res) => {
//     try {
//         const reports = await Report.find().populate('employee');
//         res.status(200).json(reports);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// const addReport = ('', async (req, res) => {
//     const {
//         _id,
//         employee,
//         type,
//         quantity,
//         rate,
//         role,
//         project,
//         section,
//         sign,
//         total
//     } = req.body;

//     const newReport = new Report({
//         _id,
//         employee,
//         type,
//         quantity,
//         rate,
//         role,
//         project,
//         section,
//         sign,
//         total
//     });

//     try {
//         const savedReport = await newReport.save();
//         res.status(201).json(savedReport);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// module.exports = {
//     getRports,
//     addReport
//   };

const Report = require('../models/report.model'); // ייבוא המודל של הדוח

const getReports = async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addReport = async (req, res) => {
    const {
        _id,
        // employee,
        type,
        quantity,
        rate,
        role,
        project,
        section,
        sign,
        total
    } = req.body;

    const newReport = new Report({
        _id,
        // employee,
        type,
        quantity,
        rate,
        role,
        project,
        section,
        sign,
        total
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
