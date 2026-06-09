"use client";

import { X, Search, PlusCircle, Car, BarChart2, Globe, ShieldCheck, Phone, Info, ChevronLeft } from "lucide-react";
import { usePiAuth } from "@/contexts/pi-auth-context";
import type { TabId } from "@/app/page";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const NAV_ITEMS = [
  { id: "browse"   as TabId, labelAr: "تصفح السيارات",  labelEn: "Browse Cars",    icon: Search     },
  { id: "sell"     as TabId, labelAr: "بيع سيارتك",     labelEn: "Sell Your Car",  icon: PlusCircle },
  { id: "listings" as TabId, labelAr: "إعلاناتي",       labelEn: "My Listings",    icon: Car        },
  { id: "stats"    as TabId, labelAr: "إحصائيات السوق", labelEn: "Market Stats",   icon: BarChart2  },
];

const INFO_LINKS = [
  { labelAr: "كيف يعمل",   labelEn: "How It Works",  icon: Info        },
  { labelAr: "تحقق KYC",   labelEn: "KYC Verify",    icon: ShieldCheck },
  { labelAr: "اتصل بنا",   labelEn: "Contact Us",    icon: Phone       },
  { labelAr: "عالمي 100٪", labelEn: "Global · Pi",   icon: Globe       },
];

export function Sidebar({ open, onClose, activeTab, onTabChange }: SidebarProps) {
  const { userData, isAuthenticated } = usePiAuth();

  const handleNav = (tab: TabId) => {
    onTabChange(tab);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-card border-l border-border flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ maxWidth: "80vw" }}
        dir="rtl"
        role="dialog"
        aria-modal="true"
        aria-label="القائمة الرئيسية"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-14 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground font-black text-sm leading-none">G</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-foreground font-black text-sm">Global Motor</span>
              <span className="text-muted-foreground text-[10px]">globalmotor.pi</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-surface-2 flex items-center justify-center text-muted-foreground"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User badge */}
        {isAuthenticated && userData && (
          <div className="mx-4 mt-4 flex items-center gap-3 bg-surface-2 border border-border rounded-2xl p-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground font-black text-base leading-none uppercase">
                {userData.username?.charAt(0) ?? "U"}
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-foreground truncate">{userData.username}</span>
              <span className="text-[10px] text-primary font-semibold">KYC محقق</span>
            </div>
          </div>
        )}

        {/* Nav items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.14em] px-2 mb-2">
            التنقل
          </p>
          {NAV_ITEMS.map(({ id, labelAr, labelEn, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => handleNav(id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-right transition-all duration-150 ${
                  isActive
                    ? "bg-primary/12 border border-primary/25 text-primary"
                    : "text-muted-foreground hover:bg-surface-2 hover:text-foreground"
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-primary" : ""}`} strokeWidth={isActive ? 2.5 : 2} />
                <div className="flex flex-col items-start min-w-0">
                  <span className="text-sm font-bold leading-tight">{labelAr}</span>
                  <span className="text-[10px] text-muted-foreground/70 leading-tight">{labelEn}</span>
                </div>
                {isActive && <ChevronLeft className="w-4 h-4 mr-auto text-primary/60 flex-shrink-0" />}
              </button>
            );
          })}

          <div className="mt-4 mb-2 h-px bg-border" />
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.14em] px-2 mb-2">
            معلومات
          </p>
          {INFO_LINKS.map(({ labelAr, labelEn, icon: Icon }) => (
            <button
              key={labelAr}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-right text-muted-foreground hover:bg-surface-2 hover:text-foreground transition-all duration-150"
            >
              <Icon className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
              <div className="flex flex-col items-start">
                <span className="text-sm font-semibold leading-tight">{labelAr}</span>
                <span className="text-[10px] text-muted-foreground/70">{labelEn}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-border flex-shrink-0">
          <p className="text-[10px] text-muted-foreground/50 text-center leading-relaxed">
            Global Motor v1.0 · Built on Pi Network
            {"\n"}No banks. No borders. Just Pi.
          </p>
        </div>
      </div>
    </>
  );
}
