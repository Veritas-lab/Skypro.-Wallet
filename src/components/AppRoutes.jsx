import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
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
import CostAnalysis from "./CostAnalysis/CostAnalysis.jsx";

function ProtectedRoute({ children }) {
  const { isAuth } = useContext(AuthContext);
 
  return isAuth ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Router>
      <div className="AppRoutes">
        <Routes
        element={
          <ProtectedRoute>

          </ProtectedRoute>
        }>
          <Route path="/" element={<AuthForm />} />
          <Route path="/register" element={<RegistForm />} />
          <Route path="/expenses" element={
            <>
              <HeaderForm />
              <CostsTable />
            </>
          } />
          <Route path="/new-costs" element={
            <>
              <HeaderForm />
              <NewCosts />
            </>
          } />
          <Route path="/cost-analysis" element={
            <>
              <HeaderForm />
              <CostAnalysis />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRoutes;