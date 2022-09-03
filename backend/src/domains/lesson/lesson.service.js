const createHttpError = require("http-errors");
const Lesson = require("./lesson.model");
const Course = require("../course/course.model");

const findAll = async () => {
  const lessons = await Lesson.find();

  return lessons;
};

const findOne = async ({ lessonId }) => {
  const lesson = await Lesson.findOne({ _id: lessonId });

  if (!lesson) {
    throw new createHttpError.NotFound("Lesson not found");
  }

  return lesson;
};

const findAllByCourse = async ({ courseId }) => {
  const lessons = await Lesson.find({ course: courseId });

  return lessons;
};

const create = async ({ title, description, courseId }) => {
  const course = await Course.findOne({ _id: courseId });
  if (!course) {
    throw new createHttpError.NotFound("Course not found");
  }

  const lesson = await Lesson.create({
    title,
    description,
    course: courseId,
  });

  return lesson;
};

module.exports = { findAll, findOne, create, findAllByCourse };
