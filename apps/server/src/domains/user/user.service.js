const createHttpError = require("http-errors");
const User = require("./user.model");

const findAll = async () => {
  const users = await User.find().select("-password");

  return users;
};

const findOne = async ({ userId }) => {
  const user = await User.findOne({ _id: userId }).select("-password");

  if (!user) {
    throw new createHttpError.NotFound("User not found");
  }

  return user;
};

module.exports = { findAll, findOne };
