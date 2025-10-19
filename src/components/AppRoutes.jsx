// AppRoutes.jsx
import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HeaderForm from "./HeaderForm/HeaderForm";
import AuthForm from "./AuthForm/AuthForm";
import RegistForm from "./RegistForm/RegistForm";
import CostsTable from "./CostsTable/CostsTable";
import NewCosts from "./NewCosts/NewCosts";
import CostAnalysis from "./CostAnalysis/CostAnalysis";

function ProtectedRoute({ children }) {
  const { isAuth } = useContext(AuthContext);

  return isAuth ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Router>
      <div className="AppRoutes">
        <Routes>
          <Route path="/login" element={<AuthForm />} />
          <Route path="/register" element={<RegistForm />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Защищенные маршруты */}
          <Route
            path="/expenses"
            element={
              <ProtectedRoute>
                <HeaderForm />
                <CostsTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new-costs"
            element={
              <ProtectedRoute>
                <HeaderForm />
                <NewCosts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cost-analysis"
            element={
              <ProtectedRoute>
                <HeaderForm />
                <CostAnalysis />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRoutes;
