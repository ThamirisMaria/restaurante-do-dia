import { TFunction } from "i18next";
import * as Yup from "yup";

export const useValidation = (
  t: TFunction<"translation", undefined>,
  form: String
) => {
  switch (form) {
    case "signup":
      Yup.object({
        name: Yup.string()
          .trim()
          .required(t("authentication.validation.missing.name"))
          .min(2, t("authentication.validation.invalid.name"))
          .matches(
            /^[a-zA-Z\s]*$/,
            t("authentication.validation.invalid.name")
          ),
        lastname: Yup.string()
          .trim()
          .required(t("authentication.validation.missing.last-name"))
          .min(2, t("authentication.validation.invalid.last-name"))
          .matches(
            /^[a-zA-Z\s]*$/,
            t("authentication.validation.invalid.name")
          ),
        email: Yup.string()
          .trim()
          .required(t("authentication.validation.missing.email"))
          .email(t("authentication.validation.invalid.email")),
        password: Yup.string()
          .trim()
          .required(t("authentication.validation.missing.password"))
          .min(8, t("authentication.validation.invalid.password"))
          .max(12, t("authentication.validation.invalid.password")),
      });
      break;
    case "login":
      Yup.object({
        email: Yup.string()
          .trim()
          .required(t("authentication.validation.missing.email"))
          .email(t("authentication.validation.invalid.email")),
        password: Yup.string()
          .trim()
          .required(t("authentication.validation.missing.password"))
          .min(8, t("authentication.validation.invalid.password"))
          .max(12, t("authentication.validation.invalid.password")),
      });
      break;
    case "restaurant":
      return Yup.object({
        name: Yup.string()
          .trim()
          .required(t("authentication.validation.missing.name"))
          .min(2, t("authentication.validation.invalid.name"))
          .matches(
            /^[a-zA-Z\s]*$/,
            t("authentication.validation.invalid.name")
          ),
        description: Yup.string().trim().required("Description is required"),
        website: Yup.string().url("Invalid URL"),
        image: Yup.string().url("Invalid URL"),
        address: Yup.object().shape({
          number: Yup.string()
            .trim()
            .required("Number is required")
            .max(5, "Invalid address number"),
          postCode: Yup.string().trim().required("CEP is required"),
          neighborhood: Yup.string()
            .trim()
            .required("Neighborhood is required"),
          street: Yup.string().trim().required("Street is required"),
          city: Yup.string().trim().required("City is required"),
          state: Yup.string()
            .trim()
            .required("State is required")
            .min(2, "State must have two characters")
            .max(2, "State must have two characters"),
        }),
      });
    default:
      break;
  }
};
