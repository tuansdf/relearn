const createHttpError = require("http-errors");
const User = require("../user/user.model");
const { createTokenPayload, createToken } = require("./auth.helper");

const login = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new createHttpError.Unauthorized("Wrong username or password");
  }

  const isPasswordMatched = await user.validatePassword(password);
  if (!isPasswordMatched) {
    throw new createHttpError.Unauthorized("Wrong username or password");
  }

  const tokenPayload = createTokenPayload(user);
  const token = createToken(tokenPayload);

  return { ...tokenPayload, token };
};

const register = async ({ email, username, password }) => {
  const [isEmailExisted, isUsernameExisted] = await Promise.all([
    User.countDocuments({ email }),
    User.countDocuments({ username }),
  ]);
  if (isEmailExisted) {
    throw new createHttpError.BadRequest("Email or username already existed");
  }
  if (isUsernameExisted) {
    throw new createHttpError.BadRequest("Email or username already existed");
  }

  const user = await User.create({ email, username, password });

  const tokenPayload = createTokenPayload(user);
  const token = createToken(tokenPayload);

  return { ...tokenPayload, token };
};

module.exports = { login, register };
