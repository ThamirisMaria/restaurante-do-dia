import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "react-bootstrap";
import { t } from "i18next";

export function Navigation() {
  const { accessToken, updateAccessToken } = useAuth();

  const logout = () => {
    updateAccessToken(null);
  };

  return (
    <nav className="p-4">
      <Link to="/">{t("nav.home")}</Link> |
      {accessToken ? (
        <Button variant="link" className="p-0" onClick={logout}>
          {t("nav.logout")}
        </Button>
      ) : (
        <Link to="/login">{t("nav.login")}</Link>
      )}
    </nav>
  );
}
