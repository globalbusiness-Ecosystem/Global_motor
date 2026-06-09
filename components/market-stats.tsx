"use client";

import { TrendingUp, TrendingDown, Globe, Car, Users, Zap } from "lucide-react";

const TOP_CATEGORIES = [
  { label: "SUV",      labelAr: "دفع رباعي", share: 34, color: "bg-blue-500" },
  { label: "Sedan",   labelAr: "سيدان",     share: 28, color: "bg-primary" },
  { label: "Sport",   labelAr: "رياضي",    share: 18, color: "bg-red-500" },
  { label: "Electric",labelAr: "كهربائي",  share: 12, color: "bg-emerald-500" },
  { label: "Van",     labelAr: "فان",       share: 8,  color: "bg-purple-500" },
];

const TOP_MARKETS = [
  { flag: "🇦🇪", country: "الإمارات",  countryEn: "UAE",     listings: 84,  avgPi: 920 },
  { flag: "🇸🇦", country: "السعودية", countryEn: "Saudi",   listings: 71,  avgPi: 640 },
  { flag: "🇪🇬", country: "مصر",      countryEn: "Egypt",   listings: 55,  avgPi: 310 },
  { flag: "🇩🇪", country: "ألمانيا",  countryEn: "Germany", listings: 48,  avgPi: 780 },
  { flag: "🇺🇸", country: "أمريكا",   countryEn: "USA",     listings: 43,  avgPi: 850 },
];

const PRICE_RANGES = [
  { range: "0 – 200 π",   count: 18, pct: 18 },
  { range: "200 – 500 π", count: 32, pct: 32 },
  { range: "500 – 1K π",  count: 27, pct: 27 },
  { range: "1K – 2K π",   count: 15, pct: 15 },
  { range: "2K+ π",       count: 8,  pct: 8 },
];

const KPI_CARDS = [
  { icon: Car,    label: "إجمالي الإعلانات", labelEn: "Total Listings", value: "1,284",  trend: "+12%",  up: true },
  { icon: Users,  label: "مشترون نشطون",     labelEn: "Active Buyers",  value: "3,670",  trend: "+24%",  up: true },
  { icon: Globe,  label: "دول مشاركة",       labelEn: "Countries",      value: "48",     trend: "+3",    up: true },
  { icon: Zap,    label: "معاملات Pi",       labelEn: "Pi Transactions",value: "6,812",  trend: "+31%",  up: true },
];

export function MarketStats() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="px-4 pt-5 pb-4 border-b border-border">
        <p className="text-[10px] font-black text-primary uppercase tracking-[0.18em] mb-1.5">إحصائيات السوق</p>
        <h1 className="text-[2rem] font-black leading-none text-gold-gradient">Market Stats</h1>
        <p className="text-xs text-muted-foreground mt-2">بيانات السوق العالمية لسيارات Pi</p>
      </div>

      <div className="px-4 py-4 flex flex-col gap-5">
        {/* KPI Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {KPI_CARDS.map(({ icon: Icon, label, labelEn, value, trend, up }) => (
            <div
              key={labelEn}
              className="bg-card border border-border rounded-2xl p-4 flex flex-col gap-2"
            >
              <div className="flex items-start justify-between">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className={`flex items-center gap-0.5 text-xs font-bold ${up ? "text-emerald-400" : "text-red-400"}`}>
                  {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {trend}
                </div>
              </div>
              <div>
                <p className="text-2xl font-black text-foreground leading-none">{value}</p>
                <p className="text-[10px] text-muted-foreground mt-1 leading-tight">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Category breakdown */}
        <div className="bg-surface-1 border border-border rounded-2xl p-4">
          <h2 className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.14em] mb-4">
            توزيع الفئات
          </h2>
          <div className="flex flex-col gap-3">
            {TOP_CATEGORIES.map((cat) => (
              <div key={cat.label} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground">{cat.labelAr}</span>
                  <span className="text-xs font-bold text-primary">{cat.share}%</span>
                </div>
                <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${cat.color}`}
                    style={{ width: `${cat.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price range distribution */}
        <div className="bg-surface-1 border border-border rounded-2xl p-4">
          <h2 className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.14em] mb-4">
            توزيع الأسعار
          </h2>
          <div className="flex items-end gap-2 h-24">
            {PRICE_RANGES.map((r) => (
              <div key={r.range} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-lg bg-primary/80"
                  style={{ height: `${r.pct * 2.4}px` }}
                />
                <span className="text-[8px] text-muted-foreground text-center leading-tight whitespace-nowrap">
                  {r.range}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top markets */}
        <div className="bg-surface-1 border border-border rounded-2xl p-4 mb-4">
          <h2 className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.14em] mb-4">
            أبرز الأسواق
          </h2>
          <div className="flex flex-col gap-0">
            {TOP_MARKETS.map((market, i) => (
              <div
                key={market.countryEn}
                className={`flex items-center justify-between py-3 ${
                  i < TOP_MARKETS.length - 1 ? "border-b border-border/60" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{market.flag}</span>
                  <div>
                    <p className="text-sm font-bold text-foreground">{market.country}</p>
                    <p className="text-[10px] text-muted-foreground">{market.listings} إعلان</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-pi-gold">π {market.avgPi}</p>
                  <p className="text-[10px] text-muted-foreground">متوسط السعر</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
