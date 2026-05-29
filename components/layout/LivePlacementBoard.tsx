"use client";

import { useEffect, useState } from "react";
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

const typeColors = {
  placement: "bg-green-500",
  news: "bg-yellow-500",
  update: "bg-blue-500",
  event: "bg-purple-500",
};

const typeLabels = {
  placement: "PLACEMENT",
  news: "NEWS",
  update: "UPDATE",
  event: "EVENT",
};

interface Props {
  items?: TickerItem[];
  className?: string;
}

export default function LivePlacementBoard({
  items = defaultItems,
  className,
}: Props) {
  const visibleCount = 6;

  const [cards, setCards] = useState(
    items.slice(0, visibleCount).map((item, index) => ({
      item,
      flipping: false,
      slot: index,
    }))
  );

  const [nextIndex, setNextIndex] = useState(visibleCount);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prev) =>
        prev.map((card, index) => ({
          ...card,
          flipping: index === activeCard,
        }))
      );

      setTimeout(() => {
        setCards((prev) =>
          prev.map((card, index) => {
            if (index !== activeCard) return card;

            return {
              ...card,
              item: items[nextIndex % items.length],
              flipping: false,
            };
          })
        );

        setNextIndex((prev) => (prev + 1) % items.length);
        setActiveCard((prev) => (prev + 1) % visibleCount);
      }, 350);
    }, 2500);

    return () => clearInterval(interval);
  }, [activeCard, items, nextIndex]);

  return (
    <section
      className={cn(
        "border-y px-4 py-4",
        className
      )}
      style={{
        background: "var(--navy-deeper)",
        borderColor: "rgba(201,167,86,0.15)",
      }}
    >
      <div className="mb-4 flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
        </span>

        <span
          className="font-semibold tracking-[0.2em] text-[var(--gold)]"
          style={{ fontSize: "0.75rem" }}
        >
          LIVE PLACEMENTS & UPDATES
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card, index) => (
          <div
            key={index}
            className="perspective-[1200px]"
          >
            <div
              className={cn(
                "h-[90px] rounded-xl border p-3 transition-all duration-500",
                card.flipping
                  ? "rotate-x-90 opacity-0"
                  : "rotate-x-0 opacity-100"
              )}
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(201,167,86,0.15)",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="mb-2 flex items-center gap-2">
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    typeColors[card.item.type]
                  )}
                />

                <span
                  className="text-[10px] font-medium tracking-wider text-white/50"
                >
                  {typeLabels[card.item.type]}
                </span>
              </div>

              <p className="line-clamp-3 text-sm text-white/85">
                {card.item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}