"use client";

import { cn } from "@/lib/utils";

interface TickerItem {
  type: "placement" | "update" | "news" | "event";
  text: string;
}

const defaultItems: TickerItem[] = [
  { type: "placement", text: "Muskan Kapoor placed at Fortis Healthcare, Delhi" },
  { type: "placement", text: "Rohit Sharma joins Max Hospital as OT Technician" },
  { type: "news", text: "New Batch Starting August 2025 — Limited Seats Available" },
  { type: "update", text: "GD Goenka Ramnagar hosts Annual Health Camp — 300+ patients served" },
  { type: "placement", text: "Bhawna Thakur placed at Apollo Hospital, Noida" },
  { type: "event", text: "Orientation Day — July 28th, 2025 — Ramnagar Campus" },
  { type: "placement", text: "Vinay Kumar joins Medanta Gurugram — B.Sc Radiology batch 2024" },
  { type: "news", text: "99% Placement record achieved — Batch 2023-24" },
];

const typeColors: Record<TickerItem["type"], string> = {
  placement: "bg-green-500",
  news: "bg-[var(--gold)]",
  update: "bg-blue-500",
  event: "bg-purple-500",
};

interface LiveTickerBarProps {
  items?: TickerItem[];
  className?: string;
}

export function LiveTickerBar({ items = defaultItems, className }: LiveTickerBarProps) {
  // Duplicate items for seamless loop
  const allItems = [...items, ...items];

  return (
    <div
      className={cn(
        "relative h-9 overflow-hidden border-t",
        className
      )}
      style={{
        background: "var(--navy-deeper)",
        borderColor: "rgba(201,167,86,0.2)",
      }}
    >
      {/* Left live badge */}
      <div className="absolute left-0 top-0 z-10 flex h-full items-center gap-2 bg-[var(--navy-deeper)] pl-4 pr-3">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
        </span>
        <span
          className="text-[var(--gold)]"
          style={{ fontSize: "0.65rem", letterSpacing: "0.15em" }}
        >
          LIVE
        </span>
        <span className="h-3 w-px bg-[var(--gold)]/30" />
      </div>

      {/* Scrolling content */}
      <div className="animate-ticker flex h-full items-center whitespace-nowrap">
        {allItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <span className={cn("mx-3 h-1.5 w-1.5 rounded-full", typeColors[item.type])} />
            <span className="text-white/70" style={{ fontSize: "0.78rem" }}>
              {item.text}
            </span>
            {index < allItems.length - 1 && (
              <span className="mx-4 text-white/30">|</span>
            )}
          </div>
        ))}
      </div>

      {/* Right fade mask */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16"
        style={{
          background: "linear-gradient(to left, var(--navy-deeper), transparent)",
        }}
      />

      {/* Left fade mask (after the live badge) */}
      <div
        className="pointer-events-none absolute inset-y-0 left-20 w-8"
        style={{
          background: "linear-gradient(to right, var(--navy-deeper), transparent)",
        }}
      />
    </div>
  );
}

export default LiveTickerBar;
