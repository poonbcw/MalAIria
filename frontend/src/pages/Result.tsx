// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// const Result: React.FC = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex flex-col min-h-screen bg-[#FEFCFF]">
//       {/* Navbar */}
//       <nav className="z-20 relative flex justify-between items-center text-white px-6 py-1 bg-[#DD5746] shadow-md">
//         {/* Logo and Title */}
//         <div className="flex flex-col items-center" onClick={() => navigate("/")}>
//           <img
//             src="/images/Mm.png"
//             className="h-24 rounded-full"
//             alt="MalAIria Logo"
//           />
//           <div className="text-2xl font-bold">MalAIria</div>
//         </div>

//         {/* Navbar Links */}
//         <div className="flex space-x-9 text-lg mb-10">
//           <button
//             onClick={() => navigate("/analyze")}
//             className="hover:underline transition-all duration-300 ease-in-out"
//           >
//             Analyze
//           </button>
//           <button
//             onClick={() => navigate("/health-topic")}
//             className="hover:underline transition-all duration-300 ease-in-out"
//           >
//             Health Topic
//           </button>
//           <button
//             onClick={() => navigate("/about")}
//             className="hover:underline transition-all duration-300 ease-in-out"
//           >
//             About Us
//           </button>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="flex flex-col items-center mt-12 px-6">
//         {/* Title */}
//         <motion.h1
//           className="text-4xl font-bold text-[#DD5746]"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           Malaria Test Result
//         </motion.h1>

//         {/* Result Card */}
//         <motion.div
//           className="bg-[#DD5746] shadow-md rounded-lg p-6 mt-8 w-[80%] max-w-3xl text-center border-2 border-[#DD5746]"
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8 }}
//         >
//           <h2 className="text-2xl font-semibold text-[#000000]">
//             Probability of Malaria:
//           </h2>

//           {/* Progress Bar */}
//           <div className="w-full bg-[#EFE8D6] rounded-full h-6 mt-4 relative border border-[#F1C878]">
//             <div
//               className="bg-[#F1C878] h-6 rounded-full text-white flex items-center justify-center font-semibold"
//               style={{ width: "75%" }}
//             >
//               75%
//             </div>
//           </div>

//           {/* Result Message */}
//           <p className="mt-4 text-lg text-[#000000]">
//             Our AI model detects a **75% probability** of malaria. Please consult with a medical professional for further assessment.
//           </p>
//         </motion.div>

//         {/* Recommendation Section */}
//         <motion.div
//           className="bg-[#FEFCFF] shadow-md rounded-lg p-6 mt-8 w-[80%] max-w-3xl text-center border-2 border-[#DD5746]"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <h2 className="text-2xl font-semibold text-[#F1C878]">What’s Next?</h2>
//           <p className="mt-2 text-lg text-[#000000]">
//             If you experience symptoms such as fever, chills, or nausea, we recommend visiting a doctor.
//           </p>
//           <button
//             onClick={() => navigate("/health-topic")}
//             className="mt-4 px-6 py-3 bg-[#DD5746] text-white font-semibold rounded-lg shadow-md hover:bg-[#F1C878]"
//           >
//             Learn More
//           </button>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Result;


import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Result: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const resultData = location.state as { result: string; confidence: number };

  const confidencePercent = Math.round((resultData?.confidence || 0) * 100);

  return (
    <div className="flex flex-col min-h-screen bg-[#FEFCFF]">
      {/* Navbar */}
      <nav className="z-20 relative flex justify-between items-center text-white px-6 py-1 bg-[#DD5746] shadow-md">
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

      {/* Main Content */}
      <div className="flex flex-col items-center mt-12 px-6">
        <motion.h1
          className="text-4xl font-bold text-[#DD5746]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Malaria Test Result
        </motion.h1>

        <motion.div
          className="bg-[#DD5746] shadow-md rounded-lg p-6 mt-8 w-[80%] max-w-3xl text-center border-2 border-[#DD5746]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold text-[#000000]">
            Probability of Malaria:
          </h2>

          <div className="w-full bg-[#EFE8D6] rounded-full h-6 mt-4 relative border border-[#F1C878]">
            <div
              className="bg-[#F1C878] h-6 rounded-full text-white flex items-center justify-center font-semibold"
              style={{ width: `${confidencePercent}%` }}
            >
              {confidencePercent}%
            </div>
          </div>

          <p className="mt-4 text-lg text-[#000000]">
            Our AI model detects a **{confidencePercent}% probability** of malaria. 
            Detected: <b>{resultData?.result}</b>.  
            Please consult with a medical professional for further assessment.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Result;
