import { FormEvent, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { authenticateRequest } from "@/lib/requests";
import { Message, MessageProps } from "@/components/ui/Message";
import { useAuth } from "@/hooks";
import { useTranslation } from "react-i18next";
import { Button, Heading, VStack, Text } from "@chakra-ui/react";
import { Form } from "react-bootstrap";

type InputRefs = {
  email: React.RefObject<HTMLInputElement>;
  password: React.RefObject<HTMLInputElement>;
};

export function AuthenticateUserPage() {
  const { t } = useTranslation();
  const { updateAccessToken } = useAuth();
  const [message, setMessage] = useState<MessageProps | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const inputRefs: InputRefs = {
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
  };

  const resetForm = () => {
    if (inputRefs.email.current) {
      inputRefs.email.current.value = "";
    }
    if (inputRefs.password.current) {
      inputRefs.password.current.value = "";
    }
    setLoading(false);
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const email = inputRefs.email.current?.value;
    const password = inputRefs.password.current?.value;
    if (!email || !password) {
      setMessage({
        type: "INFO",
        description: t("message.info.email-or-password-missing"),
      });
      setLoading(false);
      return;
    }
    const [error, response] = await authenticateRequest(email, password);
    if (error) {
      resetForm();
      switch (error.message) {
        case "INVALID_CREDENTIALS":
        case "UNEXCEPTED_ERROR":
          setMessage({
            type: "ERROR",
            description: t("message.error.invalid-credentials.login"),
          });
          break;
        case "NETWORK_CONNECTION_ISSUE":
          setMessage({
            type: "WARNING",
            description: t("message.warning.verify-network-connection"),
          });
          break;
      }
    }
    if (response) {
      setMessage({
        type: "SUCCESS",
        description: t("message.success.authentication"),
      });
      setTimeout(function () {
        updateAccessToken(response.token);
        navigate("/voting", { replace: true });
      }, 1500);
    }
  };

  return (
    <VStack paddingTop="10vh" paddingBottom="8vh" minH="90.8vh">
      <Heading as="h1">{t("authentication.login")}</Heading>
      {message && <Message {...message} />}
      <Form
        method="POST"
        onSubmit={(e) => {
          setLoading(true);
          handleFormSubmit(e);
        }}
      >
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">{t("authentication.email")}:</Form.Label>
          <Form.Control
            type="text"
            name="email"
            id="email"
            ref={inputRefs.email}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">
            {t("authentication.password")}:
          </Form.Label>
          <Form.Control
            type="password"
            name="password"
            id="password"
            ref={inputRefs.password}
          />
        </Form.Group>
        <Text>
          {t("authentication.no-account")}
          <Link to=".././signup">
            <Text as="span" color="green">
              {t("authentication.signup")}
            </Text>
          </Link>
        </Text>
        <Form.Group>
          <Button
            colorScheme="green"
            variant="solid"
            isLoading={loading}
            type="submit"
          >
            {t("authentication.login")}
          </Button>
        </Form.Group>
      </Form>
    </VStack>
  );
}
