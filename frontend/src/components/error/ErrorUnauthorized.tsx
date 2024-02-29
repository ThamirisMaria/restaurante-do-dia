import { Container, Image } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export function ErrorUnauthorized() {
  const { t } = useTranslation();
  return (
    <Container>
      <Image
        src="src\assets\401-error-unauthorized.svg"
        alt={t("error.unauthorized")}
      />
    </Container>
  );
}
