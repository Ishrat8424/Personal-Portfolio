const express = require("express");
const router = express.Router();

const multer = require("multer");

const {
  uploadImage,
  uploadResume,
} = require("../controllers/uploadController");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
});

router.post("/image", upload.single("image"), uploadImage);

router.post("/resume", upload.single("resume"), uploadResume);

module.exports = router;