const Setting = require('../models/setting.model');

let id = 0;
// הוספה או עדכון הגדרה
exports.upsertSetting = async (req, res) => {
  try {
    const { role, rate, rateIncrease } = req.body;

    const existingSetting = await Setting.findOne({ role });

    if (existingSetting) {
      // עדכון הגדרה קיימת
      existingSetting.rate = rate;
      existingSetting.rateIncrease = rateIncrease;
      await existingSetting.save();
      return res.status(200).json({ message: 'Setting updated successfully', setting: existingSetting });
    } else {
      // הוספת הגדרה חדשה
      const newSetting = new Setting({ _id: id++, role, rate, rateIncrease });
      await newSetting.save();
      return res.status(201).json({ message: 'Setting created successfully', setting: newSetting });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error processing request', error });
  }
};

// קבלת כל ההגדרות
exports.getAllSettings = async (req, res) => {
  try {
    const settings = await Setting.find();
    return res.status(200).json(settings);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching settings', error });
  }
};
