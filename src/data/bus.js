export const BUS_IMAGE_SET = [
  // Eksterior
  "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070&auto=format&fit=crop",
  
  // Interior
  "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2070&auto=format&fit=crop",

  // Kursi
  "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=2070&auto=format&fit=crop",

  // Cabin / Window view
  "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?q=80&w=2070&auto=format&fit=crop",

  // Malam / Sleeper vibe
  "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?q=80&w=2070&auto=format&fit=crop",

  // Driver / dashboard
  "https://images.unsplash.com/photo-1485579149621-3123dd979885?q=80&w=2070&auto=format&fit=crop",

  // Terminal
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
];

export const DUMMY_BUSES = [
  {
    id: 1,
    name: "Sinar Jaya",
    class: "Executive Class",
    rating: 4.8,
    reviews: 312,
    departTime: "07:00",
    departLoc: "Terminal Pulo Gebang",
    departAddr: "Jl. Sejajar Sisi Tol Tim., Jakarta Timur",
    arriveTime: "10:30",
    arriveLoc: "Terminal Leuwi Panjang",
    arriveAddr: "Jl. Soekarno Hatta No.205, Bandung",
    duration: "3j 30m",
    price: 150000,
    seatsLeft: 12,
    totalSeats: 32,
    seatFormat: "2-2",
    baggage: "20 kg",
    facilities: ["AC", "USB", "Toilet", "Reclining", "Makan"],
    logoColor: "bg-blue-600",
    from: "Jakarta",
    to: "Bandung",
    images: BUS_IMAGE_SET,
    description:
      "Nikmati perjalanan nyaman dengan kursi reclining luas dan makan gratis 1x."
  },

  {
    id: 2,
    name: "Rosalia Indah",
    class: "Super Top SHD",
    rating: 4.9,
    reviews: 198,
    departTime: "08:15",
    departLoc: "Terminal Pondok Pinang",
    departAddr: "Jl. Metro Pondok Indah, Jakarta Selatan",
    arriveTime: "11:45",
    arriveLoc: "Pool Pasir Koja",
    arriveAddr: "Jl. Raya Pasir Koja, Bandung",
    duration: "3j 30m",
    price: 185000,
    seatsLeft: 5,
    totalSeats: 40,
    seatFormat: "2-1",
    baggage: "25 kg",
    facilities: ["AC", "Makan", "Leg Rest", "Wifi"],
    logoColor: "bg-orange-500",
    from: "Jakarta",
    to: "Bandung",
    images: BUS_IMAGE_SET,
    description:
      "Bus premium konfigurasi 2-1 dengan WiFi stabil dan kabin lega."
  },

  {
    id: 3,
    name: "Harapan Jaya",
    class: "Sleeper Seat",
    rating: 5.0,
    reviews: 120,
    departTime: "19:00",
    departLoc: "Terminal Lebak Bulus",
    departAddr: "Jl. TB Simatupang, Jakarta Selatan",
    arriveTime: "22:30",
    arriveLoc: "Terminal Cicaheum",
    arriveAddr: "Jl. AH Nasution, Bandung",
    duration: "3j 30m",
    price: 320000,
    seatsLeft: 2,
    totalSeats: 24,
    seatFormat: "1-1 Sleeper",
    baggage: "20 kg",
    facilities: ["Bantal", "Selimut", "Snack", "TV", "USB"],
    logoColor: "bg-red-600",
    from: "Jakarta",
    to: "Bandung",
    images: BUS_IMAGE_SET,
    description:
      "Sleeper class eksklusif untuk perjalanan malam dengan kenyamanan maksimal."
  },

  {
    id: 4,
    name: "Primajasa",
    class: "Bisnis AC",
    rating: 4.5,
    reviews: 420,
    departTime: "09:00",
    departLoc: "Terminal Cililitan",
    departAddr: "Jl. Mayjen Sutoyo, Jakarta Timur",
    arriveTime: "12:30",
    arriveLoc: "Terminal Leuwi Panjang",
    arriveAddr: "Jl. Soekarno Hatta, Bandung",
    duration: "3j 30m",
    price: 110000,
    seatsLeft: 20,
    totalSeats: 40,
    seatFormat: "2-2",
    baggage: "15 kg",
    facilities: ["AC", "Music"],
    logoColor: "bg-green-600",
    from: "Jakarta",
    to: "Bandung",
    images: BUS_IMAGE_SET,
    description:
      "Pilihan ekonomis dengan AC nyaman dan harga bersahabat."
  },

  {
    id: 5,
    name: "Juragan 99",
    class: "Sultan Class",
    rating: 4.9,
    reviews: 155,
    departTime: "16:00",
    departLoc: "Terminal Pulo Gebang",
    departAddr: "Jl. Sejajar Sisi Tol Tim., Jakarta Timur",
    arriveTime: "19:30",
    arriveLoc: "Trans Studio Mall",
    arriveAddr: "Jl. Gatot Subroto, Bandung",
    duration: "3j 30m",
    price: 450000,
    seatsLeft: 4,
    totalSeats: 20,
    seatFormat: "1-1 Premium",
    baggage: "30 kg",
    facilities: ["Massage", "Makan Prasmanan", "Wifi Kencang", "TV"],
    logoColor: "bg-gray-900",
    from: "Jakarta",
    to: "Bandung",
    images: BUS_IMAGE_SET,
    description:
      "Sultan class dengan kursi pijat dan layanan premium sepanjang perjalanan."
  }
];
