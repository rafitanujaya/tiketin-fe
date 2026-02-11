import {
  CheckCircle2,
  Clock,
  Copy,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const formatCurrency = (val) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(val);
};

export const PaymentPage = () => {
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds

  const location = useLocation();
  const navigate = useNavigate();

  let paymentData = location.state;

  if (!paymentData) {
    const stored = localStorage.getItem("paymentData");
    if (stored) {
      paymentData = JSON.parse(stored);
    }
  }

  const bus = paymentData?.bus;
  const totalCost = paymentData?.totalCost || 0;
  const selectedSeats = paymentData?.selectedSeats || [];
  const qrData = useMemo(() => {
    if (!bus) return "";
    return `TiketinOrder-${bus.id}-${totalCost}-FIXED-REF`;
  }, [bus, totalCost]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!bus || selectedSeats.length === 0) {
      navigate("/");
    }
  }, [bus, selectedSeats, navigate]);
  useEffect(() => {
    if (!bus || selectedSeats.length === 0) {
      navigate("/");
    }
  }, [bus, selectedSeats, navigate]);

  useEffect(() => {
    if (timeLeft === 0) {
      alert("Waktu pembayaran habis.");
      navigate("/");
    }
  }, [timeLeft, navigate]);

  if (!bus || selectedSeats.length === 0) {
    return null;
  }

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text.toString());
    // Dummy action
  };

  const handleFinish = () => {
    const successData = {
      bus,
      selectedSeats,
    };

    localStorage.setItem("successData", JSON.stringify(successData));

    localStorage.removeItem("paymentData");
    localStorage.removeItem("bookingData");

    navigate(`/bus/${bus.id}/success`, {
      state: successData,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="py-12"></div>

      <div className="max-w-md mx-auto px-4">
        {/* Status Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Menunggu Pembayaran
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Order ID: #{qrData ? qrData.slice(0, 15) : "-"}...
          </p>
        </div>

        {/* Digital Receipt Card */}
        <div className="bg-white rounded-[2rem] shadow-2xl shadow-gray-200 border border-gray-100 overflow-hidden relative">
          {/* Top Zigzag Pattern (CSS trick or SVG) */}
          <div className="h-2 bg-gradient-to-r from-red-500 via-red-600 to-red-500"></div>

          <div className="p-8 pb-12 relative">
            {/* Timer Badge */}
            <div className="flex justify-center mb-8">
              <div className="bg-red-50 text-red-700 px-5 py-2 rounded-full font-mono text-xl font-bold tracking-widest border border-red-100 flex items-center">
                <Clock className="w-4 h-4 mr-2 animate-pulse" />
                {formatTime(timeLeft)}
              </div>
            </div>

            {/* QR Code Area */}
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="bg-white p-4 rounded-3xl border-2 border-dashed border-gray-200 shadow-sm relative group cursor-pointer transition-all hover:border-red-200">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${qrData}&color=1a1a1a&bgcolor=ffffff`}
                  alt="Payment QR"
                  className="w-64 h-64 mix-blend-multiply"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <span className="text-xs font-bold text-gray-800 ">
                    Perbesar
                  </span>
                </div>
              </div>

              <div className="mt-6 flex flex-col items-center space-y-2">
                <div className="h-8 flex items-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_QRIS.svg"
                    className="h-full object-contain"
                    alt="QRIS"
                  />
                </div>
                <span className="text-xs font-mono text-gray-400 tracking-wider">
                  NMID: ID202402209988
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t-2 border-dashed border-gray-100 my-6 -mx-8 relative">
              <div className="absolute -left-3 -top-3 w-6 h-6 bg-slate-50 rounded-full"></div>
              <div className="absolute -right-3 -top-3 w-6 h-6 bg-slate-50 rounded-full"></div>
            </div>

            {/* Total */}
            <div className="text-center">
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">
                Total Tagihan
              </p>
              <div
                className="flex justify-center items-center cursor-pointer group hover:bg-gray-50 p-2 rounded-xl transition"
                onClick={() => copyToClipboard(totalCost)}
              >
                <span className="text-4xl font-extrabold text-gray-900 tracking-tight mr-3">
                  {formatCurrency(totalCost)}
                </span>
                <Copy className="w-5 h-5 text-gray-300 group-hover:text-red-600 transition" />
              </div>
            </div>
          </div>

          {/* Receipt Bottom Visual */}
          <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500 font-medium">
            <span>Merchant: Tiketin Indonesia</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-4">
          <button
            onClick={handleFinish}
            className="w-full bg-red-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-red-200 hover:bg-red-700 hover:shadow-red-300 transition-all transform hover:-translate-y-1"
          >
            Saya Sudah Bayar
          </button>
          <button className="w-full bg-white text-gray-600 font-bold py-4 rounded-2xl border border-gray-200 hover:bg-gray-50 transition">
            Unduh Tagihan
          </button>
        </div>

        <div className="mt-8 flex justify-center space-x-6 text-gray-300">
          <ShieldCheck className="w-6 h-6" />
          <CreditCard className="w-6 h-6" />
          <CheckCircle2 className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
