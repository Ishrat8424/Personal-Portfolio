const express = require("express");
const router = express.Router();

const {
  createPortfolio,
  getPortfolio,
  updatePortfolio,
} = require("../controllers/portfolioController");

router.post("/", createPortfolio);

router.get("/", getPortfolio);

router.put("/", updatePortfolio);

module.exports = router;