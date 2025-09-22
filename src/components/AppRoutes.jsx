import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HeaderForm from "./HeaderForm";
import AuthForm from "./AuthForm";
import RegistForm from "./RegistForm";
import CostsTable from "./CostsTable";
import NewCosts from "./NewCosts";

function AppRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Функция для установки аутентификации
  const setAuth = (value) => {
    setIsAuthenticated(value);
  };

  return (
    <Router>
      <div className="AppRoutes">
        {isAuthenticated && <HeaderForm setAuth={setAuth} />}
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/expenses" replace />
              ) : (
                <AuthForm setAuth={setAuth} />
              )
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? (
                <Navigate to="/expenses" replace />
              ) : (
                <RegistForm setAuth={setAuth} />
              )
            }
          />
          <Route
            path="/expenses"
            element={
              isAuthenticated ? <CostsTable /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/new-costs"
            element={
              isAuthenticated ? <NewCosts /> : <Navigate to="/" replace />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRoutes;
