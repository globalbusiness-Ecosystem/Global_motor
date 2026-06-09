"use client";

import { Search, PlusCircle, Car, BarChart2 } from "lucide-react";
import type { TabId } from "@/app/page";

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const TABS = [
  { id: "browse"   as TabId, label: "Browse",    labelAr: "تصفح",      icon: Search,    center: false },
  { id: "sell"     as TabId, label: "Sell",       labelAr: "بيع",       icon: PlusCircle, center: true },
  { id: "listings" as TabId, label: "My Listings", labelAr: "إعلاناتي", icon: Car,       center: false },
  { id: "stats"    as TabId, label: "Market",     labelAr: "السوق",     icon: BarChart2, center: false },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 flex items-end justify-around bg-card/95 backdrop-blur-lg border-t border-border px-2 pb-2 pt-1.5 max-w-lg mx-auto"
      aria-label="Main navigation"
      dir="ltr"
    >
      {TABS.map(({ id, label, labelAr, icon: Icon, center }) => {
        const isActive = activeTab === id;

        if (center) {
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              className="flex flex-col items-center gap-1 -mt-6"
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-200 ${
                  isActive
                    ? "bg-primary scale-110 shadow-primary/50 animate-gold-pulse"
                    : "bg-primary/85 shadow-primary/25 active:scale-95"
                }`}
              >
                <Icon className="w-6 h-6 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <span
                className={`text-[10px] font-bold leading-none mt-0.5 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {labelAr}
              </span>
            </button>
          );
        }

        return (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            aria-label={label}
            aria-current={isActive ? "page" : undefined}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-200 ${
              isActive
                ? "text-primary bg-primary/10"
                : "text-muted-foreground active:text-foreground"
            }`}
          >
            <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-bold leading-none">{labelAr}</span>
          </button>
        );
      })}
    </nav>
  );
}
