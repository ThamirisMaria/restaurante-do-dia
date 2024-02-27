import { TFunction } from "i18next";
import * as Yup from "yup";

export const useValidation = (t: TFunction<"translation", undefined>) => {
  return Yup.object({
    name: Yup.string()
      .required(t("authentication.validation.missing.name"))
      .min(2, t("authentication.validation.invalid.name"))
      .matches(/^[a-zA-Z\s]*$/, t("authentication.validation.invalid.name")),
    lastname: Yup.string()
      .required(t("authentication.validation.missing.last-name"))
      .min(2, t("authentication.validation.invalid.last-name"))
      .matches(/^[a-zA-Z\s]*$/, t("authentication.validation.invalid.name")),
    email: Yup.string()
      .required(t("authentication.validation.missing.email"))
      .email(t("authentication.validation.invalid.email")),
    password: Yup.string()
      .required(t("authentication.validation.missing.password"))
      .min(8, t("authentication.validation.invalid.password"))
      .max(12, t("authentication.validation.invalid.password")),
  });
};
