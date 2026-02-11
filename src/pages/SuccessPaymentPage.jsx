import {
  ArrowRight,
  Bus,
  CheckCircle2,
  Download,
  Home,
  MapPin,
} from "lucide-react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export const SuccessPaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  let successData = location.state;

  if (!successData) {
    const stored = localStorage.getItem("successData");
    if (stored) {
      successData = JSON.parse(stored);
    }
  }

  const bus = successData?.bus;
  const selectedSeats = successData?.selectedSeats || [];

  useEffect(() => {
    if (!bus || selectedSeats.length === 0) {
      navigate("/");
    }
  }, [bus, selectedSeats, navigate]);

  const handleHome = () => {
    localStorage.removeItem("bookingData");
    localStorage.removeItem("paymentData");
    localStorage.removeItem("successData");
    navigate("/");
  };
  return (
    <div className="min-h-screen bg-slate-50 ">
      <div className="py-15"></div>

      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200/50">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Pembayaran Berhasil!
          </h1>
          <p className="text-gray-500">Tiket elektronik Anda telah terbit.</p>
        </div>

        {/* E-Ticket Card List */}
        <div className="space-y-6 mb-10">
          {selectedSeats.map((seat, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-xl shadow-gray-200 overflow-hidden border border-gray-100 flex flex-col md:flex-row relative"
            >
              {/* Left Cutout Pattern */}
              <div className="hidden md:block absolute top-0 bottom-0 left-[70%] w-0 border-l-2 border-dashed border-gray-200 z-10"></div>
              <div className="hidden md:block absolute -top-3 left-[70%] -translate-x-1/2 w-6 h-6 bg-slate-50 rounded-full z-10 border-b border-gray-100"></div>
              <div className="hidden md:block absolute -bottom-3 left-[70%] -translate-x-1/2 w-6 h-6 bg-slate-50 rounded-full z-10 border-t border-gray-100"></div>

              {/* Ticket Details (Left) */}
              <div className="flex-1 p-8 relative">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {bus.name}
                    </h3>
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">
                      {bus.class}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">
                      Kursi
                    </span>
                    <span className="block text-2xl font-bold text-gray-900">
                      {seat}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-8 mb-6">
                  <div>
                    <span className="text-xs text-gray-400 block mb-1">
                      Berangkat
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      {bus.departureTime}
                    </span>
                    <span className="text-xs text-gray-500 block">20 Feb</span>
                  </div>
                  <div className="flex-1 flex items-center space-x-2">
                    <div className="h-0.5 w-full bg-gray-200 relative">
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-400"></div>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-red-500"></div>
                    </div>
                    <Bus className="text-gray-300 w-4 h-4" />
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400 block mb-1">
                      Tiba
                    </span>
                    <span className="text-lg font-bold text-red-600">
                      {bus.arrivalTime}
                    </span>
                    <span className="text-xs text-gray-500 block">21 Feb</span>
                  </div>
                </div>

                <div className="flex items-center text-xs text-gray-500 space-x-4">
                  <span className="flex items-center">
                    <MapPin className="w-3 h-3 mr-1" /> Jakarta
                  </span>
                  <ArrowRight className="w-3 h-3 text-gray-300" />
                  <span className="flex items-center">
                    <MapPin className="w-3 h-3 mr-1" /> Yogyakarta
                  </span>
                </div>
              </div>

              {/* QR Code (Right/Bottom) */}
              <div className="md:w-[30%] bg-gray-50 p-8 flex flex-col justify-center items-center border-t md:border-t-0 md:border-l border-dashed border-gray-200">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TIKETIN-${bus.id}-${seat}-${index}&color=000000&bgcolor=f9fafb`}
                  alt="Ticket QR"
                  className="w-32 h-32 mb-4 mix-blend-multiply"
                />
                <span className="text-[10px] font-mono text-gray-400 tracking-widest text-center block">
                  TIKET ID
                  <br />
                  <span className="text-gray-900 font-bold text-xs">
                    TKT-{bus.id}X{seat}
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="flex items-center justify-center bg-gray-900 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:bg-black transition w-full md:w-auto">
            <Download className="w-5 h-5 mr-2" /> Download E-Tiket (PDF)
          </button>
          <button
            onClick={handleHome}
            className="flex items-center justify-center bg-white text-gray-700 font-bold py-4 px-8 rounded-2xl border border-gray-200 hover:bg-gray-50 transition w-full md:w-auto"
          >
            <Home className="w-5 h-5 mr-2" /> Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
};
