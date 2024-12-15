import { axiosInstance } from "@/configs";

export const loginApi = async (body: {
  username: string;
  password: string;
}) => {
  const { data } = await axiosInstance.post("/api/auth/login", body);

  return data;
};

export const signupApi = async (body: {
  username: string;
  email: string;
  password: string;
}) => {
  const { data } = await axiosInstance.post("/api/auth/register", body);

  return data;
};
