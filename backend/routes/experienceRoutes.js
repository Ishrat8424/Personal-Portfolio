const express = require("express");
const router = express.Router();

const {
  createExperience,
  getExperiences,
  updateExperience,
  deleteExperience,
} = require("../controllers/experienceController");

// Create
router.post("/", createExperience);

// Read
router.get("/", getExperiences);

// Update
router.put("/:id", updateExperience);

// Delete
router.delete("/:id", deleteExperience);

module.exports = router;