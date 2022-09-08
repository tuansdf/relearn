// run: node populate.js
require("dotenv").config({ path: "../.env" });

const crypto = require("crypto");
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

const User = require("../src/domains/user/user.model");
const Comment = require("../src/domains/comment/comment.model");
const Course = require("../src/domains/course/course.model");
const Lesson = require("../src/domains/lesson/lesson.model");
const Question = require("../src/domains/question/question.model");

const MaxDocs = Object.freeze({
  COURSE: 10,
  LESSON: 6,
  QUESTION: 4,
  COMMENT: 1,
});

const main = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL_TEST);

    await deleteAll();
    await createAll();

    await mongoose.connection.close();

    console.log("Done.");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const deleteAll = async () => {
  await Comment.deleteMany();
  await Course.deleteMany();
  await Lesson.deleteMany();
  await Question.deleteMany();
};

const createAll = async () => {
  await createCourses();
  await createLessons();
  await createQuestion();
  await createComment();
};

const createCourses = async () => {
  const courses = [];
  for (let i = 0; i < MaxDocs.COURSE; i++) {
    courses.push(randomCourse());
  }

  await Course.create(courses);
};
const createLessons = async () => {
  const courses = await Course.find().select("_id");
  const courseIds = courses.map((course) => course._id.toString());
  const courseLength = courseIds.length;

  const lessons = [];
  for (let i = 0; i < courseLength; i++) {
    for (let j = 0; j < MaxDocs.LESSON; j++) {
      lessons.push(randomLesson(courseIds[i]));
    }
  }

  await Lesson.create(lessons);
};
const createQuestion = async () => {
  const lessons = await Lesson.find().select("_id");
  const lessonIds = lessons.map((lesson) => lesson._id.toString());
  const lessonLength = lessonIds.length;

  const questions = [];
  for (let i = 0; i < lessonLength; i++) {
    for (let j = 0; j < MaxDocs.QUESTION; j++) {
      questions.push(randomQuestion(lessonIds[i]));
    }
  }

  await Question.create(questions);
};
const createComment = async () => {
  const [users, questions] = await Promise.all([
    User.find().select("_id"),
    Question.find().select("_id"),
  ]);
  const userIds = users.map((user) => user._id.toString());
  const questionIds = questions.map((question) => question._id.toString());
  const userLength = userIds.length;
  const questionLength = questionIds.length;

  const comments = [];
  for (let i = 0; i < questionLength; i++) {
    for (let j = 0; j < MaxDocs.COMMENT; j++) {
      comments.push(
        randomComment(
          userIds[crypto.randomInt(0, userLength - 1)],
          questionIds[i]
        )
      );
    }
  }

  await Comment.create(comments);
};

const randomCourse = () => ({
  title: faker.lorem.words(3),
  description: faker.lorem.sentence(10),
});
const randomLesson = (course) => ({
  title: faker.lorem.words(3),
  description: faker.lorem.sentence(10),
  course,
});
const randomQuestion = (lesson) => ({
  text: faker.lorem.words(5) + "?",
  description: faker.lorem.sentence(10),
  answers: [...Array(MaxDocs.QUESTION)].map((_, index) =>
    randomAnswer(index === 2)
  ),
  lesson,
});
const randomAnswer = (isCorrect) => ({
  text: faker.lorem.words(8),
  isCorrect,
});
const randomComment = (author, question) => ({
  text: faker.lorem.paragraph(),
  author,
  question,
});

main();
