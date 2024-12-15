import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required("Kindly enter your username")
    .min(3, "Username must be at least 3 characters long"),
  password: yup
    .string()
    .required("Kindly enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long",
    ),
});

export const signupSchema = yup.object().shape({
  username: yup
    .string()
    .required("Kindly enter your username")
    .min(3, "Username must be at least 3 characters long"),

  email: yup
    .string()
    .required("Kindly enter your email address")
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Invalid email address",
    ),
  password: yup
    .string()
    .required("Kindly enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long",
    ),
});
