"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import LeadForm from "@/components/ui/LeadForm";
import { HealthIcon, type HealthIconName } from "@/components/ui/HealthIcons";
import {
  fadeIn,
  fadeUp,
  slideInRight,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";
import { useCountUp } from "@/hooks/useCountUp";
import type { Course } from "@/lib/types";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface HeroProps {
  courses: Course[];
}

interface SlideData {
  icon: HealthIconName;
  badge: string;
  badgeStyle: React.CSSProperties;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  gradientFrom: string;
  gradientTo: string;
}

// ─── Slides — edit freely ──────────────────────────────────────────────────────

const SLIDES: SlideData[] = [
  {
    icon: "flask",
    badge: "Degree · 3 Years",
    badgeStyle: { background: "rgba(201,167,86,0.88)", color: "#091d47", fontWeight: 700 },
    title: "B.Sc Medical Lab Technology",
    description: "World-class lab training with the latest diagnostic equipment.",
    stat: "99%",
    statLabel: "Placement",
    gradientFrom: "#1a3f8f",
    gradientTo: "#123884",
  },
  {
    icon: "radiation",
    badge: "Degree · 3 Years",
    badgeStyle: { background: "rgba(201,167,86,0.88)", color: "#091d47", fontWeight: 700 },
    title: "B.Sc Radiology & Imaging Technology",
    description: "Advanced imaging labs with CT simulation and ultrasound units.",
    stat: "98%",
    statLabel: "Placement",
    gradientFrom: "#0c2a63",
    gradientTo: "#1a3f8f",
  },
  {
    icon: "heart",
    badge: "Diploma · 1 Year",
    badgeStyle: { background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)" },
    title: "Diploma in Nursing Assistant",
    description: "Comprehensive patient-care training across clinical settings.",
    stat: "99%",
    statLabel: "Placement",
    gradientFrom: "#8B6914",
    gradientTo: "#c9a756",
  },
  {
    icon: "activity",
    badge: "Diploma · 2 Years",
    badgeStyle: { background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)" },
    title: "Diploma in Physiotherapy",
    description: "Hands-on rehabilitation and musculoskeletal training.",
    stat: "97%",
    statLabel: "Placement",
    gradientFrom: "#0f2d70",
    gradientTo: "#1e4fa0",
  },
];

const FACE_COUNT = 4;
const ANGLES = [0, -90, -180, -270];

// ─── Stat counter ──────────────────────────────────────────────────────────────

function Stat({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const count = useCountUp(value, 1400, true);
  return (
    <div className="px-4 py-2 text-center first:pl-0 last:pr-0">
      <p className="font-heading text-4xl leading-none text-[var(--gold-light)] md:text-5xl">
        {count}{suffix}
      </p>
      <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-white/70">{label}</p>
    </div>
  );
}

// ─── Single cube face ───────────────────────────────────────────────────────────

function CubeFace({
  slide,
  rotateYDeg,
  halfSize,
}: {
  slide: SlideData;
  rotateYDeg: number;
  halfSize: number;
}) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.10)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        background: `linear-gradient(145deg, ${slide.gradientFrom}, ${slide.gradientTo})`,
        transform: `rotateY(${rotateYDeg}deg) translateZ(${halfSize}px)`,
      }}
    >
      {/* watermark icon */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.1, pointerEvents: "none" }}>
        <HealthIcon name={slide.icon} size="xl" variant="white" />
      </div>

      {/* badge */}
      <div style={{ position: "absolute", top: 12, left: 12 }}>
        <span style={{ display: "inline-block", borderRadius: 999, padding: "3px 10px", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", ...slide.badgeStyle }}>
          {slide.badge}
        </span>
      </div>

      {/* stat chip */}
      <div style={{ position: "absolute", top: 12, right: 12, display: "flex", flexDirection: "column", alignItems: "center", borderRadius: 10, border: "1px solid rgba(255,255,255,0.2)", background: "rgba(0,0,0,0.30)", padding: "6px 10px", textAlign: "center", backdropFilter: "blur(8px)" }}>
        <span style={{ fontFamily: "Georgia,serif", fontSize: 20, fontWeight: 700, lineHeight: 1, color: "var(--gold-light)" }}>{slide.stat}</span>
        <span style={{ marginTop: 2, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>{slide.statLabel}</span>
      </div>

      {/* content */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 18px 18px" }}>
        <p style={{ fontFamily: "Georgia,serif", fontSize: 15, fontWeight: 700, lineHeight: 1.28, color: "#fff", margin: 0 }}>{slide.title}</p>
        <p style={{ marginTop: 6, fontSize: 11, lineHeight: 1.55, color: "rgba(255,255,255,0.62)" }}>{slide.description}</p>
        <button style={{ marginTop: 10, display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 600, color: "var(--gold-light)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          View details →
        </button>
      </div>
    </div>
  );
}

// ─── Cube carousel — rendered client-only via dynamic() ────────────────────────

function CubeCarouselInner() {
  const [current, setCurrent] = useState(0);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dragStartX = useRef(0);
  const dragging = useRef(false);
  const reduceMotion = useReducedMotion();

  const SIZE = 240;
  const HALF = SIZE / 2;

  const goTo = useCallback((idx: number) => {
    setCurrent(((idx % FACE_COUNT) + FACE_COUNT) % FACE_COUNT);
  }, []);

  const startAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => setCurrent((c) => (c + 1) % FACE_COUNT), 3600);
  }, []);

  useEffect(() => {
    startAuto();
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [startAuto]);

  const nav = useCallback((dir: 1 | -1) => {
    if (autoRef.current) clearInterval(autoRef.current);
    setCurrent((c) => ((c + dir) % FACE_COUNT + FACE_COUNT) % FACE_COUNT);
    startAuto();
  }, [startAuto]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>

      {/* scene */}
      <div
        style={{ width: SIZE, height: SIZE, perspective: 700, userSelect: "none" }}
        onMouseDown={(e) => { dragging.current = false; dragStartX.current = e.clientX; }}
        onMouseMove={(e) => { if (Math.abs(e.clientX - dragStartX.current) > 4) dragging.current = true; }}
        onMouseUp={(e) => { if (dragging.current && Math.abs(e.clientX - dragStartX.current) > 36) nav(e.clientX - dragStartX.current < 0 ? 1 : -1); }}
        onTouchStart={(e) => { dragStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - dragStartX.current; if (Math.abs(dx) > 36) nav(dx < 0 ? 1 : -1); }}
      >
        <motion.div
          style={{ width: SIZE, height: SIZE, position: "relative", transformStyle: "preserve-3d" }}
          animate={{ rotateY: reduceMotion ? 0 : ANGLES[current] }}
          transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
        >
          {SLIDES.map((slide, i) => (
            <CubeFace key={i} slide={slide} rotateYDeg={i * 90} halfSize={HALF} />
          ))}
        </motion.div>
      </div>

      {/* hint */}
      <p style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", margin: 0 }}>
        swipe or use arrows
      </p>

      {/* controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button onClick={() => nav(-1)} aria-label="Previous course" style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>

        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => { if (autoRef.current) clearInterval(autoRef.current); goTo(i); startAuto(); }} aria-label={`Slide ${i + 1}`}
            style={{ height: 7, width: current === i ? 20 : 7, borderRadius: 999, background: current === i ? "var(--gold)" : "rgba(255,255,255,0.25)", border: "none", padding: 0, cursor: "pointer", transition: "width 0.3s ease, background 0.3s ease" }}
          />
        ))}

        <button onClick={() => nav(1)} aria-label="Next course" style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>

      {/* animated slide label */}
      <AnimatePresence mode="wait">
        <motion.p key={current} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.28 }}
          style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", color: "var(--gold-light)", textAlign: "center", margin: 0, maxWidth: 220 }}>
          {SLIDES[current].title}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

// dynamic() with ssr:false is the definitive fix for hydration mismatches
// in interactive components that depend on browser state
export const CubeCarousel = dynamic(() => Promise.resolve(CubeCarouselInner), {
  ssr: false,
  loading: () => (
    <div style={{ width: 240, height: 310, borderRadius: 16, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid var(--gold)", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
    </div>
  ),
});

// ─── Hero ───────────────────────────────────────────────────────────────────────

export default function Hero({ courses }: HeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-4 py-12 md:px-8 md:py-16">

      <div className="absolute inset-0 bg-[var(--navy-deeper)]" />
      <div className="hero-gradshift absolute inset-0 bg-[radial-gradient(circle_at_20%_24%,rgba(223,192,126,0.25),transparent_45%),radial-gradient(circle_at_82%_18%,rgba(30,79,160,0.42),transparent_45%),linear-gradient(130deg,var(--navy-deeper),var(--navy-dark),var(--navy))]" />
      <div className="pointer-events-none absolute inset-0 opacity-10 [background-image:radial-gradient(rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="pointer-events-none absolute -right-24 top-[16%] h-[420px] w-[420px] rounded-full border border-white/10 opacity-35" />
      <div className="pointer-events-none absolute -right-12 top-[22%] h-[340px] w-[340px] text-[320px] leading-none text-white/5">✚</div>

      <div className="pointer-events-none absolute left-[5%] top-[15%] opacity-[0.06]">
        <HealthIcon name="dna" size="xl" className="animate-spin-slow" withBackground variant="white" bgVariant="gold-pale" />
      </div>
      <div className="pointer-events-none absolute left-[12%] bottom-[20%] opacity-[0.045]">
        <HealthIcon name="stethoscope" size="lg" withBackground variant="white" bgVariant="gold" />
      </div>
      <div className="pointer-events-none absolute right-[8%] bottom-[25%] opacity-[0.055]">
        <HealthIcon name="dna" size="lg" className="animate-spin-slow" withBackground variant="white" bgVariant="gold-pale" style={{ animationDirection: "reverse" }} />
      </div>
      <div className="pointer-events-none absolute left-[25%] top-[8%] opacity-[0.04]">
        <HealthIcon name="stethoscope" size="md" withBackground variant="white" bgVariant="gold" />
      </div>
      <div className="pointer-events-none absolute right-[35%] top-[12%] hidden opacity-[0.05] lg:block">
        <HealthIcon name="heart-pulse" size="md" className="animate-heartbeat" withBackground variant="white" bgVariant="gold-pale" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1fr_auto] lg:items-start lg:pt-8"
      >
        {/* left copy */}
        <div>
          <motion.p variants={fadeUp} className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--gold-light)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" /> Admissions Open 2025-26
          </motion.p>

          <motion.h1 variants={fadeUp} className="font-heading text-[2.6rem] leading-[1.06] text-white md:text-[4rem]">
            Build Your Career in
            <span className="block text-[var(--gold-light)]">Healthcare With Confidence</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-light)]">
            GD Goenka Healthcare Academy, Ramnagar combines 30+ years of academic excellence with practical training, expert faculty, and strong placement outcomes across India.
          </motion.p>

          <motion.div variants={staggerContainer} className="mt-8 flex flex-wrap gap-3">
            <motion.a href="#courses" variants={staggerItem} className="rounded-lg bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] px-6 py-3 text-sm font-bold text-[var(--navy-deeper)]">
              Explore Courses →
            </motion.a>
            <motion.a href="#placements" variants={staggerItem} className="rounded-lg border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white">
              View Placements
            </motion.a>
          </motion.div>

          <motion.div variants={fadeIn} className="mt-8 flex flex-wrap items-center divide-x divide-[var(--gold)]/30 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm">
            <Stat value={30} suffix="+" label="Years" />
            <Stat value={99} suffix="%" label="Placement" />
            <Stat value={500} suffix="+" label="Partners" />
          </motion.div>

          <motion.div variants={fadeIn} className="mt-6 flex items-center gap-4">
            <div className="flex -space-x-2">
              {(
                [
                  ["MK", "from-[var(--gold-dark)] to-[var(--gold)]"],
                  ["RS", "from-[var(--navy)] to-[var(--navy-light)]"],
                  ["PT", "from-[var(--gold)] to-[var(--gold-light)]"],
                  ["VK", "from-[var(--navy-dark)] to-[var(--navy)]"],
                ] as [string, string][]
              ).map(([initials, gradient]) => (
                <div key={initials} className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-[var(--navy-deeper)] bg-gradient-to-br text-[10px] font-bold text-white ${gradient}`}>
                  {initials}
                </div>
              ))}
            </div>
            <p className="text-sm text-white/75">
              <span className="block font-semibold text-white">2,000+ Students Placed</span>
              across India&apos;s top hospitals
            </p>
          </motion.div>
        </div>

        {/* right: cube + form */}
        <motion.div variants={slideInRight} transition={{ delay: 0.3 }} className="flex flex-col items-center gap-6 lg:items-end">

          <CubeCarousel />

          <div className="relative w-full max-w-sm rounded-[20px] bg-[var(--surface)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.22)]">
            {/* <div className="absolute -top-3 right-4 rounded-full border border-[var(--border-gold)] bg-[var(--gold-glow)] px-3 py-1 text-[11px] font-semibold text-[var(--navy-dark)] [animation:bob_3s_ease-in-out_infinite]">
              Next batch starts: July 2026
            </div> */}
            <h2 className="font-heading text-3xl text-[var(--navy-dark)]">Get Free Counselling</h2>
            <p className="mb-4 mt-1 text-sm text-[var(--text-muted)]">Our advisors will call you back within 24 hours.</p>
            <LeadForm courses={courses} source="Hero Form" submitLabel="Apply For Counselling" />
            <div className="mt-4 grid grid-cols-1 gap-2 text-[11px] text-[var(--text-muted)] sm:grid-cols-3">
              <p className="rounded-md bg-[var(--gold-pale)] px-2 py-1 text-center">🔒 Confidential</p>
              <p className="rounded-md bg-[var(--gold-pale)] px-2 py-1 text-center">✓ Call back in 24hrs</p>
              <p className="rounded-md bg-[var(--gold-pale)] px-2 py-1 text-center">✓ No spam calls</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {!reduceMotion && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[rgba(9,29,71,0.5)] to-transparent" />
      )}
    </section>
  );
}
