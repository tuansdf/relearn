const createHttpError = require("http-errors");
const Question = require("./question.model");
const Lesson = require("../lesson/lesson.model");
const { default: mongoose } = require("mongoose");

const findAll = async () => {
  const questions = await Question.find();

  return questions;
};

const findOne = async ({ questionId }) => {
  const question = await Question.findOne({ _id: questionId });

  if (!question) {
    throw new createHttpError.NotFound("Question not found");
  }

  return question;
};

const findAllByLesson = async ({ lessonId }) => {
  const questions = await Question.find({ lesson: lessonId });

  return questions;
};

const findAllByCourse = async ({ courseId }) => {
  const questions = await Question.aggregate()
    .lookup({
      from: "lessons",
      localField: "lesson",
      foreignField: "_id",
      as: "lesson",
    })
    .unwind("lesson")
    .match({ "lesson.course": mongoose.Types.ObjectId(courseId) });

  return questions;
};

const create = async ({ text, description, answers, lessonId }) => {
  const lesson = await Lesson.findOne({ _id: lessonId });
  if (!lesson) {
    throw new createHttpError.NotFound("Lesson not found");
  }

  const question = await Question.create({
    text,
    description,
    answers,
    lesson: lessonId,
  });

  return question;
};

module.exports = { findAll, findOne, create, findAllByCourse, findAllByLesson };
