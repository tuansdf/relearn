import { CreateCommentDto } from "../../interface/types";
import instance from "./axios.config";

const commentService = {
  getAll: async () => {
    return (await instance.get("/questions")).data;
  },

  getAllByQuestion: async (questionId: string) => {
    return (await instance.get(`/questions/${questionId}/comments`)).data;
  },

  createInQuestion: async (questionId: string, data: CreateCommentDto) => {
    return (await instance.post(`/questions/${questionId}/comments`, data))
      .data;
  },
};

export default commentService;
