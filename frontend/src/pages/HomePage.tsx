import { VStack, Heading, Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function HomePage() {
  const { t } = useTranslation();
  return (
    <VStack textAlign="center" p="10vh" minH="90.8vh" className="px-4">
      <Heading marginTop="5%" marginBottom="0" as="h1">
        {t("welcome.message")}
      </Heading>
      <Heading marginBottom="2%" marginTop="2%" as="h2" size="20">
        {t("welcome.action.login")}
      </Heading>
      <Link to="/login">
        <Button variant="solid" colorScheme="green" minW="20vw">
          {t("nav.login")}
        </Button>
      </Link>
    </VStack>
  );
}
