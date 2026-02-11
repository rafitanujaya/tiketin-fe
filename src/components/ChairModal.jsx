import { Armchair, ArrowRight, CheckCircle2, Info, X } from "lucide-react";
import { useNavigate } from "react-router";

export const ChairModal = ({ isOpen, onClose, selectedBus, searchData, selectedSeats, toggleSeat, bookedSeats }) => {
    const navigate = useNavigate();
    if (!isOpen || !selectedBus) return null;


    const goToBooking = () => {
        const bookingData = {
            bus: selectedBus,
            selectedSeats,
            searchData
        };

        localStorage.setItem("bookingData", JSON.stringify(bookingData));

        navigate(`/bus/${selectedBus.id}/booking`, {
            state: bookingData
        });
    };



  return (
    <div className="fixed inset-0 z-[90] flex items-end md:items-center justify-center p-0 md:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      {/* Modal Card */}
      <div className="bg-white w-full md:max-w-4xl h-[90vh] md:h-auto md:max-h-[90vh] rounded-t-[2rem] md:rounded-[2.5rem] relative shadow-2xl flex flex-col animate-in slide-in-from-bottom-10 md:zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white rounded-t-[2rem] sticky top-0 z-20">
           <div>
              <h2 className="text-xl font-black text-gray-900">Pilih Kursi</h2>
              <p className="text-sm text-gray-500 font-medium mt-1">
                 {selectedBus.name} • {new Date(searchData.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} • {selectedBus.departTime}
              </p>
           </div>
           <button onClick={onClose} className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 hover:text-red-600 transition-colors">
              <X size={24} />
           </button>
        </div>

        {/* Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50">
           <div className="flex flex-col md:flex-row gap-8 justify-center">
              
              {/* Legend & Seat Map */}
              <div className="flex-1 max-w-sm mx-auto w-full">
                 <div className="flex justify-center gap-4 md:gap-6 mb-6 text-xs font-bold text-gray-500">
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-md bg-white border-2 border-gray-200"></div><span>Kosong</span></div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-md bg-gray-300"></div><span>Terisi</span></div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-md bg-red-600 shadow-red-200 shadow-sm"></div><span>Pilihanmu</span></div>
                 </div>

                 {/* Bus Layout */}
                 <div className="bg-white p-6 rounded-[2rem] border-2 border-gray-200 relative shadow-sm">
                    {/* Front */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-3 w-24 h-6 bg-gray-200 rounded-t-full border-t-4 border-gray-300 flex items-center justify-center">
                       <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Depan</span>
                    </div>
                    {/* Driver */}
                    <div className="flex justify-end mb-6 mt-2">
                       <div className="w-10 h-10 bg-gray-100 rounded-full flex flex-col items-center justify-center border-2 border-gray-300">
                          <span className="text-[8px] font-black text-gray-400 uppercase">Supir</span>
                       </div>
                    </div>
                    {/* Seats */}
                    <SeatMap22 onSeatClick={toggleSeat} selected={selectedSeats} booked={bookedSeats}/>
                 </div>
              </div>

              {/* Info limit */}
              <div className="md:w-64 shrink-0">
                 <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl mb-4">
                    <div className="flex gap-3">
                       <Info size={20} className="text-blue-600 shrink-0"/>
                       <div>
                          <p className="text-xs font-bold text-blue-800 mb-1">Info Pemilihan</p>
                          <p className="text-xs text-blue-600 leading-relaxed">
                             Kamu mencari untuk <strong className="text-blue-900">{searchData.passengers} Penumpang</strong>. 
                             Silakan pilih maksimal {searchData.passengers} kursi.
                          </p>
                       </div>
                    </div>
                 </div>
                 {selectedSeats.length > 0 && (
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                       <p className="text-xs text-gray-400 font-bold uppercase mb-2">Kursi Dipilih</p>
                       <div className="flex flex-wrap gap-2">
                          {selectedSeats.map(seat => (
                             <span key={seat} className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-md shadow-red-200">
                                {seat}
                             </span>
                          ))}
                       </div>
                    </div>
                 )}
              </div>
           </div>
        </div>

        {/* Footer (Sticky) */}
        <div className="p-6 border-t border-gray-100 bg-white rounded-b-[2.5rem] flex justify-between items-center gap-6 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] z-20">
           <div>
              <p className="text-xs text-gray-400 font-bold uppercase mb-1">Total Harga</p>
              <p className="text-2xl font-black text-gray-900">Rp {(selectedBus.price * selectedSeats.length).toLocaleString('id-ID')}</p>
           </div>
           <button 
              disabled={selectedSeats.length !== searchData.passengers}
              onClick={goToBooking}
              className={`px-8 py-4 rounded-2xl font-black text-lg flex items-center gap-2 transition-all ${
                 selectedSeats.length === parseInt(searchData.passengers)
                 ? 'bg-red-600 text-white shadow-lg shadow-red-200 hover:bg-red-700 hover:shadow-red-500/30 cursor-pointer transform active:scale-95'
                 : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
           >
              Lanjut <ArrowRight size={20} />
           </button>
        </div>

      </div>
    </div>
  );
}

const SeatMap22 = ({ onSeatClick, selected, booked }) => {
    const rows = 8;
    const renderSeat = (seatId) => {
        const isBooked = booked.includes(seatId);
        const isSelected = selected.includes(seatId);
        
        return (
        <button
            onClick={() => onSeatClick(seatId)}
            disabled={isBooked}
            className={`
            w-10 h-10 md:w-12 md:h-12 rounded-lg m-1 flex flex-col items-center justify-center relative transition-all duration-200
            ${isBooked 
                ? 'bg-gray-300 cursor-not-allowed text-gray-400' 
                : isSelected 
                ? 'bg-red-600 text-white shadow-lg shadow-red-200 scale-110 z-10' 
                : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-red-400 hover:text-red-500'
            }
            `}
        >
            <Armchair size={20} strokeWidth={2.5} className={isBooked ? 'opacity-50' : ''}/>
            <span className="text-[10px] font-bold mt-[-2px]">{seatId}</span>
            {isSelected && (
            <div className="absolute -top-1 -right-1 bg-white text-red-600 rounded-full p-0.5 shadow-sm">
                <CheckCircle2 size={10} fill="currentColor" className="text-white"/>
            </div>
            )}
        </button>
        );
    };

    return (
        <div className="flex flex-col gap-3">
        {[...Array(rows)].map((_, i) => {
            const rowNum = i + 1;
            return (
            <div key={rowNum} className="flex items-center justify-between">
                <div className="flex gap-2">
                {renderSeat(`${rowNum}A`)}
                {renderSeat(`${rowNum}B`)}
                </div>
                <div className="w-8 text-center text-xs text-gray-300 font-medium">{rowNum}</div>
                <div className="flex gap-2">
                {renderSeat(`${rowNum}C`)}
                {renderSeat(`${rowNum}D`)}
                </div>
            </div>
            );
        })}
        </div>
    );
};