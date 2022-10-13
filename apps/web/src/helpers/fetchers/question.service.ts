import { CreateQuestionDto, UpdateQuestionDto } from "../../interface/types";
import instance from "./axios.config";

const questionService = {
  getAll: async () => {
    return (await instance.get("/questions")).data;
  },

  getAllByCourse: async (courseId: string) => {
    return (await instance.get(`/courses/${courseId}/questions`)).data;
  },

  getAllByLesson: async (lessonId: string) => {
    return (await instance.get(`/lessons/${lessonId}/questions`)).data;
  },

  createInLesson: async (lessonId: string, data: CreateQuestionDto) => {
    return (await instance.post(`/lessons/${lessonId}/questions`, data)).data;
  },

  update: async (questionId: string, data: UpdateQuestionDto) => {
    return (await instance.patch(`/questions/${questionId}`, data)).data;
  },
};

export default questionService;
