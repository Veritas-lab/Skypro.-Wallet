import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeaderForm from "./components/HeaderForm";
import AuthForm from "./components/AuthForm";
import RegistForm from "./components/RegistForm";
import CostsTable from "./components/СostsTable";
import NewCosts from "../NewCosts";

function AppRoutes() {
  const [isAuthenticated] = useState(false);

  return (
    <Router>
      <div className="AppRoutes">
        {isAuthenticated && <HeaderForm />}
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/register" element={<RegistForm />} />
          <Route path="/expenses" element={<CostsTable />} />
          <Route path="/expenses" element={<NewCosts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRoutes;
