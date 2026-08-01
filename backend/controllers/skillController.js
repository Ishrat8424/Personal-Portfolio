const Skill = require("../models/Skill");

// Create Skill
const createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);

    res.status(201).json({
      message: "Skill Added Successfully",
      skill,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Skills
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1 });

    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Skill
const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!skill) {
      return res.status(404).json({
        message: "Skill not found",
      });
    }

    res.status(200).json({
      message: "Skill Updated Successfully",
      skill,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Skill
const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (!skill) {
      return res.status(404).json({
        message: "Skill not found",
      });
    }

    res.status(200).json({
      message: "Skill Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createSkill,
  getSkills,
  updateSkill,
  deleteSkill,
};