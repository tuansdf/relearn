const jwt = require("jsonwebtoken");

module.exports.createTokenPayload = (user) => {
  return {
    _id: user._id,
    username: user.username,
    email: user.email,
  };
};

module.exports.createToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

module.exports.validateToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
