"use client";

import { useEffect, useState } from "react";
import { X, Phone, Heart, Calendar, Gauge, Fuel, MapPin, Star, BadgeCheck, Wallet } from "lucide-react";
import { CAR_LISTINGS } from "./browse-cars";
import { usePiAuth } from "@/contexts/pi-auth-context";
import { PRODUCT_CONFIG } from "@/lib/product-config";

type Car = (typeof CAR_LISTINGS)[0];

interface CarDetailModalProps {
  car: Car;
  onClose: () => void;
}

export function CarDetailModal({ car, onClose }: CarDetailModalProps) {
  const [saved, setSaved] = useState(false);
  const [visible, setVisible] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const { products } = usePiAuth();
  const product = products?.find(
    (p) => p.id === PRODUCT_CONFIG.PRODUCT_69a74037fab96b973533c5a8
  );
  const amount = product?.price_in_pi;

  const handlePayment = () => {
    if (!product || amount === undefined) return;
    setPaymentStatus("loading");
    setPaymentError(null);
    window.pay({
      amount,
      memo: product.name,
      metadata: { productId: product.id },
      onComplete: () => {
        setPaymentStatus("success");
      },
      onError: (error: unknown) => {
        setPaymentStatus("error");
        setPaymentError(
          error instanceof Error ? error.message : "Payment failed. Please try again."
        );
      },
    });
  };

  useEffect(() => {
    // Trigger animation after mount
    requestAnimationFrame(() => setVisible(true));
    // Prevent body scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-end transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ background: "rgba(0,0,0,0.72)" }}
      onClick={handleClose}
    >
      <div
        className={`relative bg-card rounded-t-3xl max-h-[92vh] overflow-y-auto transition-transform duration-350 ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.32,0.72,0,1)" }}
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>

        {/* Hero image */}
        <div className="relative h-56 mx-4 rounded-2xl overflow-hidden bg-surface-1">
          <img
            src={car.photo}
            alt={car.name}
            crossOrigin="anonymous"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 pointer-events-none" />
          <button
            onClick={handleClose}
            className="absolute top-3 left-3 w-9 h-9 rounded-full bg-black/55 backdrop-blur-sm flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <span
            className={`absolute top-3 right-3 ${car.badgeColor} text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest`}
          >
            {car.badge === "New" ? "جديد" : car.badge === "Hot" ? "مطلوب" : "مستعمل"}
          </span>
          {/* Price */}
          <div className="absolute bottom-3 left-3 bg-black/65 backdrop-blur-sm rounded-xl px-3 py-1.5 flex items-center gap-1.5" dir="ltr">
            <span className="text-pi-gold font-black text-xl leading-none">π</span>
            <span className="text-white font-black text-xl leading-none">{car.price}</span>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-4 flex flex-col gap-4">
          {/* Title + seller */}
          <div>
            <h2 className="text-xl font-black text-foreground leading-tight">{car.name}</h2>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <div
                className={`w-7 h-7 rounded-full ${car.avatarColor} flex items-center justify-center text-white text-xs font-black flex-shrink-0`}
              >
                {car.avatarInitial}
              </div>
              <span className="text-xs text-muted-foreground">{car.seller}</span>
              {car.kyc && (
                <BadgeCheck className="w-4 h-4 text-primary flex-shrink-0" />
              )}
              <div className="flex items-center gap-0.5 mr-auto">
                <Star className="w-3.5 h-3.5 text-pi-gold fill-pi-gold" />
                <span className="text-xs font-bold text-foreground">{car.rating}</span>
              </div>
            </div>
          </div>

          {/* Pi payment button */}
          <div className="flex flex-col gap-1.5">
            <button
              onClick={handlePayment}
              disabled={!product || paymentStatus === "loading" || paymentStatus === "success"}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 ${
                paymentStatus === "success"
                  ? "bg-emerald-500/15 border border-emerald-500/35 text-emerald-400 cursor-default"
                  : !product
                  ? "bg-surface-2 border border-border text-muted-foreground cursor-not-allowed opacity-50"
                  : paymentStatus === "loading"
                  ? "bg-primary/15 border border-primary/35 text-primary cursor-wait"
                  : "bg-primary/10 border border-primary/35 text-primary active:scale-[0.98]"
              }`}
            >
              <Wallet className="w-4 h-4 flex-shrink-0" />
              <span className="truncate" dir="ltr">
                {paymentStatus === "success"
                  ? "تمت الدفعة!"
                  : paymentStatus === "loading"
                  ? "جارٍ المعالجة..."
                  : !product
                  ? "غير متاح"
                  : `${product.name} — π ${amount}`}
              </span>
            </button>
            {paymentStatus === "error" && paymentError && (
              <p className="text-xs text-destructive text-center">{paymentError}</p>
            )}
          </div>

          {/* Specs 2×2 grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { icon: Calendar, labelAr: "السنة",    value: car.year     },
              { icon: Gauge,    labelAr: "المسافة",  value: car.mileage  },
              { icon: Fuel,     labelAr: "الوقود",   value: car.fuel     },
              { icon: MapPin,   labelAr: "الموقع",   value: car.location },
            ].map(({ icon: Icon, labelAr, value }) => (
              <div key={labelAr} className="bg-surface-2 border border-border/60 rounded-xl p-3 flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{labelAr}</span>
                </div>
                <span className="text-sm font-bold text-foreground leading-snug">{value}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="bg-surface-2 border border-border/60 rounded-xl p-4">
            <h3 className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.12em] mb-2">
              الوصف
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{car.description}</p>
          </div>

          {/* CTA row */}
          <div className="flex gap-3 pb-4">
            <button className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-sm active:scale-[0.98] transition-transform shadow-lg shadow-primary/25">
              <Phone className="w-4 h-4 flex-shrink-0" />
              تواصل مع البائع
            </button>
            <button
              onClick={() => setSaved((s) => !s)}
              className={`w-14 flex items-center justify-center rounded-2xl border-2 transition-all duration-200 ${
                saved
                  ? "bg-red-500/12 border-red-500/45 text-red-400"
                  : "bg-surface-2 border-border text-muted-foreground"
              }`}
              aria-label={saved ? "إزالة من المفضلة" : "حفظ في المفضلة"}
            >
              <Heart className={`w-5 h-5 transition-all ${saved ? "fill-red-400 scale-110" : ""}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
