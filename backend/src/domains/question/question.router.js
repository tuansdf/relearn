const express = require("express");
const router = express.Router();
const questionService = require("./question.service");
const commentService = require("../comment/comment.service");

router.get("/", async (req, res) => {
  res.json(await questionService.findAll());
});

router.get("/:questionId", async (req, res) => {
  const { questionId } = req.params;

  res.json(await questionService.findOne({ questionId }));
});

router.get("/:questionId/comments", async (req, res) => {
  const { questionId } = req.params;

  res.json(await commentService.findAllByQuestion({ questionId }));
});

router.post("/:questionId/comments", async (req, res) => {
  const { questionId } = req.params;

  res.json(await commentService.create({ ...req.body, questionId }));
});

router.patch("/:questionId", async (req, res) => {
  const { questionId } = req.params;

  res.json(await questionService.update({ ...req.body, questionId }));
});

module.exports = router;
