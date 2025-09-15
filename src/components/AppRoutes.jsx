import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeaderForm from "./HeaderForm";
import AuthForm from "./AuthForm";
import RegistForm from "./RegistForm";
import CostsTable from "./CostsTable.jsx";
import NewCosts from "./NewCosts";

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
          <Route path="/new-costs" element={<NewCosts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRoutes;
