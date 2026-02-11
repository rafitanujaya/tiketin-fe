import {
  ArrowRight,
  ChevronDown,
  Info,
  Clock,
  ChevronLeft,
  User,
  Check,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const formatCurrency = (val) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(val);
};

export const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  let bookingData = location.state;

  if (!bookingData) {
    const stored = localStorage.getItem("bookingData");
    if (stored) {
      bookingData = JSON.parse(stored);
    }
  }

  const bus = bookingData?.bus;
  const selectedSeats = bookingData?.selectedSeats || [];
  const searchData = bookingData?.searchData;

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");

  const handleGoToPayment = () => {
    const paymentData = {
      bus,
      selectedSeats,
      totalCost,
    };

    localStorage.setItem("paymentData", JSON.stringify(paymentData));

    navigate(`/bus/${bus.id}/payment`, {
      state: paymentData,
    });
  };

  useEffect(() => {
    if (!bus || selectedSeats.length === 0) {
      navigate("/");
    }
  }, [bus, selectedSeats, navigate]);

  const [useInsurance, setUseInsurance] = useState(true);
  const [timeLeft, setTimeLeft] = useState(3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const insuranceCost = 5000;

  if (!bus) return null;

  const applyCoupon = () => {
    if (couponCode === "TIKETIN50") {
      setDiscount(50000);
      setCouponError("");
    } else if (couponCode === "WKENSERU") {
      const percent = totalCost * 0.2;
      setDiscount(percent > 100000 ? 100000 : percent);
      setCouponError("");
    } else {
      setDiscount(0);
      setCouponError("Kode kupon tidak valid");
    }
  };

  const subtotal =
    bus.price * selectedSeats.length +
    (useInsurance ? insuranceCost * selectedSeats.length : 0);

  const totalCost = subtotal - discount;

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="py-12"></div>

      <div className="bg-red-100 border-b max-w-7xl mx-auto rounded-lg border-red-100  z-40 py-2.5">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
          <span className="text-gray-600 font-medium hidden sm:block">
            Selesaikan pembayaran sebelum waktu habis
          </span>
          <span className="text-gray-600 font-medium sm:hidden">
            Sisa waktu
          </span>
          <span className="font-bold text-red-600 flex items-center bg-white px-3 py-1 rounded-full shadow-sm">
            <Clock className="h-4 w-4 mr-1.5" /> {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        {/* Stepper */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs mb-1">
                <Check className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold text-red-600">Pilih</span>
            </div>
            <div className="w-16 h-0.5 -mt-4 bg-red-200"></div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs mb-1">
                2
              </div>
              <span className="text-xs font-bold text-red-600">Pesan</span>
            </div>
            <div className="w-16 h-0.5 -mt-4 bg-gray-300"></div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold text-xs mb-1">
                3
              </div>
              <span className="text-xs font-medium text-gray-400">Bayar</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-500 hover:text-red-600 font-bold text-sm transition mb-4"
            >
              <ChevronLeft className="h-5 w-5 mr-1" /> Ubah Pilihan Kursi
            </button>

            {/* Login CTA */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl p-6 flex items-center gap-5 shadow-sm">
              <div className="bg-white p-3 rounded-full shadow-md text-blue-600">
                <User className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-base mb-1">
                  Masuk sebagai member Tiketin?
                </h4>
                <p className="text-sm text-gray-600">
                  Nikmati fitur isi data otomatis dan promo khusus member.
                </p>
              </div>
              <button className="text-blue-600 bg-white px-5 py-2.5 cursor-pointer rounded-xl font-bold text-sm shadow-sm hover:shadow-md transition">
                Masuk
              </button>
            </div>

            {/* Contact Details */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center">
                Data Pemesan
                <span className="ml-3 px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-bold uppercase rounded tracking-wide">
                  Wajib Diisi
                </span>
              </h3>

              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                  <div className="md:col-span-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                      Titel
                    </label>
                    <div className="relative">
                      <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition appearance-none cursor-pointer text-gray-700 text-sm font-medium">
                        <option>Tuan</option>
                        <option>Nyonya</option>
                        <option>Nona</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition text-sm font-medium placeholder-gray-300"
                      placeholder="Masukkan nama sesuai KTP/Paspor"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                      Nomor Ponsel
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-3.5 text-gray-400 text-sm font-bold border-r border-gray-200 pr-3 mr-3">
                        +62
                      </div>
                      <input
                        type="tel"
                        className="w-full bg-white border border-gray-200 rounded-xl pl-16 pr-4 py-3 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition text-sm font-medium"
                        placeholder="81234567890"
                      />
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1.5 ml-1">
                      E-tiket akan dikirim via WhatsApp
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition text-sm font-medium"
                      placeholder="contoh@email.com"
                    />
                    <p className="text-[10px] text-gray-400 mt-1.5 ml-1">
                      Bukti pembayaran akan dikirim kesini
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Passenger Details Loop */}
            {selectedSeats.map((seat, index) => (
              <div
                key={seat}
                className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100"
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-bold text-lg text-gray-800 flex items-center">
                    <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3">
                      {index + 1}
                    </span>
                    Penumpang {index + 1}
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      Kursi {seat}
                    </span>
                  </h3>

                  {index === 0 && (
                    <label className="flex items-center space-x-2 text-xs font-bold text-gray-600 cursor-pointer hover:text-red-600 transition select-none">
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          className="peer appearance-none h-4 w-4 border-2 border-gray-300 rounded checked:bg-red-600 checked:border-red-600 transition"
                        />
                        <Check className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-0.5" />
                      </div>
                      <span>Sama dengan Pemesan</span>
                    </label>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
                  <div className="md:col-span-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                      Titel
                    </label>
                    <div className="relative">
                      <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition appearance-none cursor-pointer text-gray-700 text-sm font-medium">
                        <option>Tuan</option>
                        <option>Nyonya</option>
                        <option>Nona</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition text-sm font-medium placeholder-gray-300"
                      placeholder="Nama penumpang sesuai identitas"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                  <Info className="h-4 w-4 text-yellow-600 flex-shrink-0" />
                  <p className="text-xs text-yellow-700">
                    Pastikan nama penumpang sesuai dengan kartu identitas
                    (KTP/SIM) untuk pemeriksaan saat boarding.
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 sticky top-24 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Perjalanan Anda</h3>
                <div className="text-[10px] font-bold bg-white border border-gray-200 px-2 py-1 rounded text-gray-500">
                  ID: 88239102
                </div>
              </div>

              <div className="p-6">
                {/* Bus Info */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="font-bold text-gray-900">{bus.name}</h4>
                    <p className="text-xs text-gray-500">{bus.class}</p>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs text-gray-400">
                      {new Date(searchData.date).toLocaleDateString("id-ID", {
                        weekday: "long",
                      })}
                    </span>
                    <span className="block font-bold text-sm text-gray-800">
                      {new Date(searchData.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                </div>

                {/* Route Line */}
                <div className="relative pl-4 border-l-2 border-dashed border-gray-200 space-y-6 mb-6">
                  <div className="relative">
                    <div className="absolute -left-[22.5px] top-1 w-3 h-3 rounded-full bg-white border-2 border-gray-400"></div>
                    <p className="text-sm font-bold text-gray-800">
                      {bus.departTime}
                    </p>
                    <p className="text-xs text-gray-500">{bus.departLoc}</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[22.5px] top-1 w-3 h-3 rounded-full bg-white border-2 border-red-500"></div>
                    <p className="text-sm font-bold text-red-600">
                      {bus.arriveTime}
                    </p>
                    <p className="text-xs text-gray-500">{bus.arriveLoc}</p>
                  </div>
                </div>

                <div className="border-t border-dashed border-gray-200 my-4"></div>

                {/* Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Tiket ({selectedSeats.length}x)
                    </span>
                    <span className="font-bold text-gray-900">
                      {formatCurrency(bus.price * selectedSeats.length)}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm ">
                      {" "}
                      <span>Diskon</span>{" "}
                      <span className="text-green-600">
                        - {formatCurrency(discount)}
                      </span>{" "}
                    </div>
                  )}

                  {/* Insurance Toggle */}
                  <div className="flex justify-between items-start">
                    <label className="flex items-center cursor-pointer select-none group">
                      <div className="relative flex items-center mr-2">
                        <input
                          type="checkbox"
                          checked={useInsurance}
                          onChange={() => setUseInsurance(!useInsurance)}
                          className="peer appearance-none h-4 w-4 border-2 border-gray-300 rounded checked:bg-green-500 checked:border-green-500 transition"
                        />
                        <Check className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-0.5" />
                      </div>
                      <div>
                        <span className="block text-sm text-gray-600 group-hover:text-gray-800 transition">
                          Asuransi Perjalanan
                        </span>
                        <span className="block text-[10px] text-green-600 font-medium">
                          Direkomendasikan
                        </span>
                      </div>
                    </label>
                    <span className="font-bold text-gray-900">
                      {useInsurance
                        ? formatCurrency(insuranceCost * selectedSeats.length)
                        : "Rp 0"}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Biaya Layanan</span>
                    <span className="font-bold text-green-600">Gratis</span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                    Kode Promo
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) =>
                        setCouponCode(e.target.value.toUpperCase())
                      }
                      placeholder="Masukkan kode promo"
                      className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                    />

                    <button
                      onClick={applyCoupon}
                      className="bg-gray-900 text-white px-4 rounded-xl text-sm font-bold hover:bg-black transition"
                    >
                      Pakai
                    </button>
                  </div>

                  {discount > 0 && (
                    <p className="text-green-600 text-xs font-bold mt-2">
                      Diskon berhasil diterapkan!
                    </p>
                  )}

                  {couponError && (
                    <p className="text-red-600 text-xs font-medium mt-2">
                      {couponError}
                    </p>
                  )}
                </div>

                {/* Total */}
                <div className="bg-red-50 rounded-xl p-4 flex justify-between items-center mb-6">
                  <span className="font-bold text-gray-800">Total Bayar</span>
                  <span className="font-extrabold text-xl text-red-600">
                    {formatCurrency(totalCost)}
                  </span>
                </div>

                <button
                  onClick={handleGoToPayment}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-200 hover:shadow-red-300 hover:from-red-500 hover:to-red-600 transition flex justify-center items-center group"
                >
                  Lanjut Pembayaran{" "}
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition" />
                </button>

                <div className="mt-4 text-center">
                  <p className="text-[10px] text-gray-400">
                    Dengan mengklik tombol di atas, Anda menyetujui{" "}
                    <span className="underline cursor-pointer">
                      Syarat & Ketentuan
                    </span>{" "}
                    Tiketin.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
