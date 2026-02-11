import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useSearchParams } from "react-router";

import {
  User,
  FileText,
  Ticket,
  Settings,
  LogOut,
  Camera,
  Lock,
  Bell,
  Calendar,
  Bus,
  Mail,
} from "lucide-react";

/* ================= MOCK DATA ================= */

const MOCK_HISTORY = [
  {
    id: "TRX-8821",
    date: "12 Feb 2024",
    route: "Jakarta - Yogyakarta",
    bus: "Sinar Jaya",
    status: "Selesai",
    price: 210000,
  },
  {
    id: "TRX-9920",
    date: "10 Jan 2024",
    route: "Bandung - Surabaya",
    bus: "Rosalia Indah",
    status: "Dibatalkan",
    price: 350000,
  },
];

const MOCK_TICKETS = [
  {
    id: "TKT-2024-ACTIVE",
    date: "20 Feb 2024",
    time: "16:30",
    route: "Jakarta - Yogyakarta",
    bus: "Sinar Jaya Group",
    seat: "3A",
    status: "Aktif",
  },
];

/* ================= DASHBOARD ================= */

export const DashboardPage = () => {
  const { user, logout } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const initialTab = searchParams.get("tab") || "profile";
  const [activeTab, setActiveTab] = useState(initialTab);

  const tabs = [
    { id: "profile", label: "Profile Saya", icon: User },
    { id: "orders", label: "Pesanan Saya", icon: FileText },
    { id: "tickets", label: "Tiket", icon: Ticket },
    { id: "settings", label: "Pengaturan", icon: Settings },
  ];

  useEffect(() => {
    setSearchParams({ tab: activeTab });
  }, [activeTab]);

  if (!user) return <Navigate to="/" replace />;

  const onTabChange = (tab) => {
    setActiveTab(tab);
  };

  const onLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-28">
            <div className="p-6 bg-gradient-to-r from-red-600 to-red-700 text-white">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-white text-red-600 flex items-center justify-center font-bold text-xl border-2 border-red-200">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-lg">{user.name}</p>
                  <p className="text-xs text-red-100">Member Silver</p>
                </div>
              </div>
            </div>
            <div className="p-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`w-full flex items-center px-4 py-3.5 mb-1 rounded-xl transition-all duration-200 font-medium text-sm
                    ${
                      activeTab === tab.id
                        ? "bg-red-50 text-red-600 border-r-4 border-red-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  <tab.icon
                    className={`w-5 h-5 mr-3 ${activeTab === tab.id ? "text-red-600" : "text-gray-400"}`}
                  />
                  {tab.label}
                </button>
              ))}
              <div className="my-2 border-t border-gray-100"></div>
              <button
                onClick={onLogout}
                className="w-full flex items-center px-4 py-3.5 rounded-xl transition-all duration-200 font-medium text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Keluar
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 min-h-[500px] p-8">
            {activeTab === "profile" && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Profile Saya
                </h2>
                <div className="space-y-6 max-w-2xl">
                  <div className="flex items-center space-x-6 mb-8">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 text-2xl font-bold border-4 border-white shadow-md">
                        {user.name.slice(0, 1)}
                      </div>
                      <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition">
                        <Camera className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Foto Profil</p>
                      <p className="text-xs text-gray-400">
                        Besar file: maks. 10MB. Format: .JPG, .JPEG, .PNG
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">
                        Nama Lengkap
                      </label>
                      <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-100 transition">
                        <User className="w-5 h-5 text-gray-400 mr-3" />
                        <input
                          type="text"
                          defaultValue={user.name}
                          className="flex-1 outline-none text-gray-800 text-sm font-medium"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">
                        Email
                      </label>
                      <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50">
                        <Mail className="w-5 h-5 text-gray-400 mr-3" />
                        <input
                          type="text"
                          defaultValue={user.email}
                          disabled
                          className="flex-1 outline-none text-gray-500 bg-transparent text-sm font-medium cursor-not-allowed"
                        />
                        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">
                          Verified
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">
                        Nomor Ponsel
                      </label>
                      <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 focus-within:border-red-500 transition">
                        <span className="text-gray-500 text-sm font-bold mr-3">
                          +62
                        </span>
                        <input
                          type="text"
                          defaultValue={user.phone || "81234567890"}
                          className="flex-1 outline-none text-gray-800 text-sm font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button className="bg-red-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-red-700 transition shadow-lg shadow-red-200">
                      Simpan Perubahan
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Riwayat Pesanan
                </h2>
                <div className="space-y-4">
                  {MOCK_HISTORY.map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-red-100 transition-all cursor-pointer group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-red-50 p-2 rounded-lg text-red-600">
                            <Bus className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">
                              {item.bus}
                            </h4>
                            <p className="text-xs text-gray-500">
                              ID: {item.id}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            item.status === "Selesai"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-gray-800 mb-1">
                            {item.route}
                          </p>
                          <p className="text-xs text-gray-500">{item.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-500">
                            Total
                          </p>
                          <p className="text-lg font-bold text-red-600">
                            Rp {item.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "tickets" && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Tiket Saya
                </h2>
                {MOCK_TICKETS.length > 0 ? (
                  <div className="space-y-4">
                    {MOCK_TICKETS.map((t) => (
                      <div
                        key={t.id}
                        className="relative bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
                      >
                        <div className="absolute top-0 left-0 w-2 h-full bg-green-500"></div>
                        <div className="p-6 pl-8">
                          <div className="flex justify-between items-start mb-6">
                            <div>
                              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full mb-2">
                                Tiket Aktif
                              </span>
                              <h3 className="font-bold text-xl text-gray-900">
                                {t.bus}
                              </h3>
                              <p className="text-sm text-gray-500">{t.id}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                                Kursi
                              </p>
                              <p className="text-2xl font-extrabold text-red-600">
                                {t.seat}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 mb-6 bg-gray-50 p-4 rounded-xl">
                            <div className="text-center px-4 border-r border-gray-200">
                              <p className="text-lg font-bold text-gray-900">
                                {t.time}
                              </p>
                              <p className="text-xs text-gray-500">Berangkat</p>
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-gray-800">
                                {t.route}
                              </p>
                              <p className="text-xs text-gray-500 flex items-center mt-1">
                                <Calendar className="w-3 h-3 mr-1" /> {t.date}
                              </p>
                            </div>
                          </div>

                          <div className="flex justify-end space-x-3">
                            <button className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition">
                              Reschedule
                            </button>
                            <button className="px-6 py-2 bg-red-600 rounded-xl text-sm font-bold text-white hover:bg-red-700 transition shadow-lg shadow-red-100">
                              Lihat E-Tiket
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-gray-50 rounded-3xl">
                    <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">
                      Belum ada tiket aktif saat ini.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "settings" && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Pengaturan Akun
                </h2>

                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-2xl p-6">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                      <Lock className="w-5 h-5 mr-2 text-red-600" /> Keamanan
                    </h3>
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div>
                        <p className="font-medium text-gray-800 text-sm">
                          Ubah Password
                        </p>
                        <p className="text-xs text-gray-500">
                          Terakhir diubah 3 bulan lalu
                        </p>
                      </div>
                      <button className="text-red-600 font-bold text-sm hover:underline">
                        Ubah
                      </button>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-medium text-gray-800 text-sm">
                          Verifikasi 2 Langkah
                        </p>
                        <p className="text-xs text-gray-500">
                          Amankan akun dengan PIN
                        </p>
                      </div>
                      <div className="w-10 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 shadow-sm"></div>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-2xl p-6">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                      <Bell className="w-5 h-5 mr-2 text-red-600" /> Notifikasi
                    </h3>
                    {[
                      "Promo & Diskon",
                      "Status Pesanan",
                      "Rekomendasi Perjalanan",
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                      >
                        <p className="font-medium text-gray-800 text-sm">
                          {item}
                        </p>
                        <div className="w-10 h-6 bg-red-600 rounded-full relative cursor-pointer">
                          <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow-sm"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
