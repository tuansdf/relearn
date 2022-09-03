const express = require("express");
const router = express.Router();
const courseService = require("./course.service");
const lessonService = require("../lesson/lesson.service");
const questionService = require("../question/question.service");

router.get("/", async (req, res) => {
  res.json(await courseService.findAll());
});

router.get("/:courseId", async (req, res) => {
  const { courseId } = req.params;

  res.json(await courseService.findOne({ courseId }));
});

router.get("/:courseId/lessons", async (req, res) => {
  const { courseId } = req.params;

  res.json(await lessonService.findAllByCourse({ courseId }));
});

router.get("/:courseId/questions", async (req, res) => {
  const { courseId } = req.params;

  res.json(await questionService.findAllByCourse({ courseId }));
});

router.post("/", async (req, res) => {
  res.json(await courseService.create(req.body));
});

router.post("/:courseId/lessons", async (req, res) => {
  const { courseId } = req.params;

  res.json(await lessonService.create({ ...req.body, courseId }));
});

module.exports = router;
