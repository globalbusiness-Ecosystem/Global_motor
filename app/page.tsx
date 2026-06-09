"use client";

import { useState } from "react";
import { BrowseCars } from "@/components/browse-cars";
import { SellCar } from "@/components/sell-car";
import { MyListings } from "@/components/my-listings";
import { MarketStats } from "@/components/market-stats";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";
import { SpeedLines } from "@/components/speed-lines";
import { Sidebar } from "@/components/sidebar";
import { SettingsPanel } from "@/components/settings-panel";

export type TabId = "browse" | "sell" | "listings" | "stats";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabId>("browse");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background max-w-lg mx-auto overflow-x-hidden" dir="ltr">
      {/* Speed lines behind all content */}
      <SpeedLines />

      {/* Sticky header — 3-zone layout */}
      <Header
        onMenuOpen={() => setSidebarOpen(true)}
        onSettingsOpen={() => setSettingsOpen(true)}
      />

      {/* Scrollable tab content */}
      <main className="relative z-10 overflow-y-auto pb-24" dir="rtl">
        {activeTab === "browse"   && <BrowseCars />}
        {activeTab === "sell"     && <SellCar />}
        {activeTab === "listings" && <MyListings />}
        {activeTab === "stats"    && <MarketStats />}
      </main>

      {/* Fixed bottom nav */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Sidebar drawer (hamburger) */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Settings sheet (gear icon) */}
      <SettingsPanel
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
}
