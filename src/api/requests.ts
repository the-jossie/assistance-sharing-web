import { axiosInstance } from "@/configs";
import { IRequest } from "@/types";

export const fetchRequests = async (): Promise<IRequest[]> => {
    const { data } = await axiosInstance.get("/api/requests");

    return data;
  };
