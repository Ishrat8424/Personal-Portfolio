const express = require("express");
const router = express.Router();

const {
  createContact,
  getContacts,
  deleteContact,
  markAsRead,
} = require("../controllers/contactController");

// Create
router.post("/", createContact);

// Get All
router.get("/", getContacts);

// Delete
router.delete("/:id", deleteContact);
// Mark as Read
router.patch("/:id/read", markAsRead);

module.exports = router;