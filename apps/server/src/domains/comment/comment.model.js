const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      minlength: [4, "Text must be longer than 4 characters"],
      maxlength: [512, "Text must be shorter than 512 characters"],
      required: true,
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Author ID must be provided"],
    },
    question: {
      type: mongoose.Types.ObjectId,
      ref: "Question",
      required: [true, "Question ID must be provided"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
