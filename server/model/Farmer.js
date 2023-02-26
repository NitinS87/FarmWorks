const mongoose = require("mongoose");

const FarmerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
    state: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
    city: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    aadharNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    profile: {
      type: String,
    },
    job: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Farmer", FarmerSchema);
