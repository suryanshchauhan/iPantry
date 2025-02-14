import * as Yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const emailRules = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.com$/;
export const registerSchema = Yup.object().shape({
  name: Yup.string().required("Name Must be required!"),
  email: Yup.string()
    .email("Invalid Email!")
    .matches(emailRules, { message: " Not valid :{" })
    .required("Email is Required!"),
    password: Yup.string()
    .matches(passwordRules, { message: "Please create a stronger password!" })
    .required("Password is Required!"),
});
