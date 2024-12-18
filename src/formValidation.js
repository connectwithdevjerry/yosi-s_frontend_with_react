import * as yup from "yup";
export const signInValidationSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("password is required!"),
});

export const signupValidationSchema = yup.object({
  firstName: yup.string().required("Please enter a first name"),
  lastName: yup.string().required("Please enter a last name"),
  email: yup.string().email().required("Please enter a valid email address"),
  password: yup
    .string()
    .matches(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
      "Min 8 char, at least one letter, one number and one special character"
    )
    .required("password is required!"),
  cpassword: yup
    .string()
    .matches(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
      "Min 8 char, at least one letter, one number and one special character"
    )
    .required("cpassword is required!"),
});

export const studentRegValidationSchema = yup.object({
  firstName: yup.string().required("Please enter a first name"),
  lastName: yup.string().required("Please enter a last name"),
  email: yup.string().email().required("Please enter a valid email address"),
});

export const resetPasswordSchema = yup.object({
  newPassword: yup
    .string()
    .matches(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
      "Min 8 char, at least one letter, one number and one special character"
    )
    .required("password is required!"),
  cnewPassword: yup
    .string()
    .matches(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
      "Min 8 char, at least one letter, one number and one special character"
    )
    .required("confirm password is required!"),
});

export const contactValidationSchema = yup.object({
  message: yup.string().required("message cannot be blank!"),
  name: yup.string().required("Name cannot be blank!"),
  email: yup.string().email().required("Email cannot be blank!"),
});

export const CreateClassValidationSchema = yup.object({
  title: yup.string().required(),
  description: yup.string(),
  dateAndTime: yup.date(),
  venue: yup.string(),
  ageMin: yup.number(),
  ageMax: yup.number(),
  no_of_max_signups: yup.number(),
  style: yup.string(),
  classImage: yup.string().required(),
  instructor: yup.string().required(),
  update_no_of_max_signups: yup.boolean(),
  update_style: yup.boolean(),
  updateDescription: yup.boolean(),
  udateDateAndTime: yup.boolean(),
  updateAgeGroup: yup.boolean(),
  updateVenue: yup.boolean(),
});

export const updateClassValidationSchema = yup.object({
  description: yup.string(),
  dateAndTime: yup.date(),
  venue: yup.string(),
  ageMin: yup.number(),
  ageMax: yup.number(),
  no_of_max_signups: yup.number(),
  style: yup.string(),
  update_no_of_max_signups: yup.boolean(),
  update_style: yup.boolean(),
  updateDescription: yup.boolean(),
  udateDateAndTime: yup.boolean(),
  updateAgeGroup: yup.boolean(),
  updateVenue: yup.boolean(),
});
