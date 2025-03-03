import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Card,
  Container,
} from "@mui/material";

const ResultPage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#fff",
          boxShadow: 0,
          borderBottom: "1px solid #ddd",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
          }}
        >
          {/* Left Section */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button sx={{ textTransform: "none", color: "#000000" }} onClick={() => navigate("/")}>Home</Button>
            <Button color="inherit" sx={{ textTransform: "none", color: "#000000" }} onClick={() => navigate("/analyze")}>Analyze</Button>
          </Box>
          
          {/* Center Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "50px",
              height: "50px",
              backgroundColor: "black",
              borderRadius: "50%",
              mx: 2,
            }}
          >
            <Typography variant="h6" sx={{ color: "white", fontWeight: "bold", fontSize: "1.5rem" }}>M</Typography>
          </Box>
          
          {/* Right Section */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button color="inherit" sx={{ textTransform: "none", color: "#000000" }}>Health Topics</Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Result Section */}
      <Container sx={{ mt: 10, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>Result</Typography>
        <Card
          sx={{
            width: "100%",
            maxWidth: 1200,
            margin: "auto",
            height: 300,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#94a79a",
            borderRadius: 4,
          }}
        >
          {/* Placeholder for result visualization */}
        </Card>
        <Button variant="contained" color="error" sx={{ mt: 3, fontSize: "1.2rem" }}>DANGER</Button>
        <Typography mt={2} textAlign="left">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quo ipsum cumque laudantium, asperiores aperiam quasi alias maiores unde facere, ratione excepturi suscipit corrupti quae, ab possimus? Illo, recusandae ex?
        </Typography>
      </Container>
    </Box>
  );
};

export default ResultPage;
