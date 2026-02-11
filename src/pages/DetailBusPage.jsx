import {
  Armchair,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  ChevronLeft,
  ClipboardList,
  Coffee,
  Facebook,
  Heart,
  Info,
  Instagram,
  Share2,
  ShieldCheck,
  Smartphone,
  Star,
  Ticket,
  Twitter,
  Users,
  Wallet,
  Wifi,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { ChairModal } from "../components/ChairModal";
import { DUMMY_BUSES } from "../data/bus";

export const DetailBusPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const BUS = DUMMY_BUSES.find((bus) => bus.id === parseInt(id));
  const location = useLocation();
  const dataSearch = location.state || {
    origin: "Jakarta",
    destination: "Bandung",
    date: new Date().toISOString().split("T")[0],
    passengers: 1,
  };
  const searchData = {
    ...dataSearch,
    passengers: Number(dataSearch.passengers),
  };

  const [activeTab, setActiveTab] = useState("detail");
  const isLowSeats = BUS.seatsLeft <= 5;

  // New State for Seat Modal
  const [isSeatModalOpen, setIsSeatModalOpen] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  const goToSeatSelection = () => {
    setBookedSeats(["1A", "2B", "3C", "3D", "5A", "6B", "8D"]); // Example Booked
    setSelectedSeats([]);
    setIsSeatModalOpen(true); // Open modal instead of changing view
  };

  const toggleSeat = (seatId) => {
    if (bookedSeats.includes(seatId)) return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      // Limit selection based on searchData.passengers
      if (selectedSeats.length < searchData.passengers) {
        setSelectedSeats([...selectedSeats, seatId]);
      } else {
        alert(
          `Maksimal pilih ${searchData.passengers} kursi sesuai pencarianmu!`,
        );
      }
    }
  };

  if (!BUS) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl font-bold text-red-600">
          Bus tidak ditemukan 😢
        </h1>
      </div>
    );
  }

  return (
    <div className=" bg-gray-50 min-h-screen animate-in slide-in-from-bottom-4 duration-500">
      <ChairModal
        isOpen={isSeatModalOpen}
        onClose={() => setIsSeatModalOpen(false)}
        selectedBus={BUS}
        searchData={searchData}
        selectedSeats={selectedSeats}
        toggleSeat={toggleSeat}
        bookedSeats={bookedSeats}
      />

      <nav
        className={`fixed w-full z-50 transition-all duration-300 bg-white shadow-md py-3`}
      >
        <div className="flex justify-between items-center px-20">
          <div className={`text-xl font-black tracking-tighter text-red-600`}>
            TiketIn
          </div>

          <div className={`flex items-center gap-8 font-bold text-sm `}>
            <Link className="hover:text-red-500 transition-colors">
              Promo Tiket Bus{" "}
              <span
                className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] transition-colors bg-red-600 text-white`}
              >
                Baru
              </span>
            </Link>
            <Link className="hover:text-red-500 transition-colors">
              Cara Pesan
            </Link>
            <Link className="hover:text-red-500 transition-colors">
              Kenapa Kami?
            </Link>
          </div>

          <div className="flex gap-3">
            <button
              className={`px-6 py-2.5 cursor-pointer rounded-full font-black text-smbg-red-600 bg-transparent text-red-600 hover:bg-red-50/80 `}
            >
              Daftar
            </button>

            <button
              className={`px-6 py-2.5 cursor-pointer rounded-full font-black text-smbg-red-600 text-white shadow-lg shadow-red-200 bg-red-500 hover:bg-red-700`}
            >
              Masuk
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto pt-32 px-8 max-w-5xl">
        {/* Header Navigation */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 hover:text-red-600 transition-all shadow-sm border border-gray-100"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="text-xl font-black text-gray-900">
              Detail Perjalanan
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              {"Jakarta"} <ArrowRight size={10} className="inline mx-1" />{" "}
              {"Bandung"} •{" "}
              {new Date().toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
              })}
            </p>
          </div>
          <div className="ml-auto flex gap-2">
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-600 text-gray-400 transition-all shadow-sm border border-gray-100">
              <Heart size={20} />
            </button>
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 text-gray-400 transition-all shadow-sm border border-gray-100">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 min-h-80 max-h-80">
          <div className="md:col-span-2 relative group overflow-hidden rounded-[2rem]">
            <img
              src={BUS.images[0]}
              alt="Main Bus"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
              <Ticket size={14} /> Foto Eksterior
            </div>
          </div>
          <div className="hidden md:flex flex-col gap-4">
            <div className="h-1/2 relative group overflow-hidden rounded-[2rem]">
              <img
                src={BUS.images[1]}
                alt="Interior"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="h-1/2 relative group overflow-hidden rounded-[2rem]">
              <img
                src={BUS.images[2]}
                alt="Seat"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer hover:bg-black/50 transition-colors">
                <span className="text-white font-bold text-sm">
                  +5 Foto Lainnya
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-32">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 ${BUS.logoColor} rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-gray-200`}
                  >
                    {BUS.name.charAt(0)}
                  </div>
                  <div>
                    <h1 className="text-2xl font-black text-gray-900">
                      {BUS.name}
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-bold rounded-md border border-gray-200">
                        {BUS.class}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-bold text-yellow-500">
                        <Star size={12} fill="currentColor" /> {BUS.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                {BUS.description}
              </p>
            </div>

            <div className="bg-white p-2 rounded-[1.5rem] shadow-sm border border-gray-100 flex">
              <button
                onClick={() => setActiveTab("detail")}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === "detail" ? "bg-red-600 text-white shadow-md" : "text-gray-500 hover:bg-gray-50"}`}
              >
                Detail Info
              </button>
              <button
                onClick={() => setActiveTab("syarat")}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === "syarat" ? "bg-red-600 text-white shadow-md" : "text-gray-500 hover:bg-gray-50"}`}
              >
                Syarat & Ketentuan
              </button>
            </div>

            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 min-h-[300px]">
              {activeTab === "detail" ? (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {/* Fasilitas */}
                  <div className="mb-10">
                    <h3 className="font-bold text-gray-900 mb-4 text-lg">
                      {" "}
                      Fasilitas Bus
                    </h3>
                    <div className="grid grid-cols-4 gap-4">
                      {BUS.facilities.map((fac, i) => (
                        <div
                          key={i}
                          className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-red-200 transition-colors"
                        >
                          <div className="bg-white p-2 rounded-full mb-2 shadow-sm text-gray-600">
                            {fac === "AC" ? (
                              <Zap size={18} />
                            ) : fac === "Wifi" ? (
                              <Wifi size={18} />
                            ) : fac === "Makan" ? (
                              <Coffee size={18} />
                            ) : (
                              <CheckCircle2 size={18} />
                            )}
                          </div>
                          <span className="text-xs font-bold text-gray-700">
                            {fac}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* UPDATED: Jadwal Perjalanan (Clean Vertical Timeline) */}
                  <div className="mb-10">
                    <h3 className="font-bold text-gray-900 mb-6 text-lg">
                      {" "}
                      Rute Perjalanan
                    </h3>
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                      {/* Depart Node */}
                      <div className="flex gap-6 relative">
                        <div className="flex flex-col text-right w-16 shrink-0 pt-1">
                          <span className="font-black text-gray-900 text-lg leading-none">
                            {BUS.departTime}
                          </span>
                          <span className="text-xs text-gray-400 font-medium mt-1">
                            {new Date().toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                        </div>

                        <div className="relative flex flex-col items-center">
                          <div className="w-4 h-4 rounded-full border-4 border-gray-300 bg-white z-10"></div>
                          <div className="w-0.5 bg-gray-200 absolute top-4 bottom-0 h-full"></div>
                        </div>

                        <div className="pb-8 pt-0.5">
                          <h4 className="font-bold text-gray-900 text-lg leading-none mb-2">
                            {BUS.departLoc}
                          </h4>
                          <p className="text-sm text-gray-500 leading-relaxed max-w-md">
                            {BUS.departAddr}
                          </p>
                        </div>
                      </div>

                      {/* Duration Indicator */}
                      <div className="flex gap-6 relative -my-2">
                        <div className="w-16 shrink-0"></div>
                        <div className="relative flex flex-col items-center justify-center">
                          <div className="w-0.5 bg-gray-200 h-8"></div>
                        </div>
                        <div className="py-2">
                          <span className="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                            {BUS.duration}
                          </span>
                        </div>
                      </div>

                      {/* Arrive Node */}
                      <div className="flex gap-6 relative mt-1">
                        <div className="flex flex-col text-right w-16 shrink-0 pt-1">
                          <span className="font-black text-gray-900 text-lg leading-none">
                            {BUS.arriveTime}
                          </span>
                          <span className="text-xs text-gray-400 font-medium mt-1">
                            {new Date().toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                        </div>

                        <div className="relative flex flex-col items-center">
                          <div className="w-0.5 bg-gray-200 absolute top-0 h-4"></div>
                          <div className="w-4 h-4 rounded-full bg-gray-800 border-4 border-gray-300 z-10 mt-4"></div>
                        </div>

                        <div className="pt-4">
                          <h4 className="font-bold text-gray-900 text-lg leading-none mb-2">
                            {BUS.arriveLoc}
                          </h4>
                          <p className="text-sm text-gray-500 leading-relaxed max-w-md">
                            {BUS.arriveAddr}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Armada */}
                  <div className="mb-10">
                    <h3 className="font-bold text-gray-900 mb-4 text-lg">
                      Informasi Armada
                    </h3>
                    <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100">
                          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                            <Armchair size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">
                              Format
                            </p>
                            <p className="text-sm font-black text-gray-800">
                              {BUS.seatFormat}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100">
                          <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                            <Briefcase size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">
                              Bagasi
                            </p>
                            <p className="text-sm font-black text-gray-800">
                              Max {BUS.baggage}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100">
                          <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                            <Smartphone size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">
                              Tiket
                            </p>
                            <p className="text-sm font-black text-gray-800">
                              E-Ticket
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 relative overflow-hidden">
                          {isLowSeats && (
                            <div className="absolute top-0 right-0 bg-red-600 text-[9px] text-white px-2 py-0.5 rounded-bl-lg font-bold">
                              CEPAT!
                            </div>
                          )}
                          <div
                            className={`w-10 h-10 rounded-full ${isLowSeats ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"} flex items-center justify-center`}
                          >
                            <Users size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">
                              Sisa Kursi
                            </p>
                            <div className="flex items-center gap-1">
                              <span
                                className={`text-sm font-black ${isLowSeats ? "text-red-600" : "text-gray-800"}`}
                              >
                                {BUS.seatsLeft}
                              </span>
                              <span className="text-xs text-gray-400 font-medium">
                                / {BUS.totalSeats}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* UPDATED: "Kamu Harus Tau, nih!" (Card Style List) */}
                  <div className="mt-8">
                    <h3 className="font-black text-gray-900 mb-6 text-lg">
                      Kamu Harus Tau, nih!
                    </h3>
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
                      {/* Item 1 */}
                      <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-blue-600">
                          <ClipboardList size={20} strokeWidth={2} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            <strong className="text-gray-900">E-tiket</strong>{" "}
                            akan tersedia di halaman{" "}
                            <span className="font-bold text-blue-600">
                              Your Orders
                            </span>{" "}
                            dan dikirim ke emailmu setelah pembayaran selesai.
                          </p>
                        </div>
                      </div>
                      {/* Item 2 */}
                      <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center shrink-0 text-yellow-600">
                          <Ticket size={20} strokeWidth={2} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            Sebelum naik, tunjukkan e-tiket ke petugas
                            bus/travel untuk ditukar dengan{" "}
                            <strong className="text-gray-900">
                              tiket fisik
                            </strong>
                            .
                          </p>
                        </div>
                      </div>
                      {/* Item 3 */}
                      <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center shrink-0 text-cyan-600">
                          <Wallet size={20} strokeWidth={2} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            Siapkan{" "}
                            <strong className="text-gray-900">
                              kartu identitas yang berlaku
                            </strong>
                            . Petugas bus/travel mungkin memerlukannya untuk
                            memverifikasi penumpang.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6">
                  <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex gap-3 items-start">
                    <Info size={20} className="text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-blue-900 text-sm mb-1">
                        Kebijakan Tiket
                      </h4>
                      <p className="text-blue-700 text-xs leading-relaxed">
                        Harap tunjukkan e-tiket 30 menit sebelum keberangkatan.
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <ShieldCheck size={18} className="text-green-600" />{" "}
                      Refund & Reschedule
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <CheckCircle2
                          size={16}
                          className="text-green-500 shrink-0 mt-0.5"
                        />
                        <span>
                          Bisa refund hingga 4 jam sebelum keberangkatan
                          (Potongan 25%).
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Sticky CTA */}
          <div className="">
            <div className="bg-white p-6 rounded-[2rem] shadow-lg border border-red-100 sticky top-24">
              <h3 className="font-black text-gray-900 text-lg mb-6">
                Ringkasan Harga
              </h3>
              <div className="flex justify-between items-center mb-4 text-sm">
                <span className="text-gray-500">
                  Harga Tiket (x{searchData.passengers})
                </span>
                <span className="font-bold text-gray-900">
                  Rp{" "}
                  {(BUS.price * searchData.passengers).toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between items-center mb-4 text-sm">
                <span className="text-gray-500">Biaya Layanan</span>
                <span className="font-bold text-green-600">Gratis</span>
              </div>
              <div className="border-t border-dashed border-gray-200 my-4"></div>
              <div className="flex justify-between items-center mb-8">
                <span className="font-bold text-gray-500">Total Bayar</span>
                <span className="font-black text-2xl text-red-600">
                  Rp {(BUS.price * 1).toLocaleString("id-ID")}
                </span>
              </div>
              <button
                onClick={goToSeatSelection}
                className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-red-200 hover:shadow-red-500/30 transition-all flex justify-center items-center gap-2 transform active:scale-[0.98]"
              >
                Lanjut Pilih Kursi <Armchair size={22} />
              </button>
              <p className="text-center text-xs text-gray-400 mt-4 font-medium">
                Dijamin aman & terpercaya
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white mt-20 pt-20 pb-12 rounded-t-[3rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] border-t border-gray-100/50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            {/* Brand Column */}
            <div className="md:w-1/3">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl font-black text-gray-900 tracking-tighter">
                  Tiketin
                </span>
              </div>
              <p className="text-gray-500 font-medium leading-relaxed mb-8 max-w-sm">
                Partner perjalanan terbaikmu. Pesan tiket bus lebih cepat, aman,
                dan bebas ribet khusus buat generasi masa kini.
              </p>
              <div className="flex gap-3">
                {/* Social Buttons */}
                <button className="w-10 h-10 rounded-full bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition-all border border-transparent hover:border-red-100">
                  <Instagram size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition-all border border-transparent hover:border-red-100">
                  <Twitter size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition-all border border-transparent hover:border-red-100">
                  <Facebook size={18} />
                </button>
              </div>
            </div>

            {/* Links Columns */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full md:w-2/3">
              <div>
                <h4 className="font-bold text-gray-900 mb-6 text-lg">
                  Perusahaan
                </h4>
                <ul className="space-y-4 text-gray-500 font-medium text-sm">
                  <li>
                    <a
                      href="#"
                      className="hover:text-red-600 transition-colors inline-block hover:translate-x-1 duration-200"
                    >
                      Tentang Kami
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-red-600 transition-colors inline-block hover:translate-x-1 duration-200"
                    >
                      Karir
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-red-600 transition-colors inline-block hover:translate-x-1 duration-200"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-red-600 transition-colors inline-block hover:translate-x-1 duration-200"
                    >
                      Partner PO
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-6 text-lg">
                  Dukungan
                </h4>
                <ul className="space-y-4 text-gray-500 font-medium text-sm">
                  <li>
                    <a
                      href="#"
                      className="hover:text-red-600 transition-colors inline-block hover:translate-x-1 duration-200"
                    >
                      Pusat Bantuan
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-red-600 transition-colors inline-block hover:translate-x-1 duration-200"
                    >
                      Cara Pesan
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-red-600 transition-colors inline-block hover:translate-x-1 duration-200"
                    >
                      Tiket Saya
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-red-600 transition-colors inline-block hover:translate-x-1 duration-200"
                    >
                      Refund
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-6 text-lg">
                  Hubungi Kami
                </h4>
                <ul className="space-y-4 text-gray-500 font-medium text-sm">
                  <li>
                    <a
                      href="#"
                      className="hover:text-red-600 transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 group-hover:scale-125 transition-transform"></span>{" "}
                      WhatsApp
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-red-600 transition-colors"
                    >
                      Email Support
                    </a>
                  </li>
                  <li className="pt-2">
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <p className="text-xs text-gray-400 font-bold uppercase mb-1">
                        Jam Operasional
                      </p>
                      <p className="text-gray-800 font-bold">
                        08.00 - 22.00 WIB
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400 font-medium">
            <p>
              &copy; 2026 Tiketin. Powered by{" "}
              <strong className="text-gray-900">
                Rafi Asshiddiqie Tanujaya
              </strong>
              .
            </p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-red-600 transition-colors">
                Privasi
              </a>
              <a href="#" className="hover:text-red-600 transition-colors">
                Syarat & Ketentuan
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
