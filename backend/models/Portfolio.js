const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    about: {
      type: String,
      required: true,
    },

    heroDescription: {
      type: String,
      default: "",
    },
    
    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    github: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    resume: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Portfolio", portfolioSchema);
