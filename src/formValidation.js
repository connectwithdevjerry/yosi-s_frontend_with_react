import * as yup from "yup";
export const signInValidationSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .matches(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
      "Min 8 char, at least one letter, one number and one special character"
    )
    .required("password is required!"),
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

export const shippingValidationSchema = yup.object({
  orderId: yup.string().required("order ID not found, refresh page!"),
  email: yup.string().email().required("Email is required"),
  fullName: yup.string().required("Please enter your name.."),
  street: yup.string().required("Please enter your street.."),
  city: yup.string().required("Please enter your city.."),
  state: yup.string().required("Please enter your state.."),
  zipCode: yup.string().required("Please enter your zipCode.."),
  country: yup.string().required("Please enter your country.."),
});
