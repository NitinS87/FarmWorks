const mongoose = require("mongoose");

const JobsSchema = new mongoose.mongoose.Schema({
  farmerId: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  jobName: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  jobDesc: {
    type: String,
    required: true,
    min: 6,
  },
  status: {
    type: String,
    default: "hiring",
  },
  createdOn: {
    type: Date,
    default: Date.now,
    required: true,
  },
  land: {
    type: Number,
    required: true,
  },
  completionDays: {
    type: Number,
    default: 1,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  coordinates: {
    type: Object,
    required: true,
    default: {},
  },
  interested: {
    type: Object,
    default: {},
    required: true,
  },
  jobOptions: {
    type: String,
    default: "",
    required: true,
  },
  pictures: {
    type: Array,
    default: [],
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  // review: {
  //   type: Object,
  //   default: {},

  // }
});

module.exports = mongoose.model("Jobs", JobsSchema);
