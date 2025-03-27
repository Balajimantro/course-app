const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  className: String,
  subject: String,
  board: String,
  latitude: Number,
  longitude: Number,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Course", CourseSchema);
