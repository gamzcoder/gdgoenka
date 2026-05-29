"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { useCountUp } from "@/hooks/useCountUp";
import { useScrollReveal } from "@/hooks/useInView";
import type { Placement } from "@/lib/types";
interface PlacementsProps {
  placements: Placement[];
}
type BoardItem = {
  type: "placement" | "news" | "update" | "event";
  text: string;
};

interface Props {
  items: BoardItem[];
}

const dotColors: Record<BoardItem["type"], string> = {
  placement: "#22c55e",
  news:      "#eab308",
  update:    "#3b82f6",
  event:     "#a855f7",
};

function FlipCard({ item, flipping, nextItem }: {
  item: BoardItem;
  flipping: boolean;
  nextItem: BoardItem | null;
}) {
  const [phase, setPhase] = useState<"idle" | "top-up" | "fall-down">("idle");
  const [displayedItem, setDisplayedItem] = useState(item);
  const [incomingItem, setIncomingItem] = useState<BoardItem | null>(null);

  useEffect(() => {
    if (!flipping || !nextItem) return;

    setIncomingItem(nextItem);
    setPhase("top-up");

    const t1 = setTimeout(() => {
      setPhase("fall-down");
    }, 280);

    const t2 = setTimeout(() => {
      setDisplayedItem(nextItem);
      setIncomingItem(null);
      setPhase("idle");
    }, 620);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [flipping, nextItem]);

  const active = incomingItem ?? displayedItem;
  const oldColor = dotColors[displayedItem.type];
  const newColor = dotColors[(incomingItem ?? displayedItem).type];

  return (
    <div className="relative h-32 overflow-hidden rounded-xl border border-[var(--gold)]/20"
         style={{ perspective: "1000px", background: "linear-gradient(180deg,rgba(255,255,255,0.10) 0%,rgba(255,255,255,0.05) 100%)" }}>

      {/* Static bottom half — always shows new content */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden rounded-b-xl"
           style={{ top: "50%", height: "50%" }}>
        <div className="absolute bottom-0 left-0 right-0 p-3.5"
             style={{ height: "200%", background: "linear-gradient(180deg,rgba(255,255,255,0.10) 0%,rgba(255,255,255,0.05) 100%)", borderRadius: "inherit" }}>
          <Badge color={phase === "idle" ? oldColor : newColor} type={active.type} />
          <p className="line-clamp-3 text-sm leading-relaxed text-white">{active.text}</p>
        </div>
      </div>

      {/* Top half — flips up to reveal new content on the back */}
      <div className="absolute left-0 right-0 overflow-hidden rounded-t-xl"
           style={{
             top: 0, height: "50%",
             transformOrigin: "bottom center",
             transformStyle: "preserve-3d",
             transform: phase === "top-up" ? "rotateX(-90deg)" : "rotateX(0deg)",
             transition: phase === "top-up" ? "transform 0.28s cubic-bezier(0.55,0,1,0.45)" : "none",
             zIndex: 2,
           }}>
        {/* Front — old item */}
        <div className="absolute left-0 right-0 p-3.5"
             style={{ top: 0, height: "200%", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
                      background: "linear-gradient(180deg,rgba(255,255,255,0.10) 0%,rgba(255,255,255,0.05) 100%)", borderRadius: "12px" }}>
          <Badge color={oldColor} type={displayedItem.type} />
          <p className="line-clamp-3 text-sm leading-relaxed text-white">{displayedItem.text}</p>
        </div>
        {/* Back — new item (shown after flip) */}
        <div className="absolute left-0 right-0 p-3.5"
             style={{ top: 0, height: "200%", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
                      transform: "rotateX(180deg)",
                      background: "linear-gradient(180deg,rgba(255,255,255,0.12) 0%,rgba(255,255,255,0.06) 100%)", borderRadius: "12px" }}>
          <Badge color={newColor} type={active.type} />
          <p className="line-clamp-3 text-sm leading-relaxed text-white">{active.text}</p>
        </div>
      </div>

      {/* Falling half — old bottom dropping down */}
      {phase !== "idle" && (
        <div className="absolute left-0 right-0 overflow-hidden rounded-b-xl"
             style={{
               top: "50%", height: "50%",
               transformOrigin: "top center",
               transformStyle: "preserve-3d",
               transform: phase === "fall-down" ? "rotateX(0deg)" : "rotateX(90deg)",
               transition: phase === "fall-down" ? "transform 0.28s cubic-bezier(0,0.55,0.45,1)" : "none",
               zIndex: 3,
             }}>
          <div className="absolute p-3.5"
               style={{ bottom: 0, left: 0, right: 0, height: "200%",
                        background: "linear-gradient(180deg,rgba(255,255,255,0.10) 0%,rgba(255,255,255,0.05) 100%)", borderRadius: "12px" }}>
            <Badge color={oldColor} type={displayedItem.type} />
            <p className="line-clamp-3 text-sm leading-relaxed text-white">{displayedItem.text}</p>
          </div>
        </div>
      )}

      {/* Split line */}
      <div className="pointer-events-none absolute left-0 right-0 top-1/2 z-10 h-px bg-black/30" />
    </div>
  );
}

function Badge({ color, type }: { color: string; type: string }) {
  return (
    <div className="mb-2.5 flex items-center gap-2">
      <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full" style={{ background: color }} />
      <span className="text-[10px] uppercase tracking-[0.2em] text-white/55">{type}</span>
    </div>
  );
}

 function PlacementFlipBoard({ items }: Props) {
  const VISIBLE = 6;
  const [cards, setCards] = useState(items.slice(0, VISIBLE));
  const [flipping, setFlipping] = useState<{ index: number; nextItem: BoardItem } | null>(null);
  const nextIdxRef = useRef(VISIBLE);
  const lastFlippedRef = useRef(-1);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (!items.length) return;

    const interval = setInterval(() => {
      if (pausedRef.current) return;

      let pick: number;
      do { pick = Math.floor(Math.random() * VISIBLE); } while (pick === lastFlippedRef.current);
      lastFlippedRef.current = pick;

      const nextItem = items[nextIdxRef.current % items.length];
      nextIdxRef.current += 1;

      setFlipping({ index: pick, nextItem });

      setTimeout(() => {
        setCards((prev) => {
          const updated = [...prev];
          updated[pick] = nextItem;
          return updated;
        });
        setFlipping(null);
      }, 650);
    }, 2200);

    return () => clearInterval(interval);
  }, [items]);

  return (
    <div
      className="grid gap-4 md:grid-cols-3"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      {cards.map((card, i) => (
        <FlipCard
          key={i}
          item={card}
          flipping={flipping?.index === i}
          nextItem={flipping?.index === i ? flipping.nextItem : null}
        />
      ))}
    </div>
  );
}
const stats = [
  { label: "Placement Rate", target: 99, suffix: "%" },
  { label: "Hospital Partners", target: 500, suffix: "+" },
  { label: "Students Placed", target: 2000, suffix: "+" },
  { label: "Avg. Starting Package", target: 32, prefix: "₹", suffix: "L", decimal: true },
];

function StatCard({
  label,
  target,
  prefix,
  suffix,
  start,
  decimal,
}: {
  label: string;
  target: number;
  prefix?: string;
  suffix?: string;
  start: boolean;
  decimal?: boolean;
}) {
  const count = useCountUp(target, 1500, start);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  const display = decimal ? (count / 10).toFixed(1) : count.toLocaleString("en-IN");

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className="relative rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm"
    >
      <div className="relative mx-auto mb-4 flex h-24 w-24 items-center justify-center">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r={radius} stroke="rgba(255,255,255,0.12)" strokeWidth="5" fill="none" />
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            stroke="var(--gold)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: circumference * 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <p className="font-heading text-4xl leading-none text-[var(--gold-light)]">
          {prefix}
          {display}
          {suffix}
        </p>
      </div>
      <p className="text-xs uppercase tracking-[0.14em] text-white/70">{label}</p>
    </motion.article>
  );
}

export default function Placements({ placements }: PlacementsProps) {
  const items = placements.filter((placement) => placement.hospital_name?.trim());
  const marqueeItems = [...items, ...items];
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { ref, isInView } = useScrollReveal(0.2);

  useEffect(() => {
    if (reduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const dpr = window.devicePixelRatio || 1;

    const setSize = () => {
      const { clientWidth, clientHeight } = canvas;
      canvas.width = clientWidth * dpr;
      canvas.height = clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    type Particle = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
    };

    const particles: Particle[] = Array.from({ length: 20 }, () => ({
      x: Math.random() * canvas.clientWidth,
      y: Math.random() * canvas.clientHeight,
      r: 2 + Math.random() * 2,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      ctx.fillStyle = "rgba(201,167,86,0.35)";

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.clientWidth) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.clientHeight) particle.vy *= -1;

        ctx.globalAlpha = 0.12;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    setSize();
    draw();
    window.addEventListener("resize", setSize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", setSize);
    };
  }, [reduceMotion]);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <section id="placements" ref={ref} className="relative overflow-hidden bg-[var(--navy-deeper)] px-4 py-14 md:px-8 md:py-20">
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-6xl" style={{ perspective: "1200px" }}>
        <SectionHeader
          eyebrow="Career Outcomes"
          title="500+ Placement Partners"
          accent="Placement Partners"
          description="Our students are placed in top hospitals and healthcare networks across India."
          dark
        />

        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} label={stat.label} target={stat.target} prefix={stat.prefix} suffix={stat.suffix} start={isInView} decimal={stat.decimal} />
          ))}
        </div>

        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.16em] text-white/70">Our students work at</p>
        <PlacementFlipBoard
  items={items.map((placement) => ({
    type: "placement",
    text: `${placement.hospital_name} • ${
      placement.city || "Healthcare Network"
    }`,
  }))}
/>
      </div>
    </section>
  );
}
