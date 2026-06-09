"use client";

import { useState } from "react";
import { Camera, ChevronDown, CheckCircle2, AlertCircle } from "lucide-react";

const FUEL_TYPES = ["Petrol", "Diesel", "Electric", "Hybrid", "LPG"];

interface FormState {
  brand: string;
  model: string;
  year: string;
  mileage: string;
  fuel: string;
  price: string;
  location: string;
  description: string;
}

export function SellCar() {
  const [form, setForm] = useState<FormState>({
    brand: "",
    model: "",
    year: "",
    mileage: "",
    fuel: "",
    price: "",
    location: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photoUploaded, setPhotoUploaded] = useState(false);

  const update = (field: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const isValid =
    form.brand &&
    form.model &&
    form.year &&
    form.mileage &&
    form.fuel &&
    form.price &&
    form.location;

  const handleSubmit = () => {
    if (!isValid) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const inputCls =
    "w-full px-3.5 py-3 rounded-xl bg-surface-2 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all";
  const labelCls =
    "text-[10px] font-black text-muted-foreground uppercase tracking-[0.14em] mb-1.5";

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 gap-6 text-center">
        <div className="w-20 h-20 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-foreground mb-2">تم نشر الإعلان!</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            سيارتك {form.brand} {form.model} متاحة الآن على Global Motor
          </p>
        </div>
        <div className="bg-surface-2 rounded-2xl p-4 w-full max-w-xs border border-border">
          {[
            { label: "السيارة",        value: `${form.brand} ${form.model}` },
            { label: "السعر",           value: `π ${form.price}`, gold: true },
            { label: "رسوم النشر",     value: "π 1" },
          ].map(({ label, value, gold }) => (
            <div key={label} className="flex justify-between items-center text-sm py-2 border-b border-border/60 last:border-0">
              <span className="text-muted-foreground">{label}</span>
              <span className={gold ? "text-pi-gold font-black" : "text-foreground font-semibold"}>{value}</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ brand: "", model: "", year: "", mileage: "", fuel: "", price: "", location: "", description: "" });
            setPhotoUploaded(false);
          }}
          className="w-full max-w-xs py-3.5 rounded-2xl bg-primary text-primary-foreground font-black text-sm shadow-lg shadow-primary/25 active:scale-[0.98] transition-transform"
        >
          أضف إعلانًا آخر
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-28">
      {/* Header */}
      <div className="px-4 pt-5 pb-4 border-b border-border">
        <p className="text-[10px] font-black text-primary uppercase tracking-[0.18em] mb-1.5">بيع سيارتك</p>
        <h1 className="text-[2rem] font-black leading-none text-gold-gradient">Sell Your Car</h1>
        <p className="text-xs text-muted-foreground mt-2">أوصل إلى مشترين Pi حول العالم · No banks. No borders.</p>
      </div>

      <div className="px-4 py-5 flex flex-col gap-5">
        {/* Photo upload */}
        <button
          onClick={() => setPhotoUploaded((p) => !p)}
          className={`relative w-full h-44 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-all ${
            photoUploaded
              ? "border-primary/50 bg-primary/8"
              : "border-border bg-surface-1 active:bg-surface-2"
          }`}
        >
          {photoUploaded ? (
            <>
              <span className="text-5xl">🚗</span>
              <span className="text-sm text-primary font-bold">تم رفع الصورة</span>
              <span className="text-xs text-muted-foreground">اضغط للتغيير</span>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-surface-2 flex items-center justify-center">
                <Camera className="w-6 h-6 text-muted-foreground" />
              </div>
              <span className="text-sm font-bold text-foreground">ارفع صورة السيارة</span>
              <span className="text-xs text-muted-foreground">اضغط لاختيار من المعرض</span>
            </>
          )}
        </button>

        {/* Brand & Model */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col">
            <label className={labelCls}>الماركة</label>
            <input type="text" dir="ltr" placeholder="BMW" value={form.brand}
              onChange={(e) => update("brand", e.target.value)} className={inputCls} />
          </div>
          <div className="flex flex-col">
            <label className={labelCls}>الموديل</label>
            <input type="text" dir="ltr" placeholder="M5" value={form.model}
              onChange={(e) => update("model", e.target.value)} className={inputCls} />
          </div>
        </div>

        {/* Year & Mileage */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col">
            <label className={labelCls}>سنة الصنع</label>
            <input type="number" dir="ltr" placeholder="2023" value={form.year}
              onChange={(e) => update("year", e.target.value)} className={inputCls} />
          </div>
          <div className="flex flex-col">
            <label className={labelCls}>المسافة (كم)</label>
            <input type="number" dir="ltr" placeholder="15000" value={form.mileage}
              onChange={(e) => update("mileage", e.target.value)} className={inputCls} />
          </div>
        </div>

        {/* Fuel type */}
        <div className="flex flex-col">
          <label className={labelCls}>نوع الوقود</label>
          <div className="relative">
            <select
              value={form.fuel}
              onChange={(e) => update("fuel", e.target.value)}
              className={`${inputCls} appearance-none pe-9`}
            >
              <option value="" disabled>اختر نوع الوقود</option>
              {FUEL_TYPES.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
            <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label className={labelCls}>السعر بعملة Pi (π)</label>
          <div className="relative">
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-pi-gold font-black text-base leading-none pointer-events-none">π</span>
            <input
              type="number"
              dir="ltr"
              placeholder="0"
              value={form.price}
              onChange={(e) => update("price", e.target.value)}
              className={`${inputCls} pr-10`}
            />
          </div>
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <label className={labelCls}>الموقع</label>
          <input type="text" dir="auto" placeholder="المدينة، الدولة" value={form.location}
            onChange={(e) => update("location", e.target.value)} className={inputCls} />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className={labelCls}>الوصف</label>
          <textarea
            dir="auto"
            placeholder="اصف حالة السيارة، مميزاتها، تاريخ الصيانة..."
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            rows={4}
            className={`${inputCls} resize-none`}
          />
        </div>

        {/* Listing fee notice */}
        <div className="flex items-start gap-2.5 bg-pi-gold/8 border border-pi-gold/25 rounded-2xl p-3.5">
          <AlertCircle className="w-4 h-4 text-pi-gold mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="text-pi-gold font-black">رسوم النشر: π 1 </span>
            — يتم خصم 1 Pi مرة واحدة لنشر إعلانك على Global Motor.
          </p>
        </div>

        {/* Publish CTA */}
        <button
          onClick={handleSubmit}
          disabled={!isValid || loading}
          className={`w-full py-4 rounded-2xl font-black text-base transition-all tracking-wide ${
            isValid && !loading
              ? "bg-primary text-primary-foreground shadow-xl shadow-primary/30 active:scale-[0.98]"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              جارٍ المعالجة...
            </span>
          ) : (
            "نشر الإعلان"
          )}
        </button>
      </div>
    </div>
  );
}
