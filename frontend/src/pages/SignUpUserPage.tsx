import { Button, Heading, VStack } from "@chakra-ui/react";
import { Formik, FormikHelpers, FormikProps } from "formik";
import TextField from "./../components/ui/TextField";
import { useTranslation } from "react-i18next";
import { useValidation } from "@/hooks/useValidation.tsx";
import { FormEvent, useState } from "react";
import { signUpRequest } from "@/lib/requests/signUpRequest";
import { Message, MessageProps } from "@/components/ui/Message";
import { useNavigate } from "react-router-dom";

interface Values {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

export const SignUpUserPage = () => {
  const { t } = useTranslation();
  const [message, setMessage] = useState<MessageProps | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [event, setEvent] = useState<FormEvent<HTMLDivElement>>();
  const validation = useValidation(t, "signup");

  const handleFormSubmit = async (
    { name, lastname, email, password }: Values,
    actions: FormikHelpers<{
      name: string;
      lastname: string;
      email: string;
      password: string;
    }>
  ) => {
    event?.preventDefault();
    const [error, response] = await signUpRequest(
      name,
      lastname,
      email,
      password
    );
    console.log(response);
    console.log(error);
    if (error) {
      switch (error.message) {
        case "INVALID_CREDENTIALS":
        case "UNEXCEPTED_ERROR":
          actions.resetForm();
          setLoading(false);
          setMessage({
            type: "ERROR",
            description: t("message.error.invalid-credentials.signup"),
          });
          break;
        case "NETWORK_CONNECTION_ISSUE":
          actions.resetForm();
          setLoading(false);
          setMessage({
            type: "WARNING",
            description: t("message.warning.verify-network-connection"),
          });
          break;
      }
    }
    if (response) {
      actions.resetForm();
      setMessage({
        type: "SUCCESS",
        description: t("message.success.signup"),
      });
      setTimeout(() => {
        setLoading(false);
        navigate("/login", { replace: true });
      }, 1500);
    }
  };

  return (
    <Formik
      initialValues={{ name: "", lastname: "", email: "", password: "" }}
      validationSchema={validation}
      onSubmit={(values, actions) => {
        handleFormSubmit(values, actions);
      }}
    >
      {(props: FormikProps<Values>) => (
        <VStack>
          <Heading fontSize={{ base: "30px", sm: "40px", md: "45px" }} as="h1">
            {t("authentication.signup")}
          </Heading>
          {message && <Message {...message} />}
          <VStack
            as="form"
            onSubmit={(e) => {
              setEvent(e);
              setLoading(true);
              props.submitForm();
            }}
            padding={5}
          >
            <VStack flexDirection={{ base: "column", sm: "row" }}>
              <TextField
                label={t("authentication.name")}
                name="name"
                placeholder={t("authentication.placeholder.name")}
              ></TextField>
              <TextField
                label={t("authentication.last-name")}
                name="lastname"
                placeholder={t("authentication.placeholder.last-name")}
              ></TextField>
            </VStack>
            <TextField
              label={t("authentication.email")}
              name="email"
              type="email"
              placeholder={t("authentication.placeholder.email")}
            ></TextField>
            <TextField
              label={t("authentication.password")}
              name="password"
              type="password"
              placeholder={t("authentication.placeholder.password")}
            ></TextField>
            <Button
              fontSize={{ base: "22px", md: "24px" }}
              h={{ base: "48px", md: "50px" }}
              w={{ base: "140px", sm: "180px", md: "190px" }}
              type="submit"
              colorScheme="green"
              variant="solid"
              isDisabled={!(props.isValid && props.dirty)}
              isLoading={loading}
            >
              {t("authentication.signup")}
            </Button>
          </VStack>
        </VStack>
      )}
    </Formik>
  );
};
