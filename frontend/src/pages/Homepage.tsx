// import React from "react";
// import { motion } from "framer-motion";
// import "../components/Homepage.css";
// import { useNavigate } from "react-router-dom";

// const Homepage: React.FC = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex flex-col min-h-screen bg-[#EFE8D6]">
//       <div className="spacer layer1">
//         {/* Navbar */}
//         <nav className="z-20 relative flex justify-between items-center text-white px-6 py-1">
//           {/* Logo and Title in Column */}
//           <div className="flex flex-col items-center">
//             <img
//               src="/images/Mm.png"
//               className="h-24 rounded-full"
//               alt="MalAIria Logo"
//             />
//             <div className="text-2xl font-bold ">MalAIria</div>
//           </div>

//           {/* Navbar Links */}
//           <div className="flex space-x-9 text-lg mb-10">
//             <a
//               href="/analyze"
//               className="hover:underline transition-all duration-300 ease-in-out"
//             >
//               Analyze
//             </a>
//             <a
//               href="#"
//               className="hover:underline transition-all duration-300 ease-in-out"
//             >
//               Health Topic
//             </a>
//             <a
//               href="#"
//               className="hover:underline transition-all duration-300 ease-in-out"
//             >
//               About Us
//             </a>
//           </div>
//         </nav>

//         {/* Main Content */}
//         <div className="relative flex flex-col items-center text-center text-white z-10">
//           <h1 className="text-4xl font-bold">
//             Discover the ultimate tool for malaria detection
//           </h1>
//           <button
//             onClick={() => navigate(`/analyze`)}
//             className="mt-4 px-6 py-3 bg-[#FCE5CD] text-black font-semibold rounded-lg shadow-md hover:bg-[#FFD6A5]"
//           >
//             GET STARTED
//           </button>
//         </div>
//         {/* About Section */}
//         <div className="px-8 py-16 mt-60">
//           <h2 className="text-3xl font-bold">What is Malaria</h2>
//           <p className="mt-4 text-lg text-gray-700">
//             MalAIria is an advanced medical service that brings malaria
//             detection to a whole new level. It enhances the ability of
//             healthcare professionals to detect malaria quickly and accurately,
//             empowering them to take timely action.
//           </p>
//         </div>
//       </div>

//       {/* Hero Section */}

//       {/* Fade-in Image */}
//       {/* <motion.img 
//         src="./images/yellowGuy.png" 
//         alt="Young man chatting on laptop"
//         className="absolute w-[500px] h-[450px] left-[50%] transform -translate-x-1/2 top-[400px]"
//         initial={{ opacity: 0, x: -50 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 1 }}
//       /> */}

//       {/* How It Works Section */}
//       {/* <div className="px-8 py-16 bg-[#EED9C4]">
//         <h2 className="text-2xl font-bold text-center">How MalAIria Works</h2>
//         <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
//           {["Image Analysis", "AI Detection", "Results & Diagnosis"].map((step, index) => (
//             <div key={index} className="p-6 bg-white text-center shadow-md rounded-lg">
//               <h3 className="text-lg font-semibold">{step}</h3>
//             </div>
//           ))}
//         </div>
//       </div> */}

//       {/* Testimonial Section */}
//       {/* <div className="px-8 py-16 bg-[#F9D8A9] text-center">
//         <img src="/images/testimonial.png" alt="Patient" className="mx-auto w-24 h-24 rounded-full" />
//         <p className="mt-4 max-w-lg mx-auto text-gray-700">
//           "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
//         </p>
//       </div> */}
//     </div>
//   );
// };

// export default Homepage;
