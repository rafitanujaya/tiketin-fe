import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import {
  ChevronDown,
  User,
  FileText,
  Ticket,
  Settings,
  LogOut
} from "lucide-react";
import { useAuth } from "../../hook/useAuth";

export const Navbar = ({
  isLanding = false,
  onLoginClick,
  onRegisterClick
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  /* ================= SCROLL EFFECT ================= */
  useEffect(() => {
    if (!isLanding) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLanding]);

  /* ================= OUTSIDE CLICK ================= */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const solid = isLanding ? isScrolled : true;

  const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth"
  });
};

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const goDashboard = (tab) => {
    navigate(`/dashboard?tab=${tab}`);
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        solid ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="flex justify-between items-center px-20">
        {/* ================= LOGO ================= */}
        <div
          onClick={() => navigate("/")}
          className={`text-xl font-black tracking-tighter cursor-pointer ${
            solid ? "text-red-600" : "text-white"
          }`}
        >
          TiketIn
        </div>

        {/* ================= MENU ================= */}
        <div
          className={`flex items-center gap-8 font-bold text-sm ${
            solid ? "text-gray-600" : "text-white/90"
          }`}
        >
          <button onClick={() => scrollToSection("promo")} className="hover:text-red-500 cursor-pointer transition-colors">
            Promo Tiket Bus
            <span
              className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] transition-colors ${
                solid
                  ? "bg-red-100 text-red-600"
                  : "bg-red-600 text-white"
              }`}
            >
              Baru
            </span>
          </button>

          <button onClick={() => scrollToSection("cara-pesan")} className="hover:text-red-500 cursor-pointer  transition-colors">
            Cara Pesan
          </button>

          <button onClick={() => scrollToSection("kenapa-kami")} className="hover:text-red-500 cursor-pointer  transition-colors">
            Kenapa Kami?
          </button>
        </div>

        {/* ================= AUTH AREA ================= */}
        {/* ================= AUTH AREA ================= */}
<div className="flex gap-3 items-center">
  {!user ? (
    <>
      <button
        onClick={onRegisterClick}
        className={`px-6 py-2.5 cursor-pointer rounded-full font-black text-sm ${
          solid
            ? "bg-transparent text-red-600 hover:bg-red-50/80"
            : "bg-transparent text-red-50 hover:bg-white/15"
        }`}
      >
        Daftar
      </button>

      <button
        onClick={onLoginClick}
        className={`px-6 py-2.5 cursor-pointer rounded-full font-black text-sm ${
          solid
            ? "bg-red-600 text-white shadow-lg shadow-red-200 hover:bg-red-700"
            : "bg-white text-red-600 hover:bg-slate-100"
        }`}
      >
        Masuk
      </button>
    </>
  ) : (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`flex items-center gap-3 px-3 py-2 rounded-full transition-all border ${
          solid
            ? "border-gray-200 bg-white hover:bg-gray-50 shadow-sm"
            : "border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20"
        }`}
      >
        {/* Avatar Gradient seperti App */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white flex items-center justify-center text-xs font-bold shadow-inner">
          {getInitials(user.name)}
        </div>

        <div className="hidden lg:block text-left">
          <p
            className={`text-xs font-bold leading-none ${
              solid ? "text-gray-800" : "text-white"
            }`}
          >
            {user.name.split(" ")[0]}
          </p>
          <p
            className={`text-[10px] leading-none mt-1 ${
              solid ? "text-gray-500" : "text-white/70"
            }`}
          >
            Member Silver
          </p>
        </div>

        <ChevronDown
          size={16}
          className={`transition-transform ${
            isDropdownOpen ? "rotate-180" : ""
          } ${solid ? "text-gray-400" : "text-white/70"}`}
        />
      </button>

      {/* DROPDOWN STYLE MIRIP APP */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-4 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* HEADER GRADIENT */}
          <div className="p-5 bg-gradient-to-r from-red-600 to-red-700 text-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white text-red-600 flex items-center justify-center font-bold text-lg border-2 border-red-200">
                {getInitials(user.name)}
              </div>
              <div>
                <p className="font-bold text-lg">{user.name}</p>
                <p className="text-xs text-red-100 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* MENU */}
          <div className="p-2">
            <button
              onClick={() => goDashboard("profile")}
              className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition"
            >
              <User size={16} className="mr-3 text-gray-400" />
              Profil Saya
            </button>

            <button
              onClick={() => goDashboard("orders")}
              className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition"
            >
              <FileText size={16} className="mr-3 text-gray-400" />
              Pesanan
            </button>

            <button
              onClick={() => goDashboard("tickets")}
              className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition"
            >
              <Ticket size={16} className="mr-3 text-gray-400" />
              Tiket
            </button>

            <button
              onClick={() => goDashboard("settings")}
              className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition"
            >
              <Settings size={16} className="mr-3 text-gray-400" />
              Pengaturan
            </button>

            <div className="border-t border-gray-100 my-2"></div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition"
            >
              <LogOut size={16} className="mr-3" />
              Keluar
            </button>
          </div>
        </div>
      )}
    </div>
  )}
</div>

      </div>
    </nav>
  );
};
