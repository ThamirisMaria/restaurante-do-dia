import { Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export function HomePage() {
  const { t } = useTranslation();
  return (
    <Box p="10vh" className="px-4">
      <h1>{t("home-page")}</h1>
    </Box>
  );
}
