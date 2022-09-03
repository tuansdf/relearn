const express = require("express");
const router = express.Router();
const userService = require("./user.service");

router.get("/", async (req, res) => {
  res.json(await userService.findAll());
});

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  res.json(await userService.findOne({ userId }));
});

module.exports = router;
