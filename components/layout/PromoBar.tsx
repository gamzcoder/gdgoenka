"use client";

import { useMemo } from "react";

const DEADLINE_ISO = "2026-07-15";

export default function PromoBar() {
  const countdown = useMemo(() => {
    const now = new Date();
    const deadline = new Date(`${DEADLINE_ISO}T23:59:59`);
    const diff = deadline.getTime() - now.getTime();
    if (diff <= 0) return null;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return `${days} days left`;
  }, []);

  const message = `Admissions Open 2025-26 • 10% Scholarship Available${countdown ? ` • ${countdown}` : ""}`;

  return (
    <div className="relative overflow-hidden bg-[var(--navy-deeper)] px-4 py-2 text-[11px] text-white/85">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 overflow-hidden">
        <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(26,140,91,0.16)] px-2.5 py-1 font-semibold uppercase tracking-[0.12em] text-emerald-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400 [animation:breathe_2s_ease-in-out_infinite]" />
          Admissions Open
        </span>

        <div className="flex-1 overflow-hidden whitespace-nowrap">
          <div className="promo-marquee-track gap-8">
            <span>{message}</span>
            <span aria-hidden="true">{message}</span>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
    </div>
  );
}
