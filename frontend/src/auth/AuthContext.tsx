// import { createContext, useContext, useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../firebase";

// export type User = {
//   id: string;
//   email: string;
//   name?: string;
//   avatar?: string;
// };

// type AuthContextType = {
//   user: User | null;
//   loading: boolean;
//   login: (u: User) => void;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthContextType | null>(null);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, async (fbUser) => {
//       if (!fbUser) {
//         setUser(null);
//         setLoading(false);
//         return;
//       }

//       // 🔁 ดึง user จาก backend / prisma
//       const token = await fbUser.getIdToken();
//       const res = await fetch("http://localhost:3000/api/auth/me", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (res.ok) {
//         const dbUser = await res.json();
//         setUser(dbUser);
//       }

//       setLoading(false);
//     });

//     return () => unsub();
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         login: setUser,
//         logout: () => {
//           auth.signOut();
//           setUser(null);
//         },
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used within AuthProvider");
//   return ctx;
// };

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export type User = {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (fbUser) => {
      if (!fbUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      // ✅ ดึงข้อมูลจาก Firebase ตรง ๆ
      setUser({
        id: fbUser.uid,
        email: fbUser.email ?? "",
        name: fbUser.displayName ?? "",
        avatar: fbUser.photoURL
          ? `${fbUser.photoURL.split("=")[0]}=s200-c`
          : "",
      });

      setLoading(false);
    });

    return () => unsub();
  }, []);

  const logout = async () => {
    await auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
