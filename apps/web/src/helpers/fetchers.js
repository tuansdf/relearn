import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
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

export const getCourseApi = async (courseId) => {
  return (await instance.get(`/courses/${courseId}`)).data;
};

export const postCourseApi = async (data) => {
  return (await instance.post("/courses", data)).data;
};

export const patchCourseApi = async (courseId, data) => {
  return (await instance.patch(`/courses/${courseId}`, data)).data;
};

// lesson
export const getLessonsApi = async () => {
  return (await instance.get("/lessons")).data;
};

export const getLessonsByCourseApi = async (courseId) => {
  return (await instance.get(`/courses/${courseId}/lessons`)).data;
};

export const patchLessonApi = async (lessonId, data) => {
  return (await instance.patch(`/lessons/${lessonId}`, data)).data;
};

export const postLessonInCourseApi = async (courseId, data) => {
  return (await instance.post(`/courses/${courseId}/lessons`, data)).data;
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

export const postQuestionInLessonApi = async (lessonId, data) => {
  return (await instance.post(`/lessons/${lessonId}/questions`, data)).data;
};

export const patchQuestionApi = async (questionId, data) => {
  return (await instance.patch(`/questions/${questionId}`, data)).data;
};

// comment
export const getCommentsApi = async () => {
  return (await instance.get("/questions")).data;
};

export const getCommentsByQuestionApi = async (questionId) => {
  return (await instance.get(`/questions/${questionId}/comments`)).data;
};

export const postCommentInQuestionApi = async (questionId, data) => {
  return (await instance.post(`/questions/${questionId}/comments`, data)).data;
};

// test result
export const getTestResultsByCourseApi = async (courseId) => {
  return (await instance.get(`/courses/${courseId}/test-results`)).data;
};

export const postTestResultsInCourseApi = async (courseId, data) => {
  return (await instance.post(`/courses/${courseId}/test-results`, data)).data;
};
