import React, { useState } from "react";
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
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        position: "absolute", 
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <style>
        {`
          body, html {
            margin: 0;
            padding: 0;
            height: 100%;
          }
        `}
      </style>
      {/* Navbar */}
      <AppBar position="fixed" color="default">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
          }}
        >
          {/* Left Section */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button color="inherit" sx={{ textTransform: "none" }}>
              Home
            </Button>
            <Button color="inherit" sx={{ textTransform: "none" }}>
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
            <Button color="inherit" sx={{ textTransform: "none" }}>
              Health Topics
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Upload Section */}
      <Container
        sx={{
          mt: 10, 
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start", 
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          color="black" 
          sx={{ textAlign: "left" }} 
          gutterBottom
        >
          Upload Picture
        </Typography>
        <Card
          sx={{
            width: "100%",
            maxWidth: 2000,
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
                <Typography color="white" variant="h5" fontWeight="bold">
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
