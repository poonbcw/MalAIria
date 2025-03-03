import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  CssBaseline,
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Card,
  Grid2,
  Container,
} from "@mui/material";

const Homepage = () => {
  return (
    <div className="flex h-screen bg-[#f0f0f0]">
      <CssBaseline />
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
            <Button sx={{ textTransform: "none", color: "#000000" }}>Home</Button>
            <Button color="inherit" sx={{ textTransform: "none", color: "#000000" }}>
              Analyze
            </Button>
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
              borderRadius: "50%", // ทำให้กรอบเป็นวงกลม
              mx: 2, // ระยะห่างด้านข้าง
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "1.5rem",
                textAlign: "center",
              }}
            >
              M
            </Typography>
          </Box>

          {/* Right Section */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button color="inherit" sx={{ textTransform: "none", color: "#000000" }}>
              Health Topics
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          height: "50vh",
          backgroundImage:
            "url('/images/image 7.png'), linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          textAlign: "left", // ชิดซ้าย
          px: 4,
        }}
      >
        <Typography variant="h3" fontWeight="bold" color="white">
          MalAIria
        </Typography>
        <Typography variant="subtitle1" color="white" sx={{ mb: 2 }}>
          Discover the ultimate tool for malaria detection
        </Typography>
        <Button variant="contained" color="warning" size="large">
          Get Start
        </Button>
      </Box>

      {/* Content Section */}
      <Container sx={{ py: 6, textAlign: "left" }}>
        <Typography variant="h4" gutterBottom>
          What is MalAIria?
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
          MalAIria is an advanced medical service that brings malaria detection
          to a whole new level. It enhances the ability of healthcare
          professionals to detect malaria quickly and accurately, empowering
          them to take timely action. With the power of AI, MalAIria analyzes
          blood smear images to identify malaria parasites and determine their
          life stages, providing results almost instantly.
        </Typography>

        <Grid2 container spacing={4}>
          {[1, 2, 3].map((item) => (
            <Grid2 size={{ xs: 12, md: 4 }} key={item}>
              <Card
                sx={{
                  height: "400px",
                  backgroundColor: "#94a79a",
                  borderRadius: "12px",
                }}
              ></Card>
            </Grid2>
          ))}
        </Grid2>
      </Container>

      {/* Footer Section */}
      <Box sx={{ px: 4, py: 6, bgcolor: "#f5f5f5", textAlign: "left" }}>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <Typography variant="body2" color="textSecondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                height: "100%",
                backgroundColor: "#94a79a",
                borderRadius: "8px",
              }}
            ></Card>
          </Grid2>
        </Grid2>

        <Grid2 container spacing={2} sx={{ mt: 4 }}>
          {[1, 2, 3].map((item) => (
            <Grid2 size={{ xs: 12, md: 6 }} key={item}>
              <Card
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  boxShadow: 1,
                  borderRadius: "8px",
                }}
              >
                <Box
                  sx={{
                    width: "50px",
                    height: "50px",
                    bgcolor: "#94a79a",
                    borderRadius: "50%",
                    mr: 2,
                  }}
                ></Box>
                <Typography variant="body2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do Lorem ipsum dolor sit amet.
                </Typography>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </div>
  );
};

export default Homepage;
