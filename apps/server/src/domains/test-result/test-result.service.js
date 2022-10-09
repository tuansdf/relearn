const createHttpError = require("http-errors");
const TestResult = require("./test-result.model");
const User = require("../user/user.model");
const Course = require("../course/course.model");
const { default: mongoose } = require("mongoose");

const findAll = async () => {
  const testResults = await TestResult.find().sort("-score user updatedAt");

  return testResults;
};

const findAllByCourse = async ({ courseId }) => {
  const testResults = await TestResult.aggregate()
    .lookup({
      from: "users",
      localField: "user",
      foreignField: "_id",
      as: "user",
    })
    .unwind("user")
    .match({ course: mongoose.Types.ObjectId(courseId) })
    .project("-user.password")
    .sort("-score user updatedAt");

  return testResults;
};

const findOne = async ({ testResultId }) => {
  const testResult = await TestResult.findOne({ _id: testResultId });

  if (!testResult) {
    throw new createHttpError.NotFound("Test result not found");
  }

  return testResult;
};

const create = async ({ userId, courseId, score }) => {
  const [course, user] = await Promise.all([
    User.findOne({ _id: userId }),
    Course.findOne({ _id: courseId }),
  ]);

  if (!course) {
    throw new createHttpError.NotFound("Course not found");
  }
  if (!user) {
    throw new createHttpError.NotFound("User not found");
  }

  const testResult = await TestResult.create({
    user: userId,
    course: courseId,
    score,
  });

  return testResult;
};

module.exports = {
  findAll,
  findOne,
  create,
  findAllByCourse,
};
