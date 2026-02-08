// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth } from "../firebase";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../auth/AuthContext";

// export default function Login() {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleGoogleLogin = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);

//       const token = await result.user.getIdToken();

//       const res = await fetch("http://localhost:3000/api/auth/google", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token }),
//       });

//       if (!res.ok) throw new Error("Auth failed");

//       const user = await res.json();

//       login(user); // ⭐ สำคัญ
//       navigate("/dashboard");
//     } catch (err) {
//       console.error(err);
//       alert("Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <button
//         onClick={handleGoogleLogin}
//         className="px-6 py-3 bg-white text-black rounded-lg flex items-center gap-3"
//       >
//         <img src="/google.svg" className="w-5" />
//         Sign in with Google
//       </button>
//     </div>
//   );
// }


import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // ✅ optional: sync user เข้า backend (ไม่เกี่ยวกับ UI)
      const token = await result.user.getIdToken();
      await fetch("http://localhost:3000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      // ✅ แค่ redirect พอ
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={handleGoogleLogin}
        className="px-6 py-3 bg-white text-black rounded-lg flex items-center gap-3"
      >
        <img src="/google.svg" className="w-5" />
        Sign in with Google
      </button>
    </div>
  );
}
