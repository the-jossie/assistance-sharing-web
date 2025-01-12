"use client";

import { approveRequestApi, fetchRequests, rejectRequestApi, sendOfferApi } from "@/api";
import { Button, Text } from "@/components";
import { PAGE_ROUTES } from "@/configs";
import { useAuthContext } from "@/contexts";
import { IRequest } from "@/types";
import { capitalize } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
    const { auth } = useAuthContext();
  const router = useRouter();

  const isLoggedIn = !!auth.token;
  const isAdmin = auth.role === "ROLE_ADMIN"

  const [detailsPane, setDetailsPane] = useState<{
    isOpen: boolean;
    request: IRequest | null;
  }>({ isOpen: false, request: null });

  const { data, isFetching } = useQuery({
    queryKey: ["requests"],
    queryFn: fetchRequests,
  });

  const { isPending: isSendingOffer, mutateAsync } = useMutation({
    mutationFn: sendOfferApi,
    onSuccess() {
      toast.success("Offer sent successfully!");

      setDetailsPane({ request: null, isOpen: false });
    },
  });

  const handleSendOffer = async () => {
    if (!detailsPane.request) return;

    try {
      await mutateAsync({ requestId: detailsPane.request?.id });
    } catch (error) {
      console.log({ error });
      toast.error("An error occured. Please try again!");
    }
  };

  const { isPending: isApprovingRequest, mutateAsync: approveRequestMutation } = useMutation({
    mutationFn: approveRequestApi,
    onSuccess() {
      toast.success("Request approved successfully!");

      setDetailsPane({ request: null, isOpen: false });
    },
  });

  const handleApproveRequest = async () => {
    if (!detailsPane.request) return;

    try {
      await approveRequestMutation({ requestId: detailsPane.request?.id });
    } catch (error) {
      console.log({ error });
      toast.error("An error occured. Please try again!");
    }
  };

  const { isPending: isRejectingRequest, mutateAsync: rejectRequestMutation } = useMutation({
    mutationFn: rejectRequestApi,
    onSuccess() {
      toast.success("Request rejected successfully!");

      setDetailsPane({ request: null, isOpen: false });
    },
  });

  const handleRejectRequest = async () => {
    if (!detailsPane.request) return;

    try {
      await rejectRequestMutation({ requestId: detailsPane.request?.id });
    } catch (error) {
      console.log({ error });
      toast.error("An error occured. Please try again!");
    }
  };
  return (
    <div className="grid grid-cols-[1fr,2fr] gap-10 mt-10 overflow-hidden">
      {isFetching ? (
        <>Loading..</>
      ) : (
        data && data.length > 0 ? <ul className="border p-4 space-y-4 overflow-y-auto max-h-[90vh] h-max">
          {data?.map((request, index) => (
            <li key={index}>
              <button
                onClick={() => setDetailsPane({ request, isOpen: true })}
                className="w-full h-full text-left border p-2 flex justify-between items-center"
              >
                <div className="space-y-2 flex-grow">
                  <Text value={capitalize(request.title)} variant="h4" />
                  <Text
                    value={capitalize(request.associatedSkill)}
                    variant="p2"
                  />
                </div>
                <div className="min-h-14 w-20 bg-gray-100" />
              </button>
            </li>
          ))}
        </ul> : <>Nothing here yet</>
      )}
      { detailsPane.isOpen && detailsPane.request ? (
        <div className="border p-4 h-max space-y-6">
          <Text value={capitalize(detailsPane.request.title)} variant="h2" />
          <Text value={capitalize(detailsPane.request.associatedSkill)} variant="p3" className="bg-gray-100 text-gray-800 font-medium me-2 px-2.5 py-0.5 rounded-full w-max"  />
          <Text value={capitalize(detailsPane.request.description)} variant="p2" />
          <div className="!mt-20 flex space-x-4 items-center justify-end">
            {isLoggedIn && isAdmin ? <>
            <Button
              text="Approve"
              size="small"
              type="button"
              onClick={handleApproveRequest}
              isLoading={isApprovingRequest}
            />
            <Button
              text="Reject"
              size="small"
              type="button"
              variant="secondary"
              onClick={handleRejectRequest}
              isLoading={isRejectingRequest}
            />
            </>
             : isLoggedIn ? <Button
              text="Assist"
              size="small"
              type="button"
              onClick={handleSendOffer}
              isLoading={isSendingOffer}
            /> : <button onClick={() => router.push(PAGE_ROUTES.LOGIN)}><Text value="Login to assist" className="underline" /></button>}
          </div>
        </div>
      ) : <div className="flex items-center justify-center">{!isFetching &&<Text value="Select a request to the left to view details" />}</div>}
    </div>
  );
}
