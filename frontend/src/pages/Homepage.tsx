import React from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  return (
    <div className="flex h-screen bg-[#f0f0f0]">
      <CssBaseline />
      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#000", // เปลี่ยนพื้นหลังจากขาวเป็นดำ
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
            <Button
              sx={{ textTransform: "none", color: "#fff" }} // ปรับสีปุ่มจากดำเป็นขาว
              onClick={() => navigate("/")}
            >
              Home
            </Button>
            <Button
              color="inherit"
              sx={{ textTransform: "none", color: "#fff" }} // ปรับสีปุ่มจากดำเป็นขาว
              onClick={() => navigate("/analyze")}
            >
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
              backgroundColor: "#fff", // ปรับพื้นหลังจากดำเป็นขาว
              borderRadius: "50%",
              mx: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "black", // ปรับสีตัวอักษรจากขาวเป็นดำ
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
            <Button
              color="inherit"
              sx={{ textTransform: "none", color: "#fff" }} // ปรับสีปุ่มจากดำเป็นขาว
            >
              Health Topics
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          height: "70vh",
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
          Get Started
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
          {[
            {
              id: 1,
              title: "Image Analysis",
              description:
                "MalAIria starts by analyzing blood smear images using high-resolution imaging techniques.",
              icon: "🖼️",
            },
            {
              id: 2,
              title: "AI Detection",
              description:
                "Advanced AI algorithms detect malaria parasites and determine their life stage with high accuracy.",
              icon: "🤖",
            },
            {
              id: 3,
              title: "Results & Diagnosis",
              description:
                "The system provides instant results, allowing healthcare professionals to make quick decisions.",
              icon: "📊",
            },
          ].map((item) => (
            <Grid2 size={{ xs: 12, md: 4 }} key={item.id}>
              <Card
                sx={{
                  height: "400px",
                  backgroundColor: "#94a79a",
                  borderRadius: "12px",
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  color: "white",
                }}
              >
                <Typography variant="h4">{item.icon}</Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {item.description}
                </Typography>
              </Card>
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
          {[
            {
              id: 1,
              title: "Malaria Symptoms",
              route: "/health-topic/malaria-symptoms",
            },
            {
              id: 2,
              title: "Prevention Methods",
              route: "/health-topic/prevention",
            },
            {
              id: 3,
              title: "Treatment Options",
              route: "/health-topic/treatment",
            },
          ].map((item) => (
            <Grid2 size={{ xs: 12, md: 6 }} key={item.id}>
              <Card
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  boxShadow: 1,
                  borderRadius: "8px",
                  cursor: "pointer", // เปลี่ยนเป็น cursor pointer เพื่อให้รู้ว่ากดได้
                  "&:hover": { boxShadow: 3 }, // ทำให้มี effect ตอน hover
                }}
                onClick={() => navigate(item.route)} // เพิ่ม event คลิก
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
                <Typography variant="body2">{item.title}</Typography>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </div>
  );
};

export default Homepage;
