import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeaderForm from "./components/HeaderForm";
import AuthForm from "./components/AuthForm";
import RegistForm from "./components/RegistForm";
import CostsTable from "./components/СostsTable";
import "./App.css";

function App() {
  const [isAuthenticated] = useState(false);

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <HeaderForm />}
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/register" element={<RegistForm />} />
          <Route path="/expenses" element={<CostsTable />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
