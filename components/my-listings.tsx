"use client";

import { useState } from "react";
import { BadgeCheck, Calendar, Gauge, MapPin, Eye, Trash2, Edit3, Plus } from "lucide-react";
import { usePiAuth } from "@/contexts/pi-auth-context";

interface Listing {
  id: number;
  emoji: string;
  name: string;
  year: string;
  mileage: string;
  location: string;
  price: string;
  status: "active" | "pending" | "sold";
  views: number;
  postedDays: number;
  gradientFrom: string;
  gradientTo: string;
}

const MOCK_LISTINGS: Listing[] = [
  {
    id: 1,
    emoji: "🚗",
    name: "BMW M5 Competition",
    year: "2022",
    mileage: "14,000 km",
    location: "Riyadh, SA",
    price: "780",
    status: "active",
    views: 142,
    postedDays: 3,
    gradientFrom: "from-blue-800",
    gradientTo: "to-blue-950",
  },
  {
    id: 2,
    emoji: "🏎️",
    name: "Audi RS7 Sportback",
    year: "2021",
    mileage: "28,000 km",
    location: "Cairo, EG",
    price: "430",
    status: "pending",
    views: 67,
    postedDays: 1,
    gradientFrom: "from-zinc-700",
    gradientTo: "to-zinc-950",
  },
  {
    id: 3,
    emoji: "🚙",
    name: "Range Rover Sport",
    year: "2019",
    mileage: "55,000 km",
    location: "Dubai, UAE",
    price: "290",
    status: "sold",
    views: 389,
    postedDays: 21,
    gradientFrom: "from-emerald-800",
    gradientTo: "to-emerald-950",
  },
];

const STATUS_STYLES: Record<Listing["status"], { label: string; labelAr: string; bg: string; text: string }> = {
  active:  { label: "Active",  labelAr: "نشط",    bg: "bg-emerald-500/15", text: "text-emerald-400" },
  pending: { label: "Pending", labelAr: "قيد المراجعة", bg: "bg-amber-500/15",   text: "text-amber-400" },
  sold:    { label: "Sold",    labelAr: "مباع",   bg: "bg-muted",         text: "text-muted-foreground" },
};

export function MyListings() {
  const { userData } = usePiAuth();
  const [listings, setListings] = useState<Listing[]>(MOCK_LISTINGS);

  const removeListing = (id: number) => {
    setListings((prev) => prev.filter((l) => l.id !== id));
  };

  const stats = {
    active: listings.filter((l) => l.status === "active").length,
    sold:   listings.filter((l) => l.status === "sold").length,
    views:  listings.reduce((acc, l) => acc + l.views, 0),
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="px-4 pt-5 pb-4 border-b border-border">
        <p className="text-[10px] font-black text-primary uppercase tracking-[0.18em] mb-1.5">إعلاناتي</p>
        <h1 className="text-[2rem] font-black leading-none text-gold-gradient">My Listings</h1>
        {userData && (
          <div className="flex items-center gap-2 mt-2">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <span className="text-[10px] font-black text-primary-foreground uppercase">
                {userData.username?.charAt(0) ?? "U"}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">{userData.username}</span>
            <BadgeCheck className="w-4 h-4 text-primary" />
          </div>
        )}
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-2 px-4 py-4 border-b border-border">
        {[
          { label: "نشط",    value: stats.active },
          { label: "مباع",   value: stats.sold },
          { label: "مشاهدة", value: stats.views },
        ].map((s) => (
          <div key={s.label} className="bg-surface-2 border border-border rounded-2xl p-3 flex flex-col items-center gap-1">
            <span className="text-xl font-black text-primary">{s.value}</span>
            <span className="text-[11px] text-muted-foreground font-bold">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Listings */}
      <div className="px-4 py-4 flex flex-col gap-3">
        {listings.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <span className="text-5xl">🚗</span>
            <div>
              <p className="text-sm font-bold text-foreground">لا توجد إعلانات</p>
              <p className="text-xs text-muted-foreground mt-1">No listings yet. Start selling your car!</p>
            </div>
            <button className="flex items-center gap-2 bg-primary text-primary-foreground text-sm font-bold px-6 py-3 rounded-2xl shadow-lg shadow-primary/30">
              <Plus className="w-4 h-4" />
              أضف إعلانًا
            </button>
          </div>
        ) : (
          listings.map((listing) => {
            const statusStyle = STATUS_STYLES[listing.status];
            return (
              <div
                key={listing.id}
                className="rounded-2xl bg-card border border-border overflow-hidden"
              >
                {/* Image */}
                <div className={`relative h-28 bg-gradient-to-br ${listing.gradientFrom} ${listing.gradientTo} flex items-center justify-center`}>
                  <span className="text-5xl drop-shadow-lg">{listing.emoji}</span>
                  {/* Status badge */}
                  <span className={`absolute top-2.5 left-2.5 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${statusStyle.bg} ${statusStyle.text}`}>
                    {statusStyle.labelAr}
                  </span>
                  {/* Price */}
                  <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-sm rounded-lg px-2.5 py-1 flex items-center gap-1">
                    <span className="text-pi-gold font-black text-sm">π</span>
                    <span className="text-white font-bold text-sm">{listing.price}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3 flex flex-col gap-2">
                  <h3 className="font-bold text-foreground text-sm leading-tight">{listing.name}</h3>
                  <div className="flex gap-3">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3 text-primary/60" /> {listing.year}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Gauge className="w-3 h-3 text-primary/60" /> {listing.mileage}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3 text-primary/60" /> {listing.location}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between pt-1.5 border-t border-border">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Eye className="w-3.5 h-3.5" />
                      <span className="text-xs">{listing.views} مشاهدة</span>
                      <span className="text-xs text-muted-foreground/50 mx-1">·</span>
                      <span className="text-xs text-muted-foreground/70">منذ {listing.postedDays} أيام</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="w-8 h-8 rounded-xl bg-surface-1 border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                        aria-label="Edit listing"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      {listing.status !== "sold" && (
                        <button
                          onClick={() => removeListing(listing.id)}
                          className="w-8 h-8 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center justify-center text-destructive hover:bg-destructive/20 transition-colors"
                          aria-label="Delete listing"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
