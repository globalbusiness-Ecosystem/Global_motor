"use client";

import { useMemo } from "react";

interface Line {
  id: number;
  top: string;
  width: string;
  duration: string;
  delay: string;
  opacity: number;
}

// Deterministic pseudo-random to avoid hydration mismatches
function seeded(seed: number, range: number): number {
  return (((seed * 1103515245 + 12345) & 0x7fffffff) % range);
}

export function SpeedLines() {
  const lines: Line[] = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        top: `${(i / 22) * 98 + 1}%`,
        width: `${80 + seeded(i * 7 + 3, 120)}px`,
        duration: `${3.2 + seeded(i * 13 + 1, 14) * 0.25}s`,
        delay:    `${seeded(i * 19 + 5, 40) * 0.12}s`,
        opacity:  0.25 + seeded(i * 11 + 2, 8) * 0.05,
      })),
    []
  );

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden z-0"
      aria-hidden="true"
    >
      {lines.map((line) => (
        <span
          key={line.id}
          className="speed-line"
          style={{
            top: line.top,
            width: line.width,
            animationDuration: line.duration,
            animationDelay: line.delay,
            opacity: line.opacity,
          }}
        />
      ))}
    </div>
  );
}
