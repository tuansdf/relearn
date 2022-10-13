import { CreateLessonDto, UpdateLessonDto } from "../../interface/types";
import instance from "./axios.config";

const lessonService = {
  getAll: async () => {
    return (await instance.get("/lessons")).data;
  },

  getAllByCourse: async (courseId: string) => {
    return (await instance.get(`/courses/${courseId}/lessons`)).data;
  },

  update: async (lessonId: string, data: UpdateLessonDto) => {
    return (await instance.patch(`/lessons/${lessonId}`, data)).data;
  },

  createInCourse: async (courseId: string, data: CreateLessonDto) => {
    return (await instance.post(`/courses/${courseId}/lessons`, data)).data;
  },
};

export default lessonService;
