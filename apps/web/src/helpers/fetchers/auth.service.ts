import { AuthLoginDto, AuthRegisterDto } from "../../interface/types";
import instance from "./axios.config";

const authService = {
  login: async (data: AuthLoginDto) => {
    return (await instance.post("/auth/login", data)).data;
  },
  register: async (data: AuthRegisterDto) => {
    return (await instance.post("/auth/register", data)).data;
  },
};

export default authService;
