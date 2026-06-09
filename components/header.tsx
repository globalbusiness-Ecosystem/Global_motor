"use client";

import { Menu, Settings } from "lucide-react";

interface HeaderProps {
  onMenuOpen: () => void;
  onSettingsOpen: () => void;
}

export function Header({ onMenuOpen, onSettingsOpen }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-30 w-full bg-background/90 backdrop-blur-lg border-b border-border"
      dir="ltr"
    >
      <div className="flex items-center h-14 px-2">
        {/* Left: hamburger */}
        <button
          onClick={onMenuOpen}
          className="w-10 h-10 flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-all duration-150 flex-shrink-0"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" strokeWidth={2} />
        </button>

        {/* Center: logo + domain */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center shadow-md shadow-primary/40 flex-shrink-0">
              <span className="text-primary-foreground font-black text-[11px] leading-none">G</span>
            </div>
            <span className="text-foreground font-black text-[15px] tracking-tight leading-none">
              Global Motor
            </span>
          </div>
          <span className="text-[10px] text-primary font-semibold tracking-wide mt-0.5 leading-none">
            globalmotor.pi
          </span>
        </div>

        {/* Right: settings gear */}
        <button
          onClick={onSettingsOpen}
          className="w-10 h-10 flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-all duration-150 flex-shrink-0"
          aria-label="Open settings"
        >
          <Settings className="w-5 h-5" strokeWidth={2} />
        </button>
      </div>
    </header>
  );
}
