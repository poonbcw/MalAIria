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
    <Box>
      {/* Navbar */}
      <AppBar position="static" color="default" sx={{ px: 4, boxShadow: 0 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button color="inherit" sx={{ textTransform: "none" }}>
              Home
            </Button>
            <Button color="inherit" sx={{ textTransform: "none" }}>
              Analyze
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 50,
              height: 50,
              backgroundColor: "white",
              borderRadius: "50%",
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "white", fontWeight: "bold", fontSize: "1.5rem" }}
            >
              M
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button color="inherit" sx={{ textTransform: "none" }}>
              Health Topics
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Upload Section */}
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Upload Picture
        </Typography>
        <Card
          sx={{
            width: "100%",
            maxWidth: 600,
            margin: "auto",
            height: 300,
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
                <PhotoCamera sx={{ fontSize: 60, color: "white" }} />
                <Typography color="white">Click to choose picture</Typography>
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
