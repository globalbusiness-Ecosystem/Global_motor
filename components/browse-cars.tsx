"use client";

import { useState } from "react";
import { Search, MapPin, Star, BadgeCheck, Calendar, Gauge, Fuel } from "lucide-react";
import { CarDetailModal } from "./car-detail-modal";

const FILTERS = [
  { id: "All",      label: "الكل"       },
  { id: "Sedan",    label: "سيدان"      },
  { id: "SUV",      label: "دفع رباعي"  },
  { id: "Electric", label: "كهربائي"    },
  { id: "Sport",    label: "رياضي"      },
  { id: "Van",      label: "فان"        },
];

const FEATURED_CARS = [
  { id: 1, nameAr: "فيراري",       price: "2,400", photo: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=600" },
  { id: 2, nameAr: "بي إم دبليو", price: "890",   photo: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600" },
  { id: 3, nameAr: "تسلا",         price: "650",   photo: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600" },
  { id: 4, nameAr: "بورش",         price: "1,200", photo: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600" },
  { id: 5, nameAr: "BMW X7",       price: "940",   photo: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600" },
];

export const CAR_LISTINGS = [
  {
    id: 1,
    photo: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800",
    name: "Ferrari 488 GTB",
    badge: "Hot",
    badgeColor: "bg-red-500",
    year: "2021",
    mileage: "12,000 km",
    fuel: "Petrol",
    location: "Dubai, UAE",
    price: "2,400",
    seller: "Ahmed Al-Rashid",
    avatarColor: "bg-red-500",
    avatarInitial: "A",
    rating: 4.9,
    kyc: true,
    category: "Sport",
    description: "Pristine Ferrari 488 GTB in Rosso Corsa. Full service history, ceramic coated, original paint. This beast delivers 661 hp and 0-100 km/h in just 3 seconds.",
  },
  {
    id: 2,
    photo: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800",
    name: "BMW X7 M Sport",
    badge: "New",
    badgeColor: "bg-blue-500",
    year: "2023",
    mileage: "5,200 km",
    fuel: "Diesel",
    location: "London, UK",
    price: "890",
    seller: "James Carter",
    avatarColor: "bg-blue-500",
    avatarInitial: "J",
    rating: 4.8,
    kyc: true,
    category: "SUV",
    description: "Virtually new BMW X7 M Sport package. Panoramic roof, Bowers & Wilkins audio, full leather, night vision assist. UK spec, full dealer history.",
  },
  {
    id: 3,
    photo: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800",
    name: "Tesla Model S Plaid",
    badge: "New",
    badgeColor: "bg-emerald-500",
    year: "2023",
    mileage: "8,800 km",
    fuel: "Electric",
    location: "San Francisco, USA",
    price: "650",
    seller: "Sarah Kim",
    avatarColor: "bg-emerald-500",
    avatarInitial: "S",
    rating: 5.0,
    kyc: true,
    category: "Electric",
    description: "Tesla Model S Plaid with Autopilot FSD. 1,020 hp tri-motor, 0-100 km/h in 2.1s, 600+ km range. Pearl white exterior, black interior.",
  },
  {
    id: 4,
    photo: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
    name: "BMW M5 Competition",
    badge: "Hot",
    badgeColor: "bg-orange-500",
    year: "2022",
    mileage: "18,000 km",
    fuel: "Petrol",
    location: "Munich, Germany",
    price: "780",
    seller: "Hans Mueller",
    avatarColor: "bg-orange-500",
    avatarInitial: "H",
    rating: 4.8,
    kyc: true,
    category: "Sedan",
    description: "BMW M5 Competition in Carbon Black. 625 hp twin-turbo V8, M xDrive AWD, M Driver Package, Bowers & Wilkins Diamond surround sound. Full German service history.",
  },
  {
    id: 5,
    photo: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
    name: "Porsche 911 Turbo S",
    badge: "Hot",
    badgeColor: "bg-yellow-500",
    year: "2022",
    mileage: "15,400 km",
    fuel: "Petrol",
    location: "Frankfurt, Germany",
    price: "1,200",
    seller: "Klaus Weber",
    avatarColor: "bg-yellow-600",
    avatarInitial: "K",
    rating: 4.9,
    kyc: true,
    category: "Sport",
    description: "Porsche 911 Turbo S in GT Silver. 650 hp, PASM sport suspension, Burmester audio, SportChrono package. German spec with full Porsche service history.",
  },
  {
    id: 6,
    photo: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800",
    name: "Mercedes S-Class 2023",
    badge: "New",
    badgeColor: "bg-slate-400",
    year: "2023",
    mileage: "4,200 km",
    fuel: "Petrol",
    location: "London, UK",
    price: "1,100",
    seller: "Oliver Brown",
    avatarColor: "bg-slate-500",
    avatarInitial: "O",
    rating: 4.9,
    kyc: true,
    category: "Sedan",
    description: "Mercedes S580 in Obsidian Black with AMG Line package. Massage seats, Burmester 4D surround, MBUX Hyperscreen, Magic Body Control. UK registered, under warranty.",
  },
  {
    id: 7,
    photo: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800",
    name: "Lamborghini Urus",
    badge: "Hot",
    badgeColor: "bg-yellow-500",
    year: "2022",
    mileage: "9,600 km",
    fuel: "Petrol",
    location: "Dubai, UAE",
    price: "3,200",
    seller: "Khalid Al-Mansoori",
    avatarColor: "bg-yellow-500",
    avatarInitial: "K",
    rating: 5.0,
    kyc: true,
    category: "SUV",
    description: "Lamborghini Urus Performante in Pearl White. 666 hp V8 twin-turbo, carbon ceramic brakes, full Alcantara interior, panoramic roof. First owner, under factory warranty.",
  },
  {
    id: 8,
    photo: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800",
    name: "Range Rover Vogue",
    badge: "New",
    badgeColor: "bg-green-600",
    year: "2023",
    mileage: "6,100 km",
    fuel: "Diesel",
    location: "Riyadh, SA",
    price: "1,800",
    seller: "Faisal Al-Otaibi",
    avatarColor: "bg-green-600",
    avatarInitial: "F",
    rating: 4.8,
    kyc: true,
    category: "SUV",
    description: "Range Rover Vogue SE in Santorini Black. 3.0D straight-six, Meridian Signature audio, 4-zone climate, deployable side steps. Saudi spec, full dealer warranty.",
  },
  {
    id: 9,
    photo: "https://images.unsplash.com/photo-1614026480209-cd9934144671?w=800",
    name: "Audi R8 V10 Plus",
    badge: "Hot",
    badgeColor: "bg-red-500",
    year: "2022",
    mileage: "11,200 km",
    fuel: "Petrol",
    location: "Munich, Germany",
    price: "2,100",
    seller: "Dieter Bauer",
    avatarColor: "bg-red-600",
    avatarInitial: "D",
    rating: 4.9,
    kyc: true,
    category: "Sport",
    description: "Audi R8 V10 Performance in Daytona Gray. 620 hp naturally aspirated V10, quattro AWD, ceramic brakes, laser headlights. German spec, one owner, full service.",
  },
  {
    id: 10,
    photo: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=800",
    name: "Toyota Land Cruiser",
    badge: "New",
    badgeColor: "bg-emerald-600",
    year: "2023",
    mileage: "7,800 km",
    fuel: "Diesel",
    location: "Cairo, Egypt",
    price: "950",
    seller: "Mohamed Hassan",
    avatarColor: "bg-emerald-600",
    avatarInitial: "M",
    rating: 4.7,
    kyc: true,
    category: "SUV",
    description: "Toyota Land Cruiser GR Sport in Midnight Black. 3.3L twin-turbo diesel V6, 14-speaker JBL audio, 360 view monitor, e-KDSS suspension. Egyptian spec, dealer warranty.",
  },
  {
    id: 11,
    photo: "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800",
    name: "Rolls Royce Ghost",
    badge: "Hot",
    badgeColor: "bg-purple-500",
    year: "2022",
    mileage: "8,000 km",
    fuel: "Petrol",
    location: "Monaco, MC",
    price: "8,500",
    seller: "Jean-Pierre Blanc",
    avatarColor: "bg-purple-500",
    avatarInitial: "J",
    rating: 5.0,
    kyc: true,
    category: "Sedan",
    description: "Rolls-Royce Ghost in Forge Silver with starlight headliner. 563 hp V12, bespoke interior in Seashell/Anthracite leather, rear theater configuration, fully commissionable.",
  },
  {
    id: 12,
    photo: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800",
    name: "Ford Mustang GT",
    badge: "New",
    badgeColor: "bg-blue-600",
    year: "2023",
    mileage: "3,400 km",
    fuel: "Petrol",
    location: "Texas, USA",
    price: "780",
    seller: "Tyler Johnson",
    avatarColor: "bg-blue-600",
    avatarInitial: "T",
    rating: 4.6,
    kyc: false,
    category: "Sport",
    description: "Ford Mustang GT in Race Red. 450 hp 5.0L V8, Brembo brakes, Magneride active suspension, RECARO seats, B&O sound system. Clean title, under factory warranty.",
  },
  {
    id: 13,
    photo: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800",
    name: "Bentley Continental GT",
    badge: "Used",
    badgeColor: "bg-amber-500",
    year: "2021",
    mileage: "22,000 km",
    fuel: "Petrol",
    location: "London, UK",
    price: "4,200",
    seller: "Charles Windsor",
    avatarColor: "bg-amber-600",
    avatarInitial: "C",
    rating: 4.9,
    kyc: true,
    category: "Sport",
    description: "Bentley Continental GT V8 in Viridian. 542 hp twin-turbo V8, rotating Dashboard, Naim audio, full Mulliner specification. One owner from new, full Bentley service history.",
  },
  {
    id: 14,
    photo: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=800",
    name: "Maserati Levante",
    badge: "Used",
    badgeColor: "bg-red-600",
    year: "2021",
    mileage: "28,000 km",
    fuel: "Petrol",
    location: "Milan, Italy",
    price: "520",
    seller: "Marco Rossi",
    avatarColor: "bg-red-700",
    avatarInitial: "M",
    rating: 4.5,
    kyc: true,
    category: "SUV",
    description: "Maserati Levante S GranSport in Blu Emozione. 430 hp V6 twin-turbo, Skyhook suspension, Bowers & Wilkins audio, full leather Zegna interior. Italian spec, full service history.",
  },
  {
    id: 15,
    photo: "https://images.unsplash.com/photo-1541443131876-44b03de101c5?w=800",
    name: "Mercedes G63 AMG",
    badge: "Hot",
    badgeColor: "bg-red-500",
    year: "2023",
    mileage: "5,500 km",
    fuel: "Petrol",
    location: "Beirut, Lebanon",
    price: "2,900",
    seller: "Rami Khoury",
    avatarColor: "bg-red-500",
    avatarInitial: "R",
    rating: 4.9,
    kyc: true,
    category: "SUV",
    description: "Mercedes-AMG G63 in Designo Selenite Grey Magno matte. 585 hp handbuilt biturbo V8, AMG Performance exhaust, Burmester audio, panoramic sunroof. Delivery mileage, under full warranty.",
  },
  {
    id: 16,
    photo: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800",
    name: "Bugatti Chiron Sport",
    badge: "Hot",
    badgeColor: "bg-purple-600",
    year: "2021",
    mileage: "3,200 km",
    fuel: "Petrol",
    location: "Geneva, CH",
    price: "45,000",
    seller: "François Müller",
    avatarColor: "bg-purple-600",
    avatarInitial: "F",
    rating: 5.0,
    kyc: true,
    category: "Sport",
    description: "Bugatti Chiron Sport in Exposed Carbon/French Racing Blue. 1,500 hp quad-turbo 8.0L W16, top speed 420 km/h. Fully documented, Bugatti certified pre-owned. One of 60 built.",
  },
  {
    id: 17,
    photo: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800",
    name: "Audi Q8 e-tron",
    badge: "New",
    badgeColor: "bg-teal-500",
    year: "2023",
    mileage: "2,100 km",
    fuel: "Electric",
    location: "Amsterdam, NL",
    price: "680",
    seller: "Lars van der Berg",
    avatarColor: "bg-teal-500",
    avatarInitial: "L",
    rating: 4.7,
    kyc: true,
    category: "Electric",
    description: "Audi Q8 e-tron Quattro in Chronos Grey. 408 hp dual-motor AWD, 600 km WLTP range, 22 kW onboard charger, B&O sound, head-up display. Dutch spec, tax-registered.",
  },
  {
    id: 18,
    photo: "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?w=800",
    name: "Corvette C8 Stingray",
    badge: "New",
    badgeColor: "bg-yellow-500",
    year: "2023",
    mileage: "1,800 km",
    fuel: "Petrol",
    location: "Miami, USA",
    price: "870",
    seller: "Rick Thompson",
    avatarColor: "bg-yellow-600",
    avatarInitial: "R",
    rating: 4.8,
    kyc: false,
    category: "Sport",
    description: "Corvette C8 Stingray in Amplify Orange Tintcoat. 490 hp 6.2L V8 mid-engine, Z51 performance package, Brembo carbon ceramic brakes, Bose premium audio. Under factory warranty.",
  },
  {
    id: 19,
    photo: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800",
    name: "Cadillac Escalade ESV",
    badge: "New",
    badgeColor: "bg-slate-500",
    year: "2023",
    mileage: "8,900 km",
    fuel: "Petrol",
    location: "Los Angeles, USA",
    price: "1,050",
    seller: "Marcus Davis",
    avatarColor: "bg-slate-500",
    avatarInitial: "M",
    rating: 4.6,
    kyc: true,
    category: "SUV",
    description: "Cadillac Escalade ESV Platinum in Black Raven. 420 hp 6.2L V8 magnetic ride control, 38-inch curved OLED dashboard, AKG Studio Reference audio, Super Cruise hands-free driving.",
  },
  {
    id: 20,
    photo: "https://images.unsplash.com/photo-1515569067071-ec3b51335dd0?w=800",
    name: "Lexus LX 600",
    badge: "New",
    badgeColor: "bg-indigo-500",
    year: "2023",
    mileage: "6,300 km",
    fuel: "Petrol",
    location: "Abu Dhabi, UAE",
    price: "1,350",
    seller: "Sultan Al-Dhaheri",
    avatarColor: "bg-indigo-500",
    avatarInitial: "S",
    rating: 4.8,
    kyc: true,
    category: "SUV",
    description: "Lexus LX 600 VIP in Sonic Titanium. Twin-turbo V6, 4-seat luxury spec with ottoman rear seats, 23-speaker Mark Levinson audio, panoramic sunroof, e-KDSS suspension.",
  },
  {
    id: 21,
    photo: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800",
    name: "Nissan GT-R Nismo",
    badge: "Used",
    badgeColor: "bg-red-600",
    year: "2020",
    mileage: "19,500 km",
    fuel: "Petrol",
    location: "Tokyo, Japan",
    price: "1,600",
    seller: "Hiroshi Tanaka",
    avatarColor: "bg-red-600",
    avatarInitial: "H",
    rating: 4.9,
    kyc: true,
    category: "Sport",
    description: "Nissan GT-R Nismo in Ultimate Matte White. Hand-assembled VR38DETT 600 hp twin-turbo, carbon fibre body panels, Nismo-tuned suspension, Bilstein DampTronic, Recaro carbon seats.",
  },
  {
    id: 22,
    photo: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800",
    name: "Porsche Taycan Turbo S",
    badge: "New",
    badgeColor: "bg-teal-500",
    year: "2023",
    mileage: "4,700 km",
    fuel: "Electric",
    location: "Zurich, CH",
    price: "1,420",
    seller: "Nina Schreiber",
    avatarColor: "bg-teal-500",
    avatarInitial: "N",
    rating: 4.9,
    kyc: true,
    category: "Electric",
    description: "Porsche Taycan Turbo S in Frozen Blue Metallic. 761 hp dual-motor AWD, 0-100 km/h in 2.8s, PDCC active roll stabilisation, Burmester 3D audio, full leather sport seats.",
  },
  {
    id: 23,
    photo: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800",
    name: "McLaren 720S",
    badge: "Hot",
    badgeColor: "bg-orange-500",
    year: "2021",
    mileage: "14,200 km",
    fuel: "Petrol",
    location: "Singapore",
    price: "3,800",
    seller: "Wei Lin",
    avatarColor: "bg-orange-500",
    avatarInitial: "W",
    rating: 4.9,
    kyc: true,
    category: "Sport",
    description: "McLaren 720S Performance in Papaya Spark. 710 hp 4.0L twin-turbo V8, Proactive Chassis Control II, carbon-ceramic brakes, MSO carbon interior pack. Singapore COE included.",
  },
  {
    id: 24,
    photo: "https://images.unsplash.com/photo-1574023278572-f3c0b05e92af?w=800",
    name: "Land Rover Defender 110",
    badge: "New",
    badgeColor: "bg-green-600",
    year: "2023",
    mileage: "9,100 km",
    fuel: "Diesel",
    location: "Cape Town, ZA",
    price: "620",
    seller: "Andile Dlamini",
    avatarColor: "bg-green-600",
    avatarInitial: "A",
    rating: 4.7,
    kyc: true,
    category: "SUV",
    description: "Land Rover Defender 110 X in Santorini Black. 3.0D I6 MHEV 300 hp, air suspension, Meridian sound, SV bespoke interior, Wade sensing, tow package. South African spec.",
  },
  {
    id: 25,
    photo: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800",
    name: "Aston Martin DBX707",
    badge: "Hot",
    badgeColor: "bg-emerald-600",
    year: "2022",
    mileage: "7,400 km",
    fuel: "Petrol",
    location: "Istanbul, Turkey",
    price: "3,100",
    seller: "Emir Yilmaz",
    avatarColor: "bg-emerald-600",
    avatarInitial: "E",
    rating: 4.8,
    kyc: true,
    category: "SUV",
    description: "Aston Martin DBX707 in Iridescent Emerald. 707 hp AMG-sourced V8, world's most powerful luxury SUV, Alcantara/leather interior, panoramic roof, 23-inch forged wheels.",
  },
  {
    id: 26,
    photo: "https://images.unsplash.com/photo-1469285994282-454ceb49e63c?w=800",
    name: "Mercedes V-Class VIP",
    badge: "Used",
    badgeColor: "bg-purple-500",
    year: "2019",
    mileage: "62,000 km",
    fuel: "Diesel",
    location: "Istanbul, Turkey",
    price: "180",
    seller: "Yusuf Demir",
    avatarColor: "bg-violet-500",
    avatarInitial: "Y",
    rating: 4.5,
    kyc: true,
    category: "Van",
    description: "Mercedes V300d in obsidian black. Fully converted VIP with captain seats, ambient lighting, partition glass, refrigerator. Corporate fleet maintained.",
  },
];

export function BrowseCars() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCar, setSelectedCar] = useState<(typeof CAR_LISTINGS)[0] | null>(null);

  const filtered = CAR_LISTINGS.filter((car) => {
    const matchFilter = activeFilter === "All" || car.category === activeFilter;
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      car.name.toLowerCase().includes(q) ||
      car.location.toLowerCase().includes(q) ||
      car.fuel.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <div className="relative overflow-hidden px-4 pt-5 pb-4">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 60% at 85% 35%, rgba(201,168,76,0.09) 0%, transparent 70%)",
          }}
        />
        <div className="relative flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.18em] mb-2">
              Pi Network · شبكة باي
            </p>
            <h1 className="text-[2.2rem] font-black leading-none text-gold-gradient">
              Global Motor
            </h1>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              أول سوق سيارات على شبكة Pi
            </p>
            <p className="text-[11px] text-muted-foreground/60 mt-0.5">
              No banks. No borders. Just Pi.
            </p>
          </div>
          <div className="w-28 h-20 rounded-2xl overflow-hidden flex-shrink-0 animate-float-car shadow-xl shadow-black/40 border border-white/8">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400"
              alt="Featured car"
              crossOrigin="anonymous"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Search */}
        <div className="relative mt-4">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            dir="rtl"
            placeholder="ابحث عن سيارة أو موقع..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-3 rounded-2xl bg-surface-1 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
          />
        </div>
      </div>

      {/* ── Filter chips ── */}
      <div className="px-4 pb-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1" dir="ltr">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-150 ${
                activeFilter === f.id
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/35"
                  : "bg-surface-2 text-muted-foreground border border-border"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Featured ── */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.14em]">
            السيارات المميزة
          </h2>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1" dir="ltr">
          {FEATURED_CARS.map((car) => (
            <div
              key={car.id}
              className="flex-shrink-0 w-28 rounded-2xl border border-white/8 overflow-hidden flex flex-col"
              style={{ background: "#111010" }}
            >
              {/* Photo */}
              <div className="w-full h-20 overflow-hidden">
                <img
                  src={car.photo}
                  alt={car.nameAr}
                  crossOrigin="anonymous"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              {/* Label */}
              <div className="p-2 flex flex-col gap-1">
                <span className="text-[11px] font-bold text-white/90 leading-tight">{car.nameAr}</span>
                <div className="flex items-center gap-0.5">
                  <span className="text-pi-gold font-black text-xs leading-none">π</span>
                  <span className="text-white/75 font-bold text-[10px] leading-none ms-0.5">{car.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Listings ── */}
      <div className="px-4 pb-6 flex flex-col gap-3">
        <h2 className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.14em]">
          {filtered.length} إعلان متاح
        </h2>

        {filtered.map((car) => (
          <button
            key={car.id}
            onClick={() => setSelectedCar(car)}
            className="text-right w-full rounded-2xl bg-card border border-border overflow-hidden active:scale-[0.985] transition-transform duration-150"
          >
            {/* Thumbnail */}
            <div className="relative h-44 overflow-hidden bg-surface-1">
              <img
                src={car.photo}
                alt={car.name}
                crossOrigin="anonymous"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 0 }}
              />
              {/* Dark overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/15 pointer-events-none" />
              {/* Badge */}
              <span
                className={`absolute top-3 right-3 ${car.badgeColor} text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest`}
              >
                {car.badge === "New" ? "جديد" : car.badge === "Hot" ? "مطلوب" : "مستعمل"}
              </span>
              {/* Price chip */}
              <div className="absolute bottom-3 left-3 bg-black/65 backdrop-blur-sm rounded-xl px-3 py-1.5 flex items-center gap-1" dir="ltr">
                <span className="text-pi-gold font-black text-sm leading-none">π</span>
                <span className="text-white font-black text-sm leading-none">{car.price}</span>
              </div>
            </div>

            {/* Body */}
            <div className="p-3.5 flex flex-col gap-2.5">
              <h3 className="font-black text-foreground text-[15px] leading-tight">{car.name}</h3>

              {/* Specs 2×2 */}
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3 text-primary/70 flex-shrink-0" />{car.year}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Gauge className="w-3 h-3 text-primary/70 flex-shrink-0" />{car.mileage}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Fuel className="w-3 h-3 text-primary/70 flex-shrink-0" />{car.fuel}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3 text-primary/70 flex-shrink-0" />{car.location}
                </span>
              </div>

              {/* CTA */}
              <button className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold mt-0.5 active:scale-[0.98] transition-transform">
                تواصل مع البائع
              </button>

              {/* Seller row */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full ${car.avatarColor} flex items-center justify-center text-white text-xs font-black flex-shrink-0`}
                  >
                    {car.avatarInitial}
                  </div>
                  <span className="text-xs font-semibold text-foreground">{car.seller}</span>
                  {car.kyc && <BadgeCheck className="w-4 h-4 text-primary flex-shrink-0" />}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-pi-gold fill-pi-gold" />
                  <span className="text-xs font-bold text-foreground">{car.rating}</span>
                </div>
              </div>
            </div>
          </button>
        ))}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <span className="text-5xl">🔍</span>
            <p className="text-sm font-bold text-foreground">لا توجد نتائج</p>
            <p className="text-xs text-muted-foreground">حاول تغيير كلمة البحث أو الفئة</p>
          </div>
        )}
      </div>

      {selectedCar && (
        <CarDetailModal car={selectedCar} onClose={() => setSelectedCar(null)} />
      )}
    </div>
  );
}
