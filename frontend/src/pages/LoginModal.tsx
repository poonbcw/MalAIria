import {
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import googlePng from "../assets/google.png";
import Logo from "../assets/logo.svg?react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleGoogleLogin = async (): Promise<void> => {
    try {
      const provider = new GoogleAuthProvider();
      const result: UserCredential = await signInWithPopup(auth, provider);

      const token = await result.user.getIdToken();
      const response = await fetch("http://localhost:3000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        onClose();
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert("Login failed. Please try again.");
    }
  };

  return (
    // Backdrop: ใช้ bg-black/70 และ backdrop-blur เพื่อเน้นป๊อปอัพตรงกลาง
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/30 w-screen h-screen p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Modal Box: เพิ่ม Animation ตอนเด้งขึ้นมา (zoom-in) */}
      <div
        className="bg-[#1e293b] p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full max-w-sm border border-white/10 relative 
                   animate-in fade-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ปุ่มปิด (X) */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-white hover:rotate-90 transition-all duration-300 text-xl"
        >
          ✕
        </button>

        <div className="text-center">
          {/* Logo/Icon Section */}
          <div className="flex items-center justify-center mx-auto mb-8">
            {/* ปรับ w-20 h-20 (หรือใหญ่กว่า) ที่นี่เพื่อให้โลโก้ขยายใหญ่ขึ้นตามต้องการ */}
            <Logo className="w-24 h-24 text-cyan-400 " />
          </div>

          <h2 className="text-3xl font-extrabold text-white mb-3 tracking-tight">
            Welcome
          </h2>
          <p className="text-gray-400 text-base leading-relaxed mb-10">
            Sign in to access your <br />
            <span className="text-cyan-400 font-medium">
              Malaria Analysis Dashboard
            </span>
          </p>

          <button
            onClick={handleGoogleLogin}
            className="w-full py-4 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-4 
                       hover:bg-gray-100 transition-all active:scale-[0.97] shadow-xl hover:shadow-white/10"
          >
            <img src={googlePng} className="w-6" alt="google" />
            Continue with Google
          </button>

          <p className="mt-8 text-[11px] text-gray-500 uppercase tracking-widest font-semibold">
            Secure Authentication via Firebase
          </p>
        </div>
      </div>
    </div>
  );
}
