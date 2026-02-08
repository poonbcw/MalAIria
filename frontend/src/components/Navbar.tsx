import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../auth/AuthContext";
import Logo from "../assets/logo.svg?react";
import LoginModal from "../pages/LoginModal";

import { signOut } from "firebase/auth";
import { auth } from "../firebase";

import LogoutIcon from "@mui/icons-material/Logout";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard"; // เพิ่มไอคอนมาเพื่อความสวยงาม

export default function Navbar() {
  const [hide, setHide] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. ปิด dropdown เมื่อคลิกนอก (เหมือนเดิม แต่เพิ่มระบุประเภท Event ให้ชัดเจน)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // 2. รวม logic การ Scroll ไว้ในอันเดียว และเพิ่มเงื่อนไขเช็ค Modal
  useEffect(() => {
    const handleScroll = () => {
      // ถ้าเปิด Modal ให้หยุดการคำนวณ scroll เพื่อไม่ให้ Navbar ขยับ
      if (isModalOpen) return;

      const currentY = window.scrollY;

      // การซ่อน/แสดง Navbar: ซ่อนเมื่อเลื่อนลงเกิน 80px และแสดงเมื่อเลื่อนขึ้น
      if (currentY > lastScrollY && currentY > 80) {
        setHide(true);
      } else {
        setHide(false);
      }

      // เปลี่ยนจากใสเป็นโปร่งแสง (Glass effect) เมื่อเลื่อนเกิน 40px
      setScrolled(currentY > 40);
      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isModalOpen]); // เพิ่ม isModalOpen ใน dependency
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  /** ⭐ helper สำหรับ scroll section แบบสะอาดๆ */
  const goToSection = (id: string) => {
    if (location.pathname !== "/") {
      // ถ้าอยู่หน้าอื่น ให้กลับหน้าแรกก่อน
      navigate("/");

      // ใช้ setTimeout เล็กน้อยเพื่อให้หน้า Home render เสร็จก่อนค่อยไถจอ
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else {
          // ถ้าหา id ไม่เจอ (เช่น กรณีหน้ายังโหลดไม่เสร็จ) ให้เด้งไปบนสุด
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 100);
    } else {
      // ถ้าอยู่หน้า Home อยู่แล้ว เลื่อนได้เลย (ไม่มี # โผล่บน URL)
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      // เลื่อนขึ้นบนสุดหลังจากย้ายหน้า
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
    }
  };
  return (
    <nav
      className={`
        fixed top-0 w-full z-50 h-20
        transition-all duration-500
        ${hide ? "-translate-y-full" : "translate-y-0"}
        ${
          scrolled
            ? "bg-slate-900/80 backdrop-blur-md border-b border-white/5 py-2" // หดความสูงลงเล็กน้อยตอน scroll
            : "bg-transparent py-4" // ตอนอยู่บนสุดให้ดูโปร่งๆ
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-8 h-full flex justify-between items-center">
        {/* ✅ LOGO SECTION */}
        <div
          onClick={handleLogoClick}
          className="cursor-pointer hover:opacity-80 transition"
        >
          <Link to="/" className="flex items-center gap-3">
            <Logo className="w-10 h-10 text-cyan-400" />
            <span className="text-xl font-bold tracking-tighter text-white tracking-wider -ml-1">
              MAL<span className="text-cyan-400">AI</span>RIA
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-10">
          {/* ✅ NAV LINKS */}
          <div className="hidden md:flex items-center gap-8 text-[13px] font-medium tracking-widest text-slate-300">
            {["home", "service", "contact"].map((m) => (
              <button
                key={m}
                onClick={() => goToSection(m)}
                className="hover:text-cyan-400 transition-colors uppercase"
              >
                {m}
              </button>
            ))}
            <Link
              to="/analyze"
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-cyan-500 hover:text-slate-900 transition-all"
            >
              ANALYZE
            </Link>
          </div>

          {/* ✅ USER SECTION */}
          {user ? (
            <div className="relative flex items-center" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-white/5 transition border border-transparent hover:border-white/10"
              >
                <img
                  src={user.avatar || "/avatar.png"}
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-full object-cover border-2 border-cyan-500/50"
                />
                <span className="text-sm font-medium hidden sm:block">
                  My Account
                </span>
              </button>

              {open && (
                <div className="absolute right-0 top-14 w-56 bg-slate-800 border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2 animate-in fade-in zoom-in duration-200">
                  <div className="px-4 py-3 border-b border-white/5 mb-2">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                      Signed in as
                    </p>
                    <p className="text-sm font-medium truncate text-cyan-400">
                      {user.name || user.email}
                    </p>
                  </div>

                  {/* ปรับแก้ระยะไอคอนให้ตรงกันตรงนี้ครับ */}
                  <DropdownItem
                    onClick={() => navigate("/dashboard")}
                    icon={
                      <SpaceDashboardIcon
                        className="text-slate-400"
                        sx={{ fontSize: 20 }}
                      />
                    }
                    label="Dashboard"
                  />

                  <div className="my-1 " />

                  <DropdownItem
                    onClick={handleLogout}
                    icon={
                      <LogoutIcon
                        className="text-red-400"
                        sx={{ fontSize: 20 }}
                      />
                    }
                    label="Logout"
                    variant="danger"
                  />
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-sm font-bold text-white bg-cyan-600 px-6 py-2 rounded-full hover:bg-cyan-500 transition-all shadow-lg shadow-cyan-500/20"
            >
              LOGIN
            </button>
          )}
          <LoginModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>
    </nav>
  );
}

// ⭐ Sub-component สำหรับจัดการความเรียบร้อยของ Dropdown
function DropdownItem({ onClick, icon, label, variant = "default" }: any) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full px-4 py-2.5 text-sm flex items-center transition-colors
        ${
          variant === "danger"
            ? "text-red-400 hover:bg-red-400/10"
            : "text-slate-300 hover:bg-white/5"
        }
      `}
    >
      <div className="w-8 flex justify-start items-center">{icon}</div>
      <span className="font-medium">{label}</span>
    </button>
  );
}
