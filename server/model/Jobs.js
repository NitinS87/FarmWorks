const mongoose = require("mongoose");

const JobsSchema = new mongoose.mongoose.Schema({
  farmerId: {
    type: String,
    required: true,
    min: 6,
    max: 255,
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
  // status: {
  //   type: String,

  // }
  createdOn: {
    type: Date,
    default: Date.now,
    required: true,
  },
  expiredAt: {
    type: Date,
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
  state: {
    type: String,
    default: "",
    required: true,
  },
  district: {
    type: String,
    default: "",
    required: true,
  },
  // review: {
  //   type: Object,
  //   default: {},

  // }
});

module.exports = mongoose.model("Jobs", JobsSchema);
