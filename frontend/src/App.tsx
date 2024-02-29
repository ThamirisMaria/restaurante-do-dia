import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AuthenticateUserPage } from "./pages/AuthenticateUserPage";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Navigation } from "./components/ui/Navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SignUpUserPage } from "./pages/SignUpUserPage";
import { VotingPage } from "./pages/VotingPage";
import { useAuth } from "./hooks/useAuth";
import { ErrorUnauthorized } from "./components/error/ErrorUnauthorized";

export function App() {
  const { i18n } = useTranslation();

  const lng = navigator.language;
  useEffect(() => {
    i18n.changeLanguage(lng);
  }, [lng]);

  const { accessToken } = useAuth();

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthenticateUserPage />} />
        <Route path="/signup" element={<SignUpUserPage />} />
        <Route
          path="/voting"
          element={accessToken ? <VotingPage /> : <ErrorUnauthorized />}
        />
      </Routes>
    </Router>
  );
}
