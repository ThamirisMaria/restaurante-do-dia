import { useTranslation } from "react-i18next";

export function HomePage() {
  const { t } = useTranslation();
  return (
    <div className="px-4">
      <h1>{t("home-page")}</h1>
    </div>
  );
}
