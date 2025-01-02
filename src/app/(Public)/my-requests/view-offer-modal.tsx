import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { acceptOfferApi } from "@/api";
import { Button, Modal, Text } from "@/components";
import { IRequestOffer } from "@/types";
import { capitalize } from "@/utils";

const ViewOfferModal = ({ offer, onClose }: { offer: IRequestOffer, onClose: () => void }) => {

  const { isPending, mutateAsync } = useMutation({
    mutationFn: acceptOfferApi,
    onSuccess() {
      toast.success("Offer Accepted!");

      onClose();
    },
    onError() {
      toast.error( "An error occured. Please try again!");
    },
  });

  const onSubmit = async () => {

    await mutateAsync({ offerId: offer.id, requestId: offer.requestId });
  };

  return (
    <Modal handleClose={onClose}>
      <>
        <Text
          variant="h2"
          className="text-center"
          value="Offer Details"
        />

          <div className="my-8">
        <ul className="m-10 space-y-5">
          <li><b>Username</b>: {capitalize(offer.username)}</li>
          <li><b>Point Score</b>: {offer.pointScore}</li>
          <li><b>Skills</b>:
          <ul>
            {offer.skills.map((skill, index) => (<li key={index}>- {skill.skillName}: {capitalize(skill.experienceLevel.toLowerCase())}</li> ))}
          </ul>
          </li>
        </ul>
          <Button
            isLoading={isPending}
            onClick={onSubmit}
            text="Accept Offer"
            className="ml-auto"
          />
        </div>
      </>
    </Modal>
  );
};

export { ViewOfferModal };
