const Project = require("../models/Project");
const Skill = require("../models/Skill");
const Experience = require("../models/Experience");
const Contact = require("../models/Contact");

const getDashboardStats = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();

    const totalSkills = await Skill.countDocuments();

    const totalExperience = await Experience.countDocuments();

    const totalMessages = await Contact.countDocuments();

    const unreadMessages = await Contact.countDocuments({
      isRead: false,
    });

    res.status(200).json({
      totalProjects,
      totalSkills,
      totalExperience,
      totalMessages,
      unreadMessages,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};