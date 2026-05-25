"use client";

import { motion, useReducedMotion } from "framer-motion";
import LeadForm from "@/components/ui/LeadForm";
import { fadeIn, fadeUp, slideInRight, staggerContainer, staggerItem } from "@/lib/animations";
import { useCountUp } from "@/hooks/useCountUp";
import type { Course } from "@/lib/types";
import { HealthIcon } from "@/components/ui/HealthIcons";

interface HeroProps {
  courses: Course[];
}

function Stat({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const count = useCountUp(value, 1400, true);

  return (
    <div className="px-4 py-2 text-center first:pl-0 last:pr-0">
      <p className="font-heading text-4xl leading-none text-[var(--gold-light)] md:text-5xl">
        {count}
        {suffix}
      </p>
      <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-white/70">{label}</p>
    </div>
  );
}

export default function Hero({ courses }: HeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-4 py-12 md:px-8 md:py-16">
      <div className="absolute inset-0 bg-[var(--navy-deeper)]" />
      <div className="hero-gradshift absolute inset-0 bg-[radial-gradient(circle_at_20%_24%,rgba(223,192,126,0.25),transparent_45%),radial-gradient(circle_at_82%_18%,rgba(30,79,160,0.42),transparent_45%),linear-gradient(130deg,var(--navy-deeper),var(--navy-dark),var(--navy))]" />
      <div className="pointer-events-none absolute inset-0 opacity-10 [background-image:radial-gradient(rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="pointer-events-none absolute -right-24 top-[16%] h-[420px] w-[420px] rounded-full border border-white/10 opacity-35" />
      <div className="pointer-events-none absolute -right-12 top-[22%] h-[340px] w-[340px] text-[320px] leading-none text-white/5">✚</div>

      {/* Background Healthcare Icons */}
      <div className="pointer-events-none absolute left-[5%] top-[15%] opacity-[0.06]">
        <HealthIcon name="dna" size="xl" className="animate-spin-slow" withBackground variant="black" bgVariant="gold-pale" />
      </div>
      <div className="pointer-events-none absolute left-[12%] bottom-[20%] opacity-[0.045]">
        <HealthIcon name="stethoscope" size="lg" withBackground variant="black" bgVariant="gold" />
      </div>
      <div className="pointer-events-none absolute right-[8%] bottom-[25%] opacity-[0.055]">
        <HealthIcon
          name="dna"
          size="lg"
          className="animate-spin-slow"
          withBackground
          variant="black"
          bgVariant="gold-pale"
          style={{ animationDirection: "reverse" }}
        />
      </div>
      <div className="pointer-events-none absolute left-[25%] top-[8%] opacity-[0.04]">
        <HealthIcon name="stethoscope" size="md" withBackground variant="black" bgVariant="gold" />
      </div>
      <div className="pointer-events-none absolute right-[35%] top-[12%] hidden opacity-[0.05] lg:block">
        <HealthIcon name="heart-pulse" size="md" className="animate-heartbeat" withBackground variant="black" bgVariant="gold-pale" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1fr_390px] lg:items-center"
      >
        <div>
          <motion.p variants={fadeUp} className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--gold-light)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" /> Admissions Open 2025-26
          </motion.p>

          <motion.h1 variants={fadeUp} className="font-heading text-[2.6rem] leading-[1.06] text-white md:text-[4rem]">
            Build Your Career in
            <span className="block text-[var(--gold-light)]">Healthcare With Confidence</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-light)]">
            GD Goenka Healthcare Academy, Ramnagar combines 30+ years of academic excellence with practical training,
            expert faculty, and strong placement outcomes across India.
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
              {[
                ["MK", "from-[var(--gold-dark)] to-[var(--gold)]"],
                ["RS", "from-[var(--navy)] to-[var(--navy-light)]"],
                ["PT", "from-[var(--gold)] to-[var(--gold-light)]"],
                ["VK", "from-[var(--navy-dark)] to-[var(--navy)]"],
              ].map(([name, gradient]) => (
                <div key={name} className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-[var(--navy-deeper)] bg-gradient-to-br text-[10px] font-bold text-white ${gradient}`}>
                  {name}
                </div>
              ))}
            </div>
            <p className="text-sm text-white/75">
              <span className="block font-semibold text-white">2,000+ Students Placed</span>
              across India&apos;s top hospitals
            </p>
          </motion.div>
        </div>

        <motion.aside
          variants={slideInRight}
          transition={{ delay: 0.3 }}
          className="relative rounded-[20px] bg-[var(--surface)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.22)]"
        >
          <div className="absolute -top-3 right-4 rounded-full border border-[var(--border-gold)] bg-[var(--gold-glow)] px-3 py-1 text-[11px] font-semibold text-[var(--navy-dark)] [animation:bob_3s_ease-in-out_infinite]">
            Next batch starts: July 2026
          </div>
          <h2 className="font-heading text-3xl text-[var(--navy-dark)]">Get Free Counselling</h2>
          <p className="mb-4 mt-1 text-sm text-[var(--text-muted)]">Our advisors will call you back within 24 hours.</p>
          <LeadForm courses={courses} source="Hero Form" submitLabel="Apply For Counselling" />
          <div className="mt-4 grid grid-cols-1 gap-2 text-[11px] text-[var(--text-muted)] sm:grid-cols-3">
            <p className="rounded-md bg-[var(--gold-pale)] px-2 py-1 text-center">🔒 Confidential</p>
            <p className="rounded-md bg-[var(--gold-pale)] px-2 py-1 text-center">✓ Call back in 24hrs</p>
            <p className="rounded-md bg-[var(--gold-pale)] px-2 py-1 text-center">✓ No spam calls</p>
          </div>
        </motion.aside>
      </motion.div>

      {!reduceMotion ? <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[rgba(9,29,71,0.5)] to-transparent" /> : null}
    </section>
  );
}
