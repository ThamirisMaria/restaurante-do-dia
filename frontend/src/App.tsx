import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AuthenticateUserPage } from "./pages/AuthenticateUserPage";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Navigation } from "./components/ui/Navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SignUpUserPage } from "./pages/SignUpUserPage";

export function App() {
  const { i18n } = useTranslation();

  const lng = navigator.language;
  useEffect(() => {
    i18n.changeLanguage(lng);
  }, [lng]);

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthenticateUserPage />} />
        <Route path="/signup" element={<SignUpUserPage />} />
      </Routes>
    </Router>
  );
}
