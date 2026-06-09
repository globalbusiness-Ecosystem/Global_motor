"use client";

import { useState } from "react";
import {
  X,
  Palette,
  Languages,
  DollarSign,
  Bell,
  Info,
  ChevronLeft,
  ChevronDown,
  Check,
  Moon,
  Sun,
} from "lucide-react";

interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
}

type SettingSection = "root" | "theme" | "language" | "currency" | "notifications" | "about";

const THEMES = [
  { id: "carbon",  labelAr: "كربوني داكن",  labelEn: "Dark Carbon",  preview: "#080808" },
  { id: "midnight", labelAr: "منتصف الليل", labelEn: "Midnight Blue", preview: "#0a0e1a" },
  { id: "racing",  labelAr: "سباق أحمر",    labelEn: "Racing Red",   preview: "#1a0808" },
];

const LANGUAGES = [
  { id: "ar", label: "العربية",    flag: "SA" },
  { id: "en", label: "English",    flag: "US" },
  { id: "fr", label: "Français",   flag: "FR" },
  { id: "de", label: "Deutsch",    flag: "DE" },
  { id: "zh", label: "中文",       flag: "CN" },
];

const CURRENCIES = [
  { id: "pi",  symbol: "π",  label: "Pi Coin",         labelAr: "Pi" },
  { id: "usd", symbol: "$",  label: "US Dollar",        labelAr: "دولار" },
  { id: "eur", symbol: "€",  label: "Euro",             labelAr: "يورو" },
  { id: "aed", symbol: "د.إ", label: "UAE Dirham",      labelAr: "درهم" },
  { id: "sar", symbol: "ر.س", label: "Saudi Riyal",     labelAr: "ريال" },
  { id: "gbp", symbol: "£",  label: "British Pound",    labelAr: "جنيه" },
];

const NOTIF_OPTIONS = [
  { id: "new_listings",  labelAr: "إعلانات جديدة",    labelEn: "New Listings"    },
  { id: "messages",      labelAr: "رسائل البائعين",   labelEn: "Seller Messages" },
  { id: "price_drops",   labelAr: "انخفاض الأسعار",   labelEn: "Price Drops"     },
  { id: "pi_payments",   labelAr: "معاملات Pi",       labelEn: "Pi Payments"     },
];

export function SettingsPanel({ open, onClose }: SettingsPanelProps) {
  const [section, setSection] = useState<SettingSection>("root");
  const [selectedTheme, setSelectedTheme] = useState("carbon");
  const [selectedLang, setSelectedLang] = useState("ar");
  const [selectedCurrency, setSelectedCurrency] = useState("pi");
  const [notifs, setNotifs] = useState<Record<string, boolean>>({
    new_listings: true,
    messages: true,
    price_drops: false,
    pi_payments: true,
  });

  const toggleNotif = (id: string) =>
    setNotifs((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleClose = () => {
    onClose();
    setTimeout(() => setSection("root"), 300);
  };

  const ROOT_SECTIONS = [
    {
      id: "theme" as SettingSection,
      icon: Palette,
      labelAr: "المظهر",
      labelEn: "Theme",
      value: THEMES.find((t) => t.id === selectedTheme)?.labelAr ?? "",
    },
    {
      id: "language" as SettingSection,
      icon: Languages,
      labelAr: "اللغة",
      labelEn: "Language",
      value: LANGUAGES.find((l) => l.id === selectedLang)?.label ?? "",
    },
    {
      id: "currency" as SettingSection,
      icon: DollarSign,
      labelAr: "العملة",
      labelEn: "Currency",
      value: CURRENCIES.find((c) => c.id === selectedCurrency)?.label ?? "",
    },
    {
      id: "notifications" as SettingSection,
      icon: Bell,
      labelAr: "الإشعارات",
      labelEn: "Notifications",
      value: `${Object.values(notifs).filter(Boolean).length} مفعّل`,
    },
    {
      id: "about" as SettingSection,
      icon: Info,
      labelAr: "حول التطبيق",
      labelEn: "About",
      value: "v1.0.0",
    },
  ];

  const panelTitle =
    section === "root"          ? "الإعدادات"
    : section === "theme"       ? "المظهر"
    : section === "language"    ? "اللغة"
    : section === "currency"    ? "العملة"
    : section === "notifications" ? "الإشعارات"
    : "حول التطبيق";

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Drawer — slides up from bottom */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 max-w-lg mx-auto bg-card rounded-t-3xl border-t border-border flex flex-col transition-transform duration-350 ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "90vh", transitionTimingFunction: "cubic-bezier(0.32,0.72,0,1)" }}
        dir="rtl"
        role="dialog"
        aria-modal="true"
        aria-label="الإعدادات"
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>

        {/* Title row */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border flex-shrink-0">
          {section !== "root" && (
            <button
              onClick={() => setSection("root")}
              className="w-8 h-8 rounded-xl bg-surface-2 flex items-center justify-center text-muted-foreground flex-shrink-0"
              aria-label="Back"
            >
              <ChevronLeft className="w-4 h-4 rotate-180" />
            </button>
          )}
          <h2 className="text-base font-black text-foreground flex-1">{panelTitle}</h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-xl bg-surface-2 flex items-center justify-center text-muted-foreground flex-shrink-0"
            aria-label="Close settings"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* Root menu */}
          {section === "root" && (
            <div className="p-3 flex flex-col gap-1">
              {ROOT_SECTIONS.map(({ id, icon: Icon, labelAr, labelEn, value }) => (
                <button
                  key={id}
                  onClick={() => setSection(id)}
                  className="w-full flex items-center gap-3 px-3 py-3.5 rounded-xl bg-surface-1 border border-border/60 text-right hover:bg-surface-2 transition-colors duration-150"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4.5 h-4.5 text-primary" strokeWidth={2} />
                  </div>
                  <div className="flex flex-col items-start flex-1 min-w-0">
                    <span className="text-sm font-bold text-foreground">{labelAr}</span>
                    <span className="text-[10px] text-muted-foreground">{labelEn}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[11px] text-primary font-semibold truncate max-w-[80px]">{value}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground -rotate-90" />
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Theme */}
          {section === "theme" && (
            <div className="p-3 flex flex-col gap-2">
              <p className="text-xs text-muted-foreground px-1 mb-2">اختر مظهر التطبيق</p>
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTheme(t.id)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all ${
                    selectedTheme === t.id
                      ? "bg-primary/10 border-primary/35 text-primary"
                      : "bg-surface-1 border-border text-muted-foreground"
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-lg border border-white/10 flex-shrink-0 flex items-center justify-center"
                    style={{ background: t.preview }}
                  >
                    {t.id === "carbon" ? (
                      <Moon className="w-3.5 h-3.5 text-pi-gold" />
                    ) : (
                      <Sun className="w-3.5 h-3.5 text-white/50" />
                    )}
                  </div>
                  <div className="flex flex-col items-start flex-1">
                    <span className="text-sm font-bold">{t.labelAr}</span>
                    <span className="text-[10px] text-muted-foreground">{t.labelEn}</span>
                  </div>
                  {selectedTheme === t.id && (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Language */}
          {section === "language" && (
            <div className="p-3 flex flex-col gap-2">
              <p className="text-xs text-muted-foreground px-1 mb-2">اختر لغة التطبيق</p>
              {LANGUAGES.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setSelectedLang(l.id)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all ${
                    selectedLang === l.id
                      ? "bg-primary/10 border-primary/35 text-primary"
                      : "bg-surface-1 border-border text-foreground"
                  }`}
                >
                  <span className="text-xl flex-shrink-0">{l.flag === "SA" ? "🇸🇦" : l.flag === "US" ? "🇺🇸" : l.flag === "FR" ? "🇫🇷" : l.flag === "DE" ? "🇩🇪" : "🇨🇳"}</span>
                  <span className="text-sm font-bold flex-1 text-right">{l.label}</span>
                  {selectedLang === l.id && (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Currency */}
          {section === "currency" && (
            <div className="p-3 flex flex-col gap-2">
              <p className="text-xs text-muted-foreground px-1 mb-2">اختر عملة العرض</p>
              {CURRENCIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCurrency(c.id)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all ${
                    selectedCurrency === c.id
                      ? "bg-primary/10 border-primary/35 text-primary"
                      : "bg-surface-1 border-border text-foreground"
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-surface-2 border border-border flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-black text-pi-gold">{c.symbol}</span>
                  </div>
                  <div className="flex flex-col items-start flex-1">
                    <span className="text-sm font-bold">{c.labelAr}</span>
                    <span className="text-[10px] text-muted-foreground">{c.label}</span>
                  </div>
                  {selectedCurrency === c.id && (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Notifications */}
          {section === "notifications" && (
            <div className="p-3 flex flex-col gap-2">
              <p className="text-xs text-muted-foreground px-1 mb-2">تحكم في إشعاراتك</p>
              {NOTIF_OPTIONS.map((n) => (
                <div
                  key={n.id}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-surface-1 border border-border"
                >
                  <div className="flex flex-col items-start flex-1">
                    <span className="text-sm font-bold text-foreground">{n.labelAr}</span>
                    <span className="text-[10px] text-muted-foreground">{n.labelEn}</span>
                  </div>
                  <button
                    onClick={() => toggleNotif(n.id)}
                    className={`relative w-11 h-6 rounded-full transition-all duration-200 flex-shrink-0 ${
                      notifs[n.id] ? "bg-primary" : "bg-surface-3"
                    }`}
                    aria-checked={notifs[n.id]}
                    role="switch"
                  >
                    <span
                      className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${
                        notifs[n.id] ? "right-0.5" : "left-0.5"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* About */}
          {section === "about" && (
            <div className="p-4 flex flex-col gap-4">
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-xl shadow-primary/30">
                  <span className="text-primary-foreground font-black text-2xl leading-none">G</span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-foreground">Global Motor</h3>
                  <p className="text-xs text-primary font-bold mt-0.5">globalmotor.pi</p>
                </div>
                <div className="flex items-center gap-2 bg-surface-2 border border-border rounded-full px-4 py-1.5">
                  <span className="text-xs text-muted-foreground">الإصدار</span>
                  <span className="text-xs font-black text-foreground">1.0.0</span>
                </div>
              </div>

              <div className="bg-surface-1 border border-border rounded-2xl p-4 flex flex-col gap-3">
                {[
                  { label: "المنصة",   value: "Pi Network" },
                  { label: "الشبكة",   value: "Pi Mainnet" },
                  { label: "اللايسنس", value: "Pi Developer" },
                  { label: "الدعم",    value: "globalmotor.pi" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-bold text-foreground">{value}</span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-muted-foreground/60 text-center leading-relaxed pb-4">
                أول سوق سيارات عالمي على شبكة Pi{"\n"}
                No banks. No borders. Just Pi.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
