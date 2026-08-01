const Portfolio = require("../models/Portfolio");

// Create Portfolio
const createPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.create(req.body);

    res.status(201).json({
      message: "Portfolio Created Successfully",
      portfolio,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Portfolio
const getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();

    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Portfolio
const updatePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      {},
      req.body,
      {
        new: true,
        upsert: true,
      }
    );

    res.status(200).json({
      message: "Portfolio Updated Successfully",
      portfolio,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createPortfolio,
  getPortfolio,
  updatePortfolio,
};