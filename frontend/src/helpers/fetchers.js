import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

// auth
export const loginApi = async (data) => {
  return (await instance.post("/auth/login", data)).data;
};

export const registerApi = async (data) => {
  return (await instance.post("/auth/register", data)).data;
};

// user
export const getUserApi = async (userId) => {
  return (await instance.get(`/users/${userId}`)).data;
};

// course
export const getCoursesApi = async () => {
  return (await instance.get("/courses")).data;
};

// lesson
export const getLessonsApi = async () => {
  return (await instance.get("/lessons")).data;
};

export const getLessonsByCourseApi = async (courseId) => {
  return (await instance.get(`/courses/${courseId}/lessons`)).data;
};

// question
export const getQuestionsApi = async () => {
  return (await instance.get("/questions")).data;
};

export const getQuestionsByCourseApi = async (courseId) => {
  return (await instance.get(`/courses/${courseId}/questions`)).data;
};

export const getQuestionsByLessonApi = async (lessonId) => {
  return (await instance.get(`/lessons/${lessonId}/questions`)).data;
};

// comment
export const getCommentsApi = async () => {
  return (await instance.get("/questions")).data;
};

export const getCommentsByQuestionApi = async (questionId) => {
  return (await instance.get(`/questions/${questionId}/comments`)).data;
};
