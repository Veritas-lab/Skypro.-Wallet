import React from "react";
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

function AppRoutes() {
  return (
    <Router>
      <div className="AppRoutes">
        <HeaderForm />
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/register" element={<RegistForm />} />
          <Route path="/expenses" element={<CostsTable />} />
          <Route path="/new-costs" element={<NewCosts />} />
          <Route path="/cost-analysis" element={<CostAnalysis />} />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRoutes;