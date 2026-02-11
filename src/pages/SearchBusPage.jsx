import {
  ArrowRight,
  BatteryCharging,
  Calendar,
  CheckCircle2,
  Coffee,
  Filter,
  Star,
  Users,
  Wifi,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { ReviewModal } from "../components/ReviewModal";
import { useNavigate, useSearchParams } from "react-router";
import { DUMMY_REVIEWS } from "../data/review";
import { DUMMY_BUSES } from "../data/bus";

export const SearchBusPage = () => {
  const navigate = useNavigate();

  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedBusReviews, setSelectedBusReviews] = useState(null);
  const [reviews, setReviews] = useState([]);

  const handleOpenReview = (e, bus) => {
    e.stopPropagation();
    setReviews(DUMMY_REVIEWS);
    setSelectedBusReviews(bus);
    setIsReviewOpen(true);
  };

  const [searchParams] = useSearchParams();

  const from = searchParams.get("from") || "Jakarta";
  const to = searchParams.get("to") || "Bandung";
  const date =
    searchParams.get("date") || new Date().toISOString().split("T")[0];

  const passengers = searchParams.get("passengers") || "1";

  const filteredBuses = DUMMY_BUSES.filter(
    (bus) =>
      bus.from.toLowerCase() === from.toLowerCase() &&
      bus.to.toLowerCase() === to.toLowerCase(),
  );

  return (
    <div>
      <ReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        reviewData={selectedBusReviews}
        reviews={reviews}
      />

      {/* Section: Searching */}
      <section className="pt-24 pb-12 bg-gray-50 min-h-screen">
        <div className="sticky top-18 z-50 bg-white mx-auto max-w-7xl py-3 px-4 rounded-xl border-gray-200 drop-shadow-md">
          <div className="flex flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 font-black text-lg text-gray-800">
                  <span>{from}</span>
                  <ArrowRight size={18} className="text-gray-400" />
                  <span>{to}</span>
                </div>
                <div className="flex gap-3 text-sm text-gray-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-300 self-center"></span>
                  <span className="flex items-center gap-1">
                    <Users size={14} /> {passengers} Penumpang
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate("/")}
              className="w-full cursor-pointer md:w-auto px-6 py-2 border-2 border-gray-200 rounded-xl font-bold text-gray-600 hover:border-red-600 hover:text-red-600 transition-colors text-sm"
            >
              Ubah Pencarian
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-7xl grid grid-cols-4 gap-8 mt-6">
          <div className="col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-40">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-lg flex items-center gap-2">
                  <Filter size={20} className="text-red-600" /> Filter
                </h3>
                <button className="text-xs font-bold text-red-600 hover:underline">
                  Reset
                </button>
              </div>

              {/* Filter Waktu */}
              <div className="mb-8">
                <h4 className="font-bold text-sm text-gray-900 mb-3">
                  Waktu Berangkat
                </h4>
                <div className="space-y-3">
                  {[
                    "Pagi (00:00 - 11:00)",
                    "Siang (11:00 - 15:00)",
                    "Sore (15:00 - 18:30)",
                    "Malam (18:30 - 23:59)",
                  ].map((time, i) => (
                    <label
                      key={i}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          className="peer appearance-none w-5 h-5 border-2 border-gray-200 rounded-md checked:bg-red-600 checked:border-red-600 transition-colors"
                        />
                        <CheckCircle2
                          size={12}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                        />
                      </div>
                      <span className="text-sm text-gray-600 group-hover:text-gray-900 font-medium transition-colors">
                        {time}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter Fasilitas */}
              <div className="mb-8">
                <h4 className="font-bold text-sm text-gray-900 mb-3">
                  Fasilitas
                </h4>
                <div className="space-y-3">
                  {[
                    { name: "AC", icon: <Zap size={14} /> },
                    { name: "Toilet", icon: <CheckCircle2 size={14} /> },
                    { name: "WiFi", icon: <Wifi size={14} /> },
                    { name: "Makan", icon: <Coffee size={14} /> },
                    { name: "Charger", icon: <BatteryCharging size={14} /> },
                  ].map((item, i) => (
                    <label
                      key={i}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          className="peer appearance-none w-5 h-5 border-2 border-gray-200 rounded-md checked:bg-red-600 checked:border-red-600 transition-colors"
                        />
                        <CheckCircle2
                          size={12}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                        />
                      </div>
                      <span className="text-sm text-gray-600 group-hover:text-gray-900 font-medium transition-colors flex items-center gap-2">
                        {item.icon} {item.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter Kelas */}
              <div>
                <h4 className="font-bold text-sm text-gray-900 mb-3">
                  Kelas Bus
                </h4>
                <div className="space-y-3">
                  {["Economy", "Business", "Executive", "Sleeper / Suite"].map(
                    (cls, i) => (
                      <label
                        key={i}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            className="peer appearance-none w-5 h-5 border-2 border-gray-200 rounded-md checked:bg-red-600 checked:border-red-600 transition-colors"
                          />
                          <CheckCircle2
                            size={12}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                          />
                        </div>
                        <span className="text-sm text-gray-600 group-hover:text-gray-900 font-medium transition-colors">
                          {cls}
                        </span>
                      </label>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            {/* Sort Options */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-500 text-sm font-medium">
                Menampilkan{" "}
                <strong className="text-gray-900">
                  {DUMMY_BUSES.length} bus
                </strong>{" "}
                tersedia
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 hidden md:inline">
                  Urutkan:
                </span>
                <select className="bg-white border border-gray-200 text-sm font-bold text-gray-800 py-2 px-4 rounded-xl outline-none focus:border-red-500">
                  <option>Harga Termurah</option>
                  <option>Waktu Paling Awal</option>
                  <option>Waktu Paling Akhir</option>
                  <option>Tercepat</option>
                </select>
              </div>
            </div>

            {/* Cards */}
            {filteredBuses.map((bus) => (
              <div
                key={bus.id}
                className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-red-100 transition-all duration-300 group"
              >
                <div className="grid grid-cols-12 gap-6 items-center">
                  {/* Column 1: Info PO */}
                  <div className="col-span-3">
                    <div className="flex flex-col gap-10 mb-2">
                      <div className="flex gap-3 items-center">
                        <div
                          className={`w-14 h-14 ${bus.logoColor} rounded-full flex items-center justify-center text-white font-bold`}
                        >
                          {bus.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-black text-gray-900 leading-tight">
                            {bus.name}
                          </h4>
                          <span className="text-xs font-medium text-gray-500 ">
                            {bus.class}
                          </span>
                        </div>
                      </div>
                      <div
                        className="flex items-center gap-2 text-md font-bold text-yellow-500"
                        onClick={(e) => handleOpenReview(e, bus)}
                      >
                        <Star size={14} fill="currentColor" /> {bus.rating}{" "}
                        <span className="text-blue-500 font-semibold text-xs underline cursor-pointer ">
                          {bus.reviews} Ulasan
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Timeline */}
                  <div className="col-span-5 flex flex-col justify-center">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-black text-xl text-gray-900">
                        {bus.departTime}
                      </span>
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] text-gray-400 font-medium mb-1">
                          {bus.duration}
                        </span>
                        <div className="w-24 h-0.5 bg-gray-200 relative">
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-300"></div>
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-300"></div>
                        </div>
                      </div>
                      <span className="font-black text-xl text-gray-800 text-opacity-60">
                        {bus.arriveTime}
                      </span>
                    </div>
                    <div className="flex justify-between items-start text-xs text-gray-500 font-medium">
                      <span className="max-w-25 leading-tight">
                        {bus.departLoc}
                      </span>
                      <span className="max-w-25 leading-tight text-right">
                        {bus.arriveLoc}
                      </span>
                    </div>
                    {/* Facilities Icons */}
                    <div className="flex gap-2 mt-4">
                      {bus.facilities.slice(0, 4).map((fac, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-50 p-1.5 rounded-lg text-gray-400 group-hover:text-red-500 transition-colors"
                          title={fac}
                        >
                          {fac === "AC" ? (
                            <Zap size={12} />
                          ) : fac === "Wifi" ? (
                            <Wifi size={12} />
                          ) : (
                            <CheckCircle2 size={12} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 3: Price & Action */}
                  <div className="col-span-4 flex flex-col items-end justify-between h-full border-l border-gray-100 pl-0 md:pl-6 pt-4 md:pt-0 border-t md:border-t-0 mt-4 md:mt-0">
                    <div className="text-right mb-2">
                      <p className="text-xs text-gray-400 line-through">
                        Rp {parseInt(bus.price * 1.2).toLocaleString("id-ID")}
                      </p>
                      <p className="text-2xl font-black text-red-600">
                        Rp {bus.price.toLocaleString("id-ID")}
                      </p>
                      <p className="text-xs font-bold text-green-600 mt-1">
                        Tersedia {bus.seatsLeft} kursi
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        navigate(`/bus/${bus.id}`, {
                          state: {
                            origin: from,
                            destination: to,
                            date,
                            passengers,
                          },
                        })
                      }
                      className="w-full py-3 cursor-pointer bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-200 active:scale-95 flex justify-center items-center gap-2"
                    >
                      Pilih <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination / Load More */}
            <div className="text-center pt-8">
              <button className="text-gray-500 font-bold hover:text-red-600 transition-colors text-sm">
                Muat Lebih Banyak...
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
