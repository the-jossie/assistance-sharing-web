import { axiosInstance } from "@/configs";
import { IRequest, IRequestOffer } from "@/types";

export const fetchRequests = async (): Promise<IRequest[]> => {
    const { data } = await axiosInstance.get("/api/requests");

    return data;
  };

  export const fetchMyRequests = async (): Promise<IRequest[]> => {
    const { data } = await axiosInstance.get("/api/my-requests");

    return data;
  };

  export const createRequestApi = async (body: {
    title: string;
    description: string;
    associatedSkill: string;
  }) => {
    const { data } = await axiosInstance.post("/api/requests", body);

    return data;
  };

  export const fetchRequestOffers = async ({requestId}: {requestId?: number}): Promise<IRequestOffer[]> => {
    const { data } = await axiosInstance.get(`/api/requests/${requestId}/offers`);

    return data;
  };

  export const approveRequestApi = async ({requestId}: {
    requestId: number;
  }) => {
    const { data } = await axiosInstance.put(`/admin/api/requests/${requestId}/approve`);

    return data;
  };

  export const rejectRequestApi = async ({requestId}: {
    requestId: number;
  }) => {
    const { data } = await axiosInstance.put(`/admin/api/requests/${requestId}/reject`);

    return data;
  };

  export const sendOfferApi = async (body: {
    requestId: number;
  }) => {
    const { data } = await axiosInstance.post("/api/offers", body);

    return data;
  };

  export const acceptOfferApi = async ({requestId, offerId}: {
    requestId: number;
    offerId: number;
  }) => {
    const { data } = await axiosInstance.put(`/api/requests/${requestId}/offers/${offerId}/approve`);

    return data;
  };

  export const markRequestCompleteApi = async ({requestId}: {
    requestId?: number;
  }) => {
    const { data } = await axiosInstance.put(`/api/requests/${requestId}/complete`);

    return data;
  };
