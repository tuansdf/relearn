const createHttpError = require("http-errors");
const { validateToken } = require("./auth.helper");

module.exports.authenticateUser = async (req, res, next) => {
  const bearerAuth = req.headers.authorization;

  if (!bearerAuth || !bearerAuth.startsWith("Bearer ")) {
    throw new createHttpError.Unauthorized();
  }

  const token = bearerAuth.split(" ")[1];

  try {
    const payload = validateToken(token);
    req.user = payload;
  } catch (error) {
    throw new createHttpError.Unauthorized();
  }

  next();
};

module.exports.authorizeUser =
  (...roles) =>
  async (req, res, next) => {
    const { user } = req;

    if (!roles.includes(user.role)) {
      throw new createHttpError.Forbidden();
    }

    next();
  };
