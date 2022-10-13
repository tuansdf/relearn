import { CreateTestResultDto } from "../../interface/types";
import instance from "./axios.config";

const testResultService = {
  getAllByCourse: async (courseId: string) => {
    return (await instance.get(`/courses/${courseId}/test-results`)).data;
  },

  createInCourse: async (courseId: string, data: CreateTestResultDto) => {
    return (await instance.post(`/courses/${courseId}/test-results`, data))
      .data;
  },
};

export default testResultService;
