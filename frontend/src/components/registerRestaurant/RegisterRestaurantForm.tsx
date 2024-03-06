import { useValidation } from "@/hooks/useValidation";
import { Formik, FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import RegisterRestaurantModal from "../RegisterRestaurantModal";
import { registerRestaurantRequest } from "@/lib/requests/registerRestaurantRequest";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Message, MessageProps } from "../ui/Message";
import { useNavigate } from "react-router-dom";
import { Toast } from "@chakra-ui/react";

export interface FormValues {
  name: string;
  description: string;
  website: string;
  image: string;
  address: {
    postCode: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
  };
}

export const initialValues: FormValues = {
  name: "",
  description: "",
  website: "",
  image: "",
  address: {
    postCode: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
  },
};

const RegisterRestaurantForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const validation = useValidation(t, "restaurant");

  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const data = {
      accessToken,
      ...values,
    };

    const [error, response] = await registerRestaurantRequest(data);

    if (response) {
      actions.resetForm();
      setTimeout(() => {
        navigate("/voting", { replace: true });
      }, 1500);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validation}
      onSubmit={(values, actions) => {
        onSubmit(values, actions);
      }}
    >
      <RegisterRestaurantModal />
    </Formik>
  );
};

export default RegisterRestaurantForm;
