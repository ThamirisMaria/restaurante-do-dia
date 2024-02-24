import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";

import { authenticateRequest } from "@/lib/requests";
import { Message, MessageProps } from "@/components/ui/Message";
import { useAuth } from "@/hooks";
import { t } from "i18next";

type InputRefs = {
  email: React.RefObject<HTMLInputElement>;
  password: React.RefObject<HTMLInputElement>;
};

export function AuthenticateUserPage() {
  const { updateAccessToken } = useAuth();
  const [message, setMessage] = useState<MessageProps | null>(null);
  const navigate = useNavigate();

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
            description: t("message.error.invalid-credentials"),
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
        navigate("/", { replace: true });
      }, 1500);
    }
  };

  return (
    <Container>
      <h1>{t("authentication.login")}</h1>
      {message && <Message {...message} />}
      <Form method="POST" onSubmit={handleFormSubmit}>
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
        <Form.Group>
          <Button type="submit" variant="success">
            {t("authentication.login")}
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}
