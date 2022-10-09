const express = require("express");
const router = express.Router();
const testResultService = require("./test-result.service");

router.get("/", async (req, res) => {
  res.json(await testResultService.findAll());
});

router.get("/:testResultId", async (req, res) => {
  const { testResultId } = req.params;

  res.json(await testResultService.findOne({ testResultId }));
});

module.exports = router;
