import { StrictMode } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Analyze from "./pages/Analyze";
import "./App.css";

const App = () => {
  return (
    <StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/analyze" element={<Analyze />} />
        </Routes>
      </Router>
    </StrictMode>
  );
};

export default App;
