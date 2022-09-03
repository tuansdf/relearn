require("dotenv").config();
require("express-async-errors");

// express
const express = require("express");

// plugin
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// routers
const userRouter = require("./domains/user/user.router");
const authRouter = require("./domains/auth/auth.router");
const commentRouter = require("./domains/comment/comment.router");
const courseRouter = require("./domains/course/course.router");
const lessonRouter = require("./domains/lesson/lesson.router");
const questionRouter = require("./domains/question/question.router");

// errors
const errorHandler = require("./shared/middleware/error-handler");
const notFound = require("./shared/middleware/not-found");

/* ----- */

// express
const app = express();

// plugin
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(express.json());

// routers
const prefix = "/api/v1";
app.use(prefix + "/auth", authRouter);
app.use(prefix + "/users", userRouter);
app.use(prefix + "/comments", commentRouter);
app.use(prefix + "/courses", courseRouter);
app.use(prefix + "/lessons", lessonRouter);
app.use(prefix + "/questions", questionRouter);

// errors
app.use(notFound);
app.use(errorHandler);

module.exports = app;
