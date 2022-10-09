const express = require("express");
const router = express.Router();
const commentService = require("./comment.service");

router.get("/", async (req, res) => {
  const { questionId } = req.query;

  res.json(await commentService.findAll({ questionId }));
});

router.get("/:commentId", async (req, res) => {
  const { commentId } = req.params;

  res.json(await commentService.findOne({ commentId }));
});

module.exports = router;
