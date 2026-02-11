import { Instagram, Twitter, Facebook } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-white pt-20 pb-12 mt-12 rounded-t-[3rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] border-t border-gray-100/50">
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
                  <a href="#" className="hover:text-red-600 transition-colors inline-block hover:translate-x-1 duration-200">
                    Tentang Kami
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-600 transition-colors inline-block hover:translate-x-1 duration-200">
                    Karir
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-600 transition-colors inline-block hover:translate-x-1 duration-200">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-600 transition-colors inline-block hover:translate-x-1 duration-200">
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
                  <a href="#" className="hover:text-red-600 transition-colors inline-block hover:translate-x-1 duration-200">
                    Pusat Bantuan
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-600 transition-colors inline-block hover:translate-x-1 duration-200">
                    Cara Pesan
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-600 transition-colors inline-block hover:translate-x-1 duration-200">
                    Tiket Saya
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-600 transition-colors inline-block hover:translate-x-1 duration-200">
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
                  <a href="#" className="hover:text-red-600 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 group-hover:scale-125 transition-transform"></span>
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-600 transition-colors">
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
            &copy; 2026 Tiketin. 
            {/* Powered by{" "} */}
            {/* <strong className="text-gray-900">
              Rafi Asshiddiqie Tanujaya
            </strong>. */}
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
  );
};
