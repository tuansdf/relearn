import instance from "./axios.config";

const userService = {
  getOne: async (userId: string) => {
    return (await instance.get(`/users/${userId}`)).data;
  },
};

export default userService;
