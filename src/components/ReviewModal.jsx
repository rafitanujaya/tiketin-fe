import { Star, X } from "lucide-react";


export const ReviewModal = ({ isOpen, onClose, reviews, reviewData, }) => {
  if (!isOpen || !reviewData) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
       <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
       <div className="bg-white rounded-[2rem] w-full max-w-lg p-0 relative shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col max-h-[80vh]">
          <div className="p-6 border-b border-gray-100 bg-white sticky top-0 z-10 flex justify-between items-start">
             <div>
                <h3 className="text-xl font-black text-gray-900">{reviewData.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Star size={16} className="text-yellow-400 fill-yellow-400"/>
                  <span className="font-bold text-gray-900">{reviewData.rating}</span>
                  <span className="text-gray-400 text-sm">({reviewData.reviews} Ulasan)</span>
                </div>
             </div>
             <button onClick={onClose} className="p-2 bg-gray-50 rounded-full hover:bg-gray-100">
                <X size={20} className="text-gray-500"/>
             </button>
          </div>
          <div className="p-6 overflow-y-auto space-y-6">
             {reviews.map((review, i) => (
               <div key={i} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                     <h4 className="font-bold text-gray-900">{review.user}</h4>
                     <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                  <div className="flex gap-1 mb-2">
                     {[...Array(5)].map((_, idx) => (
                        <Star key={idx} size={12} className={`${idx < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}/>
                     ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">"{review.comment}"</p>
               </div>
             ))}
          </div>
          <div className="p-4 border-t border-gray-100 bg-gray-50 text-center text-xs text-gray-400">
             Menampilkan ulasan terbaru
          </div>
       </div>
    </div>
  );
};