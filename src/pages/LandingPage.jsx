import { Link } from "react-router";
import background from "../assets/bus.png";
import {
  ArrowRight,
  Bus,
  Calendar,
  CheckCircle2,
  CreditCard,
  MousePointerClick,
  ShieldCheck,
  Star,
  Ticket,
  UserCheck,
  Users,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

export const LandingPage = () => {
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  const [from, setFrom] = useState("Jakarta");
  const [to, setTo] = useState("Bandung");
  const [date, setDate] = useState(today);
  const [passengers, setPassengers] = useState("1");

  return (
    <div>
      {/* Section : Hero & Cari tiket */}
      <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={background} alt="" />
        </div>

        <div className="relative z-10 flex justify-between items-center max-w-7xl w-full mx-auto">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-red-100">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              Official Partner 500+ PO Bus
            </div>

            <h1 className="text-7xl font-bold leading-tight drop-shadow-lg text-white">
              Pesan Tiket Bus <br />
              Gak Pake Ribet.
            </h1>

            <p className="text-lg text-red-50 max-w-xl font-medium leading-relaxed">
              Platform tiket bus #1 buat Gen Z. Pilih kursi, bayar sat-set,
              langsung berangkat. Tanpa antre, tanpa drama.
            </p>

            <div className="flex flex-wrap gap-4 pt-4 text-white">
              <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
                <CheckCircle2 size={18} className="text-green-400" />
                <span className="font-bold text-sm">Jaminan Kursi</span>
              </div>

              <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
                <CheckCircle2 size={18} className="text-green-400" />
                <span className="font-bold text-sm">Bisa Refund</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-100 w-full max-w-lg backdrop-blur-sm rounded-4xl shadow-2xl shadow-black/20 p-8 border-white/50">
            <div className="flex justify-between">
              <h2 className="text-2xl font-semibold tracking-widest">
                Cari Tiket
              </h2>

              <div className="bg-green-100 text-green-700 text-xs font-black px-3 py-1 rounded-full flex items-center">
                Online 24 Jam
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();

                navigate(
                  `/search?from=${from}&to=${to}&date=${date}&passengers=${passengers}`,
                );
              }}
              className="space-y-4 mt-4"
            >
              <div className="relative">
                <label
                  htmlFor=""
                  className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-1 block"
                >
                  DARI MANA
                </label>
                <div className="flex items-center bg-white border-transparent focus-within:border-red-500 focus-within:bg-white transition-all rounded-xl p-3.5 ">
                  <Bus className="text-gray-400 mr-3 shrink-0" size={20} />
                  <input
                    type="text"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="Pilih Lokasi Keberangkatan"
                    className="w-full bg-transparent text-gray-800 outline-none placeholder-gray-400 text-base"
                  />
                </div>
              </div>

              <div className="relative">
                <label
                  htmlFor=""
                  className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-1 block"
                >
                  MAU KEMANA
                </label>
                <div className="flex items-center bg-white border-transparent focus-within:border-red-500 focus-within:bg-white transition-all rounded-xl p-3.5 ">
                  <Bus className="text-gray-400 mr-3 shrink-0" size={20} />
                  <input
                    type="text"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="Pilih Lokasi Yang Dituju"
                    className="w-full bg-transparent text-gray-800 outline-none placeholder-gray-400 text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">
                    Tanggal
                  </label>
                  <div className="flex items-center bg-gray-50 border-2 border-transparent focus-within:border-red-500 focus-within:bg-white transition-all rounded-2xl p-3.5">
                    <Calendar
                      className="text-gray-400 mr-2 shrink-0"
                      size={18}
                    />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-transparent text-gray-800 outline-none placeholder-gray-400 text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-500 font-semibold uppercase mb-1 block">
                    Kursi
                  </label>
                  <div className="flex items-center bg-gray-50 border-2 border-transparent focus-within:border-red-500 focus-within:bg-white transition-all rounded-2xl p-3.5">
                    <Users className="text-gray-400 mr-2 shrink-0" size={18} />
                    <select
                      value={passengers}
                      onChange={(e) => setPassengers(e.target.value)}
                      className="w-full bg-transparent text-gray-800 outline-none text-sm appearance-none"
                    >
                      <option value="1">1 Orang</option>
                      <option value="2">2 Orang</option>
                      <option value="3">3 Orang</option>
                      <option value="4">4 Orang</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold text-lg rounded-2xl shadow-xl shadow-red-200 hover:shadow-red-500/30 transition-all flex justify-center items-center gap-2 transform active:scale-[0.98]"
              >
                CARI TIKET <ArrowRight size={22} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Section : Promo Tiket */}
      <section id="promo" className="py-16 scroll-mt-28 w-full max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8 gap-4">
          <div>
            <span className="text-red-600 font-bold tracking-wider text-sm uppercase bg-red-50 px-4 py-1 rounded-full">
              Penawaran Spesial
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-3 leading-tight">
              Promo TiketIn <span className="text-red-600">Gaspol</span>{" "}
            </h2>
            <p className="text-gray-500 mt-2">
              Diskon melimpah buat kamu yang hobi jalan-jalan hemat.
            </p>
          </div>
          <Link
            href="#"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 font-bold hover:bg-gray-50 transition-colors group text-sm"
          >
            Lihat Semua Promo <ArrowRight size={16} className="" />
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-linear-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white relative overflow-hidden group cursor-pointer hover:shadow-xl hover:shadow-indigo-200 transition-all duration-300 hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold mb-4 inline-block">
              DISKON 50RB
            </span>
            <h3 className="text-2xl font-black mb-2">Pengguna Baru</h3>
            <p className="text-indigo-100 mb-6 text-sm">
              Valid buat booking pertama ke semua rute.
            </p>
            <div className="flex justify-between items-center">
              <span className="font-mono bg-black/20 px-3 py-1 rounded-lg text-sm border border-white/10 tracking-widest">
                TIKETIN50
              </span>
              <div className="w-10 h-10 bg-white text-indigo-600 rounded-full flex items-center justify-center font-bold">
                <ArrowRight size={18} />
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-red-500 to-orange-500 rounded-3xl p-6 text-white relative overflow-hidden group cursor-pointer hover:shadow-xl hover:shadow-red-200 transition-all duration-300 hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold mb-4 inline-block">
              CASHBACK 20%
            </span>
            <h3 className="text-2xl font-black mb-2">Weekend Seru</h3>
            <p className="text-red-100 mb-6 text-sm">
              Khusus keberangkatan hari Jumat & Sabtu.
            </p>
            <div className="flex justify-between items-center">
              <span className="font-mono bg-black/20 px-3 py-1 rounded-lg text-sm border border-white/10 tracking-widest">
                WKENSERU
              </span>
              <div className="w-10 h-10 bg-white text-red-600 rounded-full flex items-center justify-center font-bold">
                <ArrowRight size={18} />
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 relative overflow-hidden group cursor-pointer hover:border-red-200 hover:shadow-xl hover:shadow-gray-100 transition-all duration-300 hover:-translate-y-1">
            <div className="absolute top-4 right-4 bg-red-50 text-red-600 p-2 rounded-full">
              <Zap size={20} fill="currentColor" />
            </div>
            <div className="h-full flex flex-col justify-end">
              <h3 className="text-2xl font-black text-gray-800 mb-2">
                Partner Resmi
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Kami bekerja sama dengan 500+ PO Bus terpercaya di Indonesia.
              </p>
              <button className="text-red-600 font-bold text-left hover:underline flex items-center gap-1">
                Pelajari lebih lanjut <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section : How It Works */}
      <section id="cara-pesan" className="py-16 scroll-mt-28w-full max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-red-600 font-bold tracking-wider text-sm uppercase bg-red-50 px-3 py-1 rounded-full">
            Cara Pesan
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-3 mb-4">
            Gak Pake Drama, <br />
            Cuma{" "}
            <span className="text-red-600 underline">3 Langkah Sat-Set!</span>
          </h2>
          <p className="text-gray-500">
            Mesen tiket bus jaman now tuh harusnya gampang. Gak perlu antre di
            terminal, gak perlu calo.
          </p>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-[40%] left-10 right-10 h-1 bg-gray-100 -translate-y-1/2 z-0 border-t-2 border-dashed border-gray-200"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <div className="bg-white p-8 rounded-4xl border-2 border-gray-100 text-center hover:border-red-200 transition-all duration-300 group hover:-translate-y-2 hover:shadow-xl hover:shadow-red-50">
              <div className="w-24 h-24 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-red-100 border-4 border-white">
                <MousePointerClick size={36} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">
                1. Cari & Pilih Bus
              </h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed">
                Masukin kota asal, tujuan, dan tanggal. Filter bus sesuai budget
                dan fasilitas (AC/Sleeper).
              </p>
            </div>

            <div className="bg-white p-8 rounded-4xl border-2 border-gray-100 text-center hover:border-red-200 transition-all duration-300 group hover:-translate-y-2 hover:shadow-xl hover:shadow-red-50">
              <div className="w-24 h-24 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-red-100 border-4 border-white">
                <UserCheck size={36} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">
                2. Isi Data Pemesan
              </h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed">
                Gak wajib daftar akun! Cukup isi nama & nomor WA buat kirim
                tiket (Guest Mode).
              </p>
            </div>

            <div className="bg-white p-8 rounded-4xl border-2 border-gray-100 text-center hover:border-red-200 transition-all duration-300 group hover:-translate-y-2 hover:shadow-xl hover:shadow-red-50">
              <div className="w-24 h-24 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-red-100 border-4 border-white">
                <CreditCard size={36} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">
                3. Bayar & Berangkat
              </h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed">
                Bayar via QRIS/Transfer. Tiket elektronik langsung mendarat di
                WhatsApp kamu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Why Us */}
      <section id="kenapa-kami" className="py-16 scroll-mt-28 w-full max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div>
            <span className="text-red-600 font-bold tracking-wider text-sm uppercase bg-white px-3 py-1 rounded-full border border-red-100">
              Kenapa Kami?
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-4 mb-6 leading-tight">
              Lebih Dari Sekadar <br /> Aplikasi Tiket.
            </h2>
            <p className="text-gray-500 mb-8 font-medium">
              Kami ngerti banget kalo traveling itu harusnya fun, bukan bikin
              pusing. Tiketin didesain khusus buat kamu yang anti ribet.
            </p>
            <button className="bg-gray-900 cursor-pointer text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-colors flex items-center gap-2">
              Coba Sekarang <ArrowRight size={18} />
            </button>
          </div>

          {/* Right Cards Grid */}
          <div className="grid grid-cols-2 gap-6 w-full">
            <div className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition-all border border-transparent hover:border-red-100">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-4">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Pembayaran Aman
              </h3>
              <p className="text-gray-500 text-sm">
                Transaksi terenkripsi & uang kembali 100% jika booking gagal
                dari sistem.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition-all border border-transparent hover:border-red-100">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                <Star size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Guest Checkout
              </h3>
              <p className="text-gray-500 text-sm">
                Fitur andalan Gen Z! Pesan tiket tanpa perlu repot bikin akun &
                password.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition-all border border-transparent hover:border-red-100">
              <div className="w-14 h-14 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center mb-4">
                <Ticket size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Reschedule Gampang
              </h3>
              <p className="text-gray-500 text-sm">
                Berubah rencana? Ganti jadwal keberangkatan cuma dengan beberapa
                klik.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-linear-to-br from-red-600 to-rose-600 p-6 rounded-3xl shadow-lg shadow-red-200 text-white flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl font-black mb-1">500+</h3>
              <p className="text-red-100 text-sm font-medium mb-4">
                Operator Bus Resmi
              </p>
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-white/20 border-2 border-white backdrop-blur-sm"
                  ></div>
                ))}
                <div className="w-8 h-8 rounded-full bg-white text-red-600 flex items-center justify-center font-bold text-xs border-2 border-white">
                  +
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
