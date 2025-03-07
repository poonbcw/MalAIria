import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Analyze from "./pages/Analyze";
import Result from "./pages/Result"; 
import './index.css'



createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Router>
  </StrictMode>
);
