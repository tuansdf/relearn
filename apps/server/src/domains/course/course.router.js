const express = require("express");
const router = express.Router();
const courseService = require("./course.service");
const lessonService = require("../lesson/lesson.service");
const questionService = require("../question/question.service");
const testResultService = require("../test-result/test-result.service");

// get all courses
router.get("/", async (req, res) => {
  res.json(await courseService.findAll());
});

// get single course
router.get("/:courseId", async (req, res) => {
  const { courseId } = req.params;

  res.json(await courseService.findOne({ courseId }));
});

// get all lessons by course
router.get("/:courseId/lessons", async (req, res) => {
  const { courseId } = req.params;

  res.json(await lessonService.findAllByCourse({ courseId }));
});

// get all questions by course
router.get("/:courseId/questions", async (req, res) => {
  const { courseId } = req.params;

  res.json(await questionService.findAllByCourse({ courseId }));
});

// get all test results by course
router.get("/:courseId/test-results", async (req, res) => {
  const { courseId } = req.params;

  res.json(await testResultService.findAllByCourse({ courseId }));
});

// create test results in course
router.post("/:courseId/test-results", async (req, res) => {
  const { courseId } = req.params;
  console.log(courseId);
  res.json(await testResultService.create({ ...req.body, courseId }));
});

// create lesson in course
router.post("/:courseId/lessons", async (req, res) => {
  const { courseId } = req.params;

  res.json(await lessonService.create({ ...req.body, courseId }));
});

// create course
router.post("/", async (req, res) => {
  res.json(await courseService.create(req.body));
});

// update course
router.patch("/:courseId", async (req, res) => {
  const { courseId } = req.params;

  res.json(await courseService.update({ ...req.body, courseId }));
});

module.exports = router;
