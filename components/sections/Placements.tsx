"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { useCountUp } from "@/hooks/useCountUp";
import { useScrollReveal } from "@/hooks/useInView";
import type { Placement } from "@/lib/types";

interface PlacementsProps {
  placements: Placement[];
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

      <div className="relative z-10 mx-auto w-full max-w-6xl">
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
        {items.length > 0 ? (
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="placement-marquee flex w-max items-center gap-3 py-2">
              {marqueeItems.map((placement, index) => (
                <article
                  key={`${placement.id}-${placement.hospital_name}-${index}`}
                  aria-hidden={index >= items.length}
                  className="flex min-w-[230px] items-center gap-3 rounded-xl border border-[var(--border-gold)] bg-white px-4 py-3 transition hover:-translate-y-0.5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--navy)] to-[var(--navy-light)] text-xs font-bold text-white">
                    {getInitials(placement.hospital_name)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-dark)]">{placement.hospital_name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{placement.city || "Healthcare Network"}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-sm text-white/75">Placement partners will appear here soon.</p>
        )}
      </div>
    </section>
  );
}
