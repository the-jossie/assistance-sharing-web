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
  name: yup
    .string()
    .required("Kindly enter your full name")
    .min(3, "Full name must be at least 3 characters long"),
  username: yup
    .string()
    .required("Kindly enter your username")
    .min(3, "Username must be at least 3 characters long"),
  phone: yup
    .string()
    .required("Kindly enter your full phone")
    .min(10, "Phone must be at least 3 characters long"),
  address: yup
    .string()
    .required("Kindly enter your address")
    .min(3, "Address must be at least 3 characters long"),
  skill: yup
    .string()
    .required("Kindly enter your relevant skill"),
  experienceLevel: yup
    .string()
    .required("Kindly select your experience level"),
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

export const createRequestSchema = yup.object().shape({
  title: yup
    .string()
    .required("Kindly enter request title")
    .min(3, "Title must be at least 3 characters long"),
  description: yup
    .string()
    .required("Kindly enter request description")
    .min(3, "Description must be at least 3 characters long"),
    associatedSkill: yup
    .string()
    .required("Kindly select associated skill"),
});
