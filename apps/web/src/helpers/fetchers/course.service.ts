import { CreateCourseDto, UpdateCourseDto } from "../../interface/types";
import instance from "./axios.config";

const courseService = {
  getAll: async () => {
    return (await instance.get("/courses")).data;
  },

  getOne: async (courseId: string) => {
    return (await instance.get(`/courses/${courseId}`)).data;
  },

  create: async (data: CreateCourseDto) => {
    return (await instance.post("/courses", data)).data;
  },

  update: async (courseId: string, data: UpdateCourseDto) => {
    return (await instance.patch(`/courses/${courseId}`, data)).data;
  },
};

export default courseService;
