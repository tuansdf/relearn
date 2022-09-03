const express = require("express");
const router = express.Router();
const lessonService = require("./lesson.service");
const questionService = require("../question/question.service");

router.get("/", async (req, res) => {
  res.json(await lessonService.findAll());
});

router.get("/:lessonId", async (req, res) => {
  const { lessonId } = req.params;

  res.json(await lessonService.findOne({ lessonId }));
});

router.get("/:lessonId/questions", async (req, res) => {
  const { lessonId } = req.params;

  res.json(await questionService.findAllByLesson({ lessonId }));
});

router.post("/", async (req, res) => {
  res.json(await lessonService.create(req.body));
});

module.exports = router;
