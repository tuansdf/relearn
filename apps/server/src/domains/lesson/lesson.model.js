const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minlength: [4, "Title must be longer than 4 characters"],
      maxlength: [128, "Title must be shorter than 128 characters"],
      required: true,
    },
    description: {
      type: String,
      maxlength: [512, "Description must be shorter than 512 characters"],
      required: true,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      required: [true, "Course ID must be provided"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lesson", LessonSchema);
