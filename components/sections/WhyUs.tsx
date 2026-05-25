"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { HealthIcon, whyUsIconMap, type HealthIconName } from "@/components/ui/HealthIcons";
import { whyUsItems } from "@/data/static";
import { scaleUp, staggerContainer } from "@/lib/animations";

export default function WhyUs() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-white px-4 py-14 md:px-8 md:py-20">
      {/* ECG line SVG background */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-6 h-20 w-full opacity-[0.05]"
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,40 L120,40 L140,10 L160,70 L180,10 L200,40 L220,40
             L320,40 L340,10 L360,70 L380,10 L400,40 L420,40
             L520,40 L540,10 L560,70 L580,10 L600,40 L620,40
             L720,40 L740,10 L760,70 L780,10 L800,40 L820,40
             L920,40 L940,10 L960,70 L980,10 L1000,40 L1200,40"
          fill="none"
          stroke="var(--navy)"
          strokeWidth="1.5"
          strokeDasharray="8 4"
        />
      </svg>

      {/* Animated ECG line at the top */}
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
          {whyUsItems.map((item, index) => {
            const iconName = whyUsIconMap[item.title] as HealthIconName | undefined;
            const shouldAnimate = index === 0 || index === 1; // Animate Award and Flask icons

            return (
              <motion.article
                key={item.title}
                variants={scaleUp}
                className="group relative overflow-hidden rounded-2xl border border-[var(--border-navy)] bg-[var(--off-white)] p-6 transition hover:-translate-y-1 hover:shadow-[var(--shadow)]"
              >
                <div className="absolute left-0 top-0 h-[3px] w-0 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] transition-all duration-300 group-hover:w-full" />
                <div className="mb-4 inline-flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  {iconName ? (
                    <HealthIcon
                      name={iconName}
                      size="lg"
                      variant="navy"
                      withBackground
                      bgVariant="navy-pale"
                      animated={shouldAnimate}
                    />
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--navy-pale)] text-lg text-[var(--navy)]">
                      +
                    </div>
                  )}
                </div>
                <h3 className="font-heading text-3xl text-[var(--navy-dark)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{item.description}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
