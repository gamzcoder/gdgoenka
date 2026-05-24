"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { whyUsItems } from "@/data/static";
import { scaleUp, staggerContainer } from "@/lib/animations";

export default function WhyUs() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-white px-4 py-14 md:px-8 md:py-20">
      <svg className="pointer-events-none absolute inset-x-0 top-8 h-24 w-full opacity-[0.06]" viewBox="0 0 1200 120" aria-hidden="true">
        <motion.path
          d="M0 65 H120 L150 65 L180 20 L210 96 L240 65 H360 L390 65 L420 42 L450 88 L480 65 H690 L720 65 L750 28 L780 92 L810 65 H1080 L1110 65 L1140 52 L1170 80 L1200 65"
          fill="none"
          stroke="var(--navy)"
          strokeWidth="3"
          strokeDasharray="16 10"
          initial={false}
          animate={reduceMotion ? undefined : { strokeDashoffset: [-300, 0] }}
          transition={{ duration: 8, ease: "linear", repeat: Infinity }}
        />
      </svg>

      <div className="mx-auto w-full max-w-6xl">
        <SectionHeader
          eyebrow="Why Choose Us"
          title="The GD Goenka Difference"
          accent="GD Goenka"
          description="Three decades of producing healthcare professionals with strong practical training and industry connect."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {whyUsItems.map((item) => (
            <motion.article
              key={item.title}
              variants={scaleUp}
              className="group relative overflow-hidden rounded-2xl border border-[var(--border-navy)] bg-[var(--off-white)] p-6 transition hover:-translate-y-1 hover:shadow-[var(--shadow)]"
            >
              <div className="absolute left-0 top-0 h-[3px] w-0 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] transition-all duration-300 group-hover:w-full" />
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--navy-pale)] text-lg text-[var(--navy)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--navy-light)] group-hover:text-white">
                ✚
              </div>
              <h3 className="font-heading text-3xl text-[var(--navy-dark)]">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{item.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
