import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Homepage from "./pages/Homepage";
import Analyze from "./pages/Analyze";

const theme = createTheme({
  typography: {
    fontFamily: `"Noto Sans Thai Looped", "Quicksand", sans-serif`,
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/analyze" element={<Analyze />} />
        </Routes>
      </Router>
    </ThemeProvider>
  </StrictMode>
);
