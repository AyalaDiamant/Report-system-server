const Setting = require('../models/setting.model');

let id = 0;

exports.getAllSettings = async (req, res) => {
  try {
    const settings = await Setting.find();
    return res.status(200).json(settings);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching settings', error });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const { index } = req.body; 
    const existingSetting = await Setting.findOne();

    if (existingSetting && existingSetting.roles[index]) {
      existingSetting.roles.splice(index, 1); 
      await existingSetting.save();
      return res.status(200).json({ message: 'Role deleted successfully', setting: existingSetting });
    } else {
      return res.status(404).json({ message: 'Role not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting role', error });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { index } = req.body;
    const existingSetting = await Setting.findOne();

    if (existingSetting && existingSetting.projects[index]) {
      existingSetting.projects.splice(index, 1);
      await existingSetting.save();
      return res.status(200).json({ message: 'Project deleted successfully', setting: existingSetting });
    } else {
      return res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting project', error });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { index, updatedRole } = req.body;

    const existingSetting = await Setting.findOne();
    if (existingSetting && existingSetting.roles[index]) {
      existingSetting.roles[index] = updatedRole; // עדכון התפקיד ברשימה
      await existingSetting.save();
      return res.status(200).json({ message: 'Role updated successfully', setting: existingSetting });
    } else {
      return res.status(404).json({ message: 'Role not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error updating role', error });
  }
};

exports.upsertSetting = async (req, res) => {
  try {
    const { projects, roles } = req.body;

    const existingSetting = await Setting.findOne();
    if (existingSetting) {

      existingSetting.projects = [...new Set([...existingSetting.projects, ...projects])]; 
      const mergedRoles = [...existingSetting.roles];
      roles.forEach(newRole => {
        const existingRole = mergedRoles.find(role => role.name === newRole.name);
        if (!existingRole) {
          mergedRoles.push(newRole); 
        }
      });

      existingSetting.roles = mergedRoles;
      await existingSetting.save();
      return res.status(200).json({ message: 'Setting updated successfully', setting: existingSetting });
    } else {
      const newSetting = new Setting({ _id: id++, projects, roles });
      await newSetting.save();
      return res.status(201).json({ message: 'Setting created successfully', setting: newSetting });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error processing request', error });
  }
};

