import { useState } from "react";
import { X, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuth } from "../hook/useAuth";
import { MOCK_USERS } from "../data/user";

export const LoginModal = ({ onClose, onSwitchMode }) => {

  const { login } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    const foundUser = MOCK_USERS.find(
      (user) => user.email === email && user.password === password
    );

    if (!foundUser) {
      setError("Email atau password salah.");
      return;
    }

    // sukses login
    login(foundUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
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
              Selamat Datang Kembali!
            </h2>
            <p className="text-sm text-gray-500">
              Masuk untuk mengakses perjalananmu.
            </p>
          </div>

          {/* Social Auth (tetap) */}
          <button className="w-full flex items-center justify-center space-x-3 py-3.5 border border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 mb-6 group">
            <span className="font-bold text-sm text-gray-700 group-hover:text-gray-900">
              Masuk dengan Google
            </span>
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-400 text-xs font-medium">
                atau lanjutkan dengan email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* ERROR MESSAGE */}
            {error && (
              <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl flex items-center font-medium border border-red-100">
                <AlertCircle className="w-4 h-4 mr-2" />
                {error}
              </div>
            )}

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
                  placeholder="Masukkan password"
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

            <div className="flex justify-end">
              <a className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline transition">
                Lupa Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-red-200 hover:shadow-red-300 hover:translate-y-[-2px] transition-all duration-300 mt-2"
            >
              Masuk Sekarang
            </button>
          </form>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600">
            Belum punya akun?{" "}
            <button
              onClick={onSwitchMode}
              className="text-red-600 font-bold hover:underline cursor-pointer"
            >
              Daftar
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
