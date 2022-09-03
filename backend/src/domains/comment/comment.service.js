const createHttpError = require("http-errors");
const Comment = require("./comment.model");
const User = require("../user/user.model");
const Question = require("../question/question.model");

const findAll = async ({ questionId }) => {
  const comments = await Comment.find({ question: questionId });

  return comments;
};

const findOne = async ({ commentId }) => {
  const comment = await Comment.findOne({ _id: commentId });

  if (!comment) {
    throw new createHttpError.NotFound("Comment not found");
  }

  return comment;
};

const findAllByQuestion = async ({ questionId }) => {
  const comments = await Comment.find({ question: questionId });

  return comments;
};

const create = async ({ text, authorId, questionId }) => {
  const [user, question] = await Promise.all([
    User.findOne({ _id: authorId }),
    Question.findOne({ _id: questionId }),
  ]);
  if (!user) {
    throw new createHttpError.NotFound("User not found");
  }
  if (!question) {
    throw new createHttpError.NotFound("Question not found");
  }

  const comment = await Comment.create({
    text,
    author: authorId,
    question: questionId,
  });

  return comment;
};

module.exports = { findAll, findOne, create, findAllByQuestion };
