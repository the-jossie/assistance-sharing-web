"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button, Input, Text } from "@/components";
import { PAGE_ROUTES } from "@/configs";
import { loginSchema } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "@/api";
import { toast } from "react-toastify";
import { useAuthContext } from "@/contexts";

const LoginPage = () => {
  const { saveAuth } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: loginApi,
    onSuccess(response) {
      saveAuth({ token: response.jwt, role: response.role[0].authority });

      toast.success("Welcome!");

      if (typeof window !== "undefined") {
          window.location.href = "/";
      }
    },
  });

  const onSubmit = async (data: { username: string; password: string }) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      console.log({error})
      toast.error("An error occured. Please try again!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 md:mt-16">
        <Text
          value="Login"
          variant="h2"
          weight={400}
          className="text-center text-5xl"
        />
        <Input
          id="username"
          register={register("username")}
          label="Username"
          placeholder="Enter your username"
          error={errors.username}
        />
        <Input
          type="password"
          id="password"
          placeholder="Enter your password"
          register={register("password")}
          label="Password"
          error={errors.password}
        />
        <Button
          text="Login"
          type="submit"
          isLoading={isPending}
          disabled={!isValid || !isDirty}
          className="mx-auto !mt-10 !px-14"
        />
      </form>
      <Text variant="p2" weight={500} className="!mt-10 text-center">
        Don`t have an account?{" "}
        <Link href={PAGE_ROUTES.SIGNUP} className="text-primary underline">
          Register here
        </Link>
      </Text>
    </div>
  );
};

export default LoginPage;
