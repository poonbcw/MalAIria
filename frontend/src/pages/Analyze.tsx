// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Box, Typography, AppBar, Toolbar, Button } from "@mui/material";
// import { PhotoCamera } from "@mui/icons-material";

// const Analyze = () => {
//   const navigate = useNavigate();
//   const [selectedImage, setSelectedImage] = useState<File | null>(null);

//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       setSelectedImage(event.target.files[0]);
//     }
//   };

//   useEffect(() => {
//     if (selectedImage) {
//       const timer = setTimeout(() => {
//         navigate("/result");
//       }, 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [selectedImage, navigate]);

//   return (
//     <Box sx={{ backgroundColor: "#D65C47", minHeight: "100vh", textAlign: "center" }}>
//       {/* Navbar */}
//       <nav className="z-20 relative flex justify-between items-center text-white px-6 py-1">
//           {/* Logo and Title in Column */}
//           <div className="flex flex-col items-center" onClick={() => navigate("/")}>
//             <img
//               src="/images/Mm.png"
//               className="h-24 rounded-full"
//               alt="MalAIria Logo"
//             />
//             <div className="text-2xl font-bold">MalAIria</div>
//           </div>

//           {/* Navbar Links */}
//           <div className="flex space-x-9 text-lg mb-10">
//             <button
//               onClick={() => navigate("/analyze")}
//               className="hover:underline transition-all duration-300 ease-in-out"
//             >
//               Analyze
//             </button>
//             <button
//               onClick={() => navigate("/health-topic")}
//               className="hover:underline transition-all duration-300 ease-in-out"
//             >
//               Health Topic
//             </button>
//             <button
//               onClick={() => navigate("/about")}
//               className="hover:underline transition-all duration-300 ease-in-out"
//             >
//               About Us
//             </button>
//           </div>
//         </nav>

//       {/* Upload Section */}
//       <Typography variant="h5" fontWeight="bold" color="white" sx={{ mt: 5 }}>
//         Upload picture to start analyze
//       </Typography>

//       <Box
//         sx={{
//           width: "60%",
//           height: 300,
//           border: "4px dashed white",
//           borderRadius: 5,
//           mx: "auto",
//           mt: 3,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           cursor: "pointer",
//         }}
//       >
//         <label htmlFor="image-upload">
//           {selectedImage ? (
//             <img src={URL.createObjectURL(selectedImage)} alt="Uploaded" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//           ) : (
//             <>
//               <PhotoCamera sx={{ fontSize: 100, color: "white" }} />
//               <Typography color="white" variant="h6">
//                 Click to choose picture
//               </Typography>
//             </>
//           )}
//         </label>
//         <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
//       </Box>
//     </Box>
//   );
// };

// export default Analyze;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

const Analyze = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);

      // 👇 เตรียม FormData สำหรับส่งไป backend
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await fetch("http://localhost:3000/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        // ส่งผลลัพธ์ไปหน้า Result
        navigate("/result", { state: data });
      } catch (err) {
        console.error("Upload failed", err);
        alert("Upload failed. Please try again.");
      }
    }
  };

  return (
    <Box sx={{ backgroundColor: "#D65C47", minHeight: "100vh", textAlign: "center" }}>
      {/* Navbar */}
      <nav className="z-20 relative flex justify-between items-center text-white px-6 py-1">
        <div className="flex flex-col items-center" onClick={() => navigate("/")}>
          <img src="/images/Mm.png" className="h-24 rounded-full" alt="MalAIria Logo" />
          <div className="text-2xl font-bold">MalAIria</div>
        </div>
        <div className="flex space-x-9 text-lg mb-10">
          <button onClick={() => navigate("/analyze")} className="hover:underline">Analyze</button>
          <button onClick={() => navigate("/health-topic")} className="hover:underline">Health Topic</button>
          <button onClick={() => navigate("/about")} className="hover:underline">About Us</button>
        </div>
      </nav>

      {/* Upload Section */}
      <Typography variant="h5" fontWeight="bold" color="white" sx={{ mt: 5 }}>
        Upload picture to start analyze
      </Typography>

      <Box
        sx={{
          width: "60%",
          height: 300,
          border: "4px dashed white",
          borderRadius: 5,
          mx: "auto",
          mt: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <label htmlFor="image-upload">
          {selectedImage ? (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Uploaded"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <>
              <PhotoCamera sx={{ fontSize: 100, color: "white" }} />
              <Typography color="white" variant="h6">
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
      </Box>
    </Box>
  );
};

export default Analyze;
