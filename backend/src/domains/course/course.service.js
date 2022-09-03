const createHttpError = require("http-errors");
const Course = require("./course.model");

const findAll = async () => {
  const courses = await Course.find();

  return courses;
};

const findOne = async ({ courseId }) => {
  const course = await Course.findOne({ _id: courseId });

  if (!course) {
    throw new createHttpError.NotFound("Course not found");
  }

  return course;
};

const create = async ({ title, description }) => {
  const course = await Course.create({
    title,
    description,
  });

  return course;
};

module.exports = { findAll, findOne, create };
