"use client";

import { fetchRequests, sendOfferApi } from "@/api";
import { Button, Text } from "@/components";
import { IRequest } from "@/types";
import { capitalize } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [modal, setModal] = useState<{
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

      setModal({ request: null, isOpen: false });
    },
  });

  const handleSendOffer = async () => {
    if (!modal.request) return;

    try {
      await mutateAsync({ requestId: modal.request?.id });
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
                onClick={() => setModal({ request, isOpen: true })}
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
      {modal.isOpen && modal.request && (
        <div className="border p-4 h-max space-y-6">
          <Text value={capitalize(modal.request.title)} variant="h2" />
          <Text value={capitalize(modal.request.associatedSkill)} variant="p" />
          <Text value={capitalize(modal.request.description)} variant="p2" />
          <div className="!mt-20 flex justify-end">
            <Button
              text="Assist"
              size="small"
              type="button"
              onClick={handleSendOffer}
              isLoading={isSendingOffer}
            />
          </div>
        </div>
      )}
    </div>
  );
}
