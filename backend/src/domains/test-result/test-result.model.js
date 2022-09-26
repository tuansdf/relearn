const mongoose = require("mongoose");

const TestResultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User ID must be provided"],
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      required: [true, "Course ID must be provided"],
    },
    score: {
      type: Number,
      required: [true, "Score must be provided"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TestResult", TestResultSchema);
