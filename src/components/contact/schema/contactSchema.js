import * as Yup from "yup";

export const contactSchema = Yup.object().shape({
  itemName: Yup.string()
    .min(2, "Item name is too short!")
    .max(50, "Item name is too long!")
    .required("Item name is required!"),
  quantity: Yup.number()
    .min(1, "Quantity must be at least 1!")
    .required("Quantity is required!")
    .typeError("Quantity must be a number!"),
});
