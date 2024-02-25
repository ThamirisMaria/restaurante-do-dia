import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";
import { Button } from "@chakra-ui/react";

export function Navigation() {
  const { t } = useTranslation();
  const { accessToken, updateAccessToken } = useAuth();

  const logout = () => {
    updateAccessToken(null);
  };

  return (
    <nav className="p-4">
      <Link to="/">{t("nav.home")}</Link> |
      {accessToken ? (
        <Button variant="link" onClick={logout}>
          {t("nav.signout")}
        </Button>
      ) : (
        <>
          <Link to="/login">{t("nav.login")}</Link> |
          <Link to="/signup">{t("nav.signup")}</Link>
        </>
      )}{" "}
    </nav>
  );
}
