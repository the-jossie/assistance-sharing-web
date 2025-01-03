"use client";

import {
  fetchMyRequests,
  fetchRequestOffers,
  markRequestCompleteApi,
} from "@/api";
import { Button, Text } from "@/components";
import { IRequest, IRequestOffer } from "@/types";
import { capitalize } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CreateRequestModal } from "./create-request-modal";
import { ViewOfferModal } from "./view-offer-modal";
import { toast } from "react-toastify";
import { useAuthContext } from "@/contexts";
import { useRouter } from "next/navigation";
import { PAGE_ROUTES } from "@/configs";

export default function MyRequests() {
  const { auth } = useAuthContext();
  const router = useRouter();

  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: string;
    offer: IRequestOffer | null;
  }>({ isOpen: false, type: "", offer: null });

  const [sidebar, setSidebar] = useState<{
    isOpen: boolean;
    request: IRequest | null;
  }>({ isOpen: false, request: null });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["my-requests"],
    queryFn: fetchMyRequests,
  });

  const {
    data: offers,
    isFetching: isFetchingRequestOffers,
    refetch: refetchOffers,
  } = useQuery({
    queryKey: ["offers"],
    queryFn: () => fetchRequestOffers({ requestId: sidebar.request?.id }),
    enabled: false,
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: markRequestCompleteApi,
    onSuccess(response) {
      toast.success(response ?? "Completed!");
    },
    onError() {
      toast.error("An error occured. Please try again!");
    },
  });

  const handleMarkRequestComplete = async () => {
    await mutateAsync({ requestId: sidebar.request?.id });
  };

  useEffect(() => {
    if (!sidebar.request) return;

    refetchOffers();
  }, [refetchOffers, sidebar.request]);

  useEffect(() => {
    if (!auth.token) {
      return router.replace(PAGE_ROUTES.LOGIN);
    }
  }, [auth, router]);

  return (
    <div className="mt-4 overflow-hidden">
      <div className="flex justify-end">
        <Button
          text="Create New Request"
          onClick={() => setModal({ ...modal, isOpen: true, type: "create" })}
        />
      </div>
      <div className="grid grid-cols-[1fr,2fr] gap-10 mt-4 overflow-hidden">
        {isLoading ? (
          <>Loading..</>
        ) : data && data.length > 0 ? (
          <ul className="border p-4 space-y-4 overflow-y-auto max-h-[87vh] h-max">
            {data?.map((request, index) => (
              <li key={index}>
                <button
                  onClick={() => setSidebar({ request, isOpen: true })}
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
          </ul>
        ) : (
          <>Nothing here yet</>
        )}
        {sidebar.isOpen && sidebar.request && (
          <div className="border p-4 h-max space-y-6 overflow-y-auto max-h-[90vh]">
            <Text value={capitalize(sidebar.request.title)} variant="h2" />
            <Text
              value={`- ${capitalize(sidebar.request.associatedSkill)}`}
              variant="p"
            />
            <Text
              value={capitalize(sidebar.request.description)}
              variant="p2"
            />
            {sidebar.request.status !== "COMPLETED" &&
              !isFetchingRequestOffers &&
              offers &&
              offers.length > 0 && (
                <div className="!mt-20 space-y-4">
                  <Text
                    value="Offers Received"
                    variant="h4"
                    className="font-semibold"
                  />
                  <ul className="flex flex-wrap items-center gap-4">
                    {offers.map((offer, index) => (
                      <li
                        className="border p-3 flex items-center space-x-4"
                        key={index}
                      >
                        <Text value={capitalize(offer.username)} />
                        <Button
                          onClick={() =>
                            setModal({ offer, isOpen: true, type: "viewOffer" })
                          }
                          text="View"
                          size="xsmall"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            <div className="flex justify-end ml-auto">
              {sidebar.request.status === "COMPLETED" ? (
                <Text
                  value="Completed"
                  className="!ml-auto text-green-500 font-bold"
                />
              ) : sidebar.request.status === "INPROGRESS" ? (
                <Button
                  isLoading={isPending}
                  onClick={handleMarkRequestComplete}
                  text="Mark Complete"
                  className="ml-auto"
                />
              ) : <></>}
            </div>
          </div>
        )}
      </div>

      {modal.isOpen && (
        <>
          {modal.type === "create" && (
            <CreateRequestModal
              onClose={() => {
                setModal({ ...modal, isOpen: false });

                refetch();
              }}
            />
          )}

          {modal.type === "viewOffer" && modal.offer && (
            <ViewOfferModal
              offer={modal.offer}
              onClose={() => {
                setModal({ ...modal, isOpen: false });

                refetch();
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
