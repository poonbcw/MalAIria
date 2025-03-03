import React, { useState, useEffect } from "react";
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
import { PhotoCamera } from "@mui/icons-material";

const Analyze = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  // ใช้ useEffect เพื่อตรวจจับการเปลี่ยนแปลงของ selectedImage และทำให้รอ 3 วิก่อน redirect
  useEffect(() => {
    if (selectedImage) {
      const timer = setTimeout(() => {
        navigate("/result");
      }, 1000);

      return () => clearTimeout(timer); // เคลียร์ timeout ถ้ามีการเปลี่ยนแปลงก่อนครบ 3 วินาที
    }
  }, [selectedImage, navigate]);

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
            <Button
              sx={{ textTransform: "none", color: "#000000" }}
              onClick={() => navigate("/")}
            >
              Home
            </Button>
            <Button
              color="inherit"
              sx={{ textTransform: "none", color: "#000000" }}
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
              backgroundColor: "black",
              borderRadius: "50%",
              mx: 2,
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
            <Button
              color="inherit"
              sx={{ textTransform: "none", color: "#000000" }}
            >
              Health Topics
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Upload Section */}
      <Container sx={{ mt: 10, textAlign: "left" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Upload Picture
        </Typography>
        <Card
          sx={{
            width: "100%",
            maxWidth: 1200,
            margin: "auto",
            height: 500,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#94a79a",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          <label
            htmlFor="image-upload"
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              cursor: "pointer",
            }}
          >
            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Uploaded"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 4,
                }}
              />
            ) : (
              <>
                <PhotoCamera sx={{ fontSize: 200, color: "white" }} />
                <Typography color="white" variant="h5">
                  Click to choose picture
                </Typography>
              </>
            )}
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </Card>
      </Container>
    </Box>
  );
};

export default Analyze;
