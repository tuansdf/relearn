const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  text: {
    type: String,
    minlength: [4, "Text must be longer than 4 characters"],
    maxlength: [128, "Text must be shorter than 128 characters"],
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
});

const QuestionSchema = new mongoose.Schema({
  text: {
    type: String,
    minlength: [4, "Text must be longer than 4 characters"],
    maxlength: [128, "Text must be shorter than 128 characters"],
    required: true,
  },
  description: {
    type: String,
    maxlength: [512, "Description must be shorter than 512 characters"],
    required: true,
  },
  answers: [
    {
      type: AnswerSchema,
      required: true,
    },
  ],
  lesson: {
    type: mongoose.Types.ObjectId,
    ref: "Lesson",
    required: [true, "Lesson ID must be provided"],
  },
});

module.exports = mongoose.model("Question", QuestionSchema);
