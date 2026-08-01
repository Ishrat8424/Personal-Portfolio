const express = require("express");
const router = express.Router();

const {
  createContact,
  getContacts,
  deleteContact,
} = require("../controllers/contactController");

// Create
router.post("/", createContact);

// Get All
router.get("/", getContacts);

// Delete
router.delete("/:id", deleteContact);

module.exports = router;