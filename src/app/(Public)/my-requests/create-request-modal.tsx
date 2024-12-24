import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createRequestApi } from "@/api";
import { Button, Input, Modal, Text } from "@/components";
import { createRequestSchema } from "@/utils";
import { SelectInput } from "@/components";

const CreateRequestModal = ({ onClose }: { onClose: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(createRequestSchema),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: createRequestApi,
    onSuccess() {
      toast.success("Request Created!");

      onClose();
    },
    onError() {
      toast.error( "An error occured. Please try again!");
    },
  });

  const onSubmit = async (data: { title: string; description: string; associatedSkill: string; }) => {

    await mutateAsync({ ...data });
  };

  return (
    <Modal handleClose={onClose}>
      <>
        <Text
          variant="h2"
          className="text-center"
          value="Create New Request"
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-between rounded-3xl md:px-10 py-5 space-y-4 h-full"
        >
          <div className="grid md:grid-cols-2 gap-4 md:gap-10">
            <Input
              placeholder="Enter request title"
              id="title"
              register={register("title")}
              label="Title"
              error={errors.title}
            />
            <Input
              placeholder="Enter request description"
              id="description"
              register={register("description")}
              label="Description"
              error={errors.description}
            />
            <SelectInput
              options={["Programming"]}
              register={register("associatedSkill")}
              id="associatedSkill"
              placeholder="Select"
              label="Associated Skill"
              error={errors.associatedSkill}
            />
          </div>
          <Button
            isLoading={isPending}
            disabled={!isValid || !isDirty}
            text="Create Request"
            type="submit"
            className="ml-auto"
          />
        </form>
      </>
    </Modal>
  );
};

export { CreateRequestModal };
