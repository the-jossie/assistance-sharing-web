"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button, Input, Text } from "@/components";
import { signupApi } from "@/api";
import { PAGE_ROUTES } from "@/configs";
import { signupSchema } from "@/utils";
import { SelectInput } from "@/components";

const SignupPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(signupSchema),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: signupApi,
  });

  const onSubmit = async (data: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      await mutateAsync(data);

      toast.success("Signup successful. Proceed to Login.");

      router.push(PAGE_ROUTES.LOGIN);
    } catch (error) {
      console.log({ error });
      toast.error("An error occured. Please try again!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Text
        value="Register"
        variant="h2"
        weight={400}
        className="text-center text-5xl"
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          register={register("name")}
          label="Full Name"
          error={errors.name}
        />
        <Input
          register={register("username")}
          label="User name"
          error={errors.username}
        />
        <Input
          type="email"
          register={register("email")}
          label="Email"
          error={errors.email}
        />
        <Input
          register={register("phone")}
          label="Phone"
          error={errors.phone}
        />

        <Input
          register={register("address")}
          label="Address"
          error={errors.address}
        />

        <SelectInput
          register={register("skill")}
          label="Skill"
          error={errors.skill}
          options={["Programming"]}
        />

        <SelectInput
          register={register("experienceLevel")}
          label="Experience Level"
          error={errors.experienceLevel}
          options={["BEGINNER", "INTERMEDIATE", "ADVANCED"]}
        />

        <Input
          type="password"
          register={register("password")}
          label="Password"
          error={errors.password}
        />
      </div>

      <div className="flex flex-col items-center justify-center space-y-4 mx-auto text-center !mt-10">
        <Button
          isLoading={isPending}
          disabled={!isValid || !isDirty}
          type="submit"
          text="Register"
          className="!px-14"
        />
        <Text variant="p2" weight={500} className="!mt-10">
          Already have an account?{" "}
          <Link href={PAGE_ROUTES.LOGIN} className="text-primary underline">
            Login here
          </Link>
        </Text>
      </div>
    </form>
  );
};

export default SignupPage;
