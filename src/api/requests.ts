import { axiosInstance } from "@/configs";
import { IRequest } from "@/types";

export const fetchRequests = async (): Promise<IRequest[]> => {
    const { data } = await axiosInstance.get("/api/requests");

    return data;
  };

  export const fetchMyRequests = async (): Promise<IRequest[]> => {
    const { data } = await axiosInstance.get("/api/my-requests");

    return data;
  };

  export const sendOfferApi = async (body: {
    requestId: number;
  }) => {
    const { data } = await axiosInstance.post("/api/offers", body);

    return data;
  };
