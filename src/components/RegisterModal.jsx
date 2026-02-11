import { useState } from "react";
import { X, User, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { MOCK_USERS } from "../data/user";


export const RegisterModal = ({ onClose, onSwitchMode }) => {
  const [showPassword, setShowPassword] = useState(false);

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!fullname || !email || !password) {
      setError("Semua field wajib diisi.");
      return;
    }

    if (password.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: fullname,
      email,
      password,
      phone: ""
    };

    MOCK_USERS.push(newUser);

    onSwitchMode();

  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="bg-white w-full max-w-[420px] rounded-[2.5rem] shadow-2xl z-10 overflow-hidden relative animate-in fade-in zoom-in duration-300">
        
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-red-600 to-red-700 opacity-10 rounded-b-[50%] -translate-y-16"></div>

        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 bg-gray-50 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 pt-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Buat Akun Baru
            </h2>
            <p className="text-sm text-gray-500">
              Daftar untuk menikmati berbagai promo.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* ERROR MESSAGE */}
            {error && (
              <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl flex items-center font-medium border border-red-100">
                <AlertCircle className="w-4 h-4 mr-2" />
                {error}
              </div>
            )}

            {/* Nama Lengkap */}
            <div className="group">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 ml-1">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                <input
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  placeholder="Nama Lengkap Kamu"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all font-medium text-sm text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Email */}
            <div className="group">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 ml-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contoh@email.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all font-medium text-sm text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 ml-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 8 karakter"
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all font-medium text-sm text-gray-900 placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-red-200 hover:shadow-red-300 hover:translate-y-[-2px] transition-all duration-300 mt-2">
              Daftar Sekarang
            </button>
          </form>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600">
            Sudah punya akun?{" "}
            <button
              onClick={onSwitchMode}
              className="text-red-600 font-bold hover:underline cursor-pointer"
            >
              Masuk
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

