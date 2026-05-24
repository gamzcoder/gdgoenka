"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import type { Testimonial } from "@/lib/types";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

function Avatar({ testimonial }: { testimonial: Testimonial }) {
  const initials = testimonial.student_name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="avatar-ring h-12 w-12 rounded-full">
      {testimonial.photo_url ? (
        <Image
          src={testimonial.photo_url}
          alt={testimonial.student_name}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full border border-white/20 object-cover"
        />
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--gold-light)] text-sm font-bold text-[var(--navy-deeper)]">
          {initials}
        </div>
      )}
    </div>
  );
}

function Stars() {
  return (
    <div className="flex items-center gap-1 text-[var(--gold-light)]">
      {Array.from({ length: 5 }).map((_, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: [0, 1.2, 1] }}
          transition={{ duration: 0.25, delay: index * 0.08 }}
        >
          ★
        </motion.span>
      ))}
    </div>
  );
}

function Card({ testimonial, featured = false }: { testimonial: Testimonial; featured?: boolean }) {
  return (
    <article
      className={`relative rounded-2xl border border-white/10 bg-white/5 p-5 transition ${
        featured ? "min-h-[310px] bg-white/10 md:p-8" : "min-h-[210px] opacity-85"
      }`}
    >
      {featured ? (
        <p className="pointer-events-none absolute right-3 top-0 font-heading text-[8rem] leading-none text-white/10">“</p>
      ) : null}

      <Stars />
      <p className={`mt-3 italic text-white/85 ${featured ? "text-lg leading-8" : "text-sm leading-7"}`}>
        {testimonial.quote}
      </p>

      <div className="mt-5 flex items-center gap-3">
        <Avatar testimonial={testimonial} />
        <div>
          <p className="text-sm font-semibold text-white">{testimonial.student_name}</p>
          <p className="text-xs text-[var(--gold-light)]">
            {testimonial.course} · {testimonial.hospital}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const hasItems = testimonials.length > 0;

  useEffect(() => {
    if (reduceMotion || paused || testimonials.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [testimonials.length, paused, reduceMotion]);

  const layout = useMemo(() => {
    if (!hasItems) return { featured: null as Testimonial | null, left: null as Testimonial | null, right: null as Testimonial | null };

    const featured = testimonials[activeIndex];
    const left = testimonials[(activeIndex - 1 + testimonials.length) % testimonials.length] ?? null;
    const right = testimonials[(activeIndex + 1) % testimonials.length] ?? null;
    return { featured, left, right };
  }, [hasItems, testimonials, activeIndex]);

  return (
    <section id="testimonials" className="relative overflow-hidden bg-[linear-gradient(160deg,var(--navy-deeper),var(--navy-dark))] px-4 py-14 md:px-8 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(201,167,86,0.12),transparent_50%)]" />
      <div className="relative z-10 mx-auto w-full max-w-6xl" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <SectionHeader
          eyebrow="Student Stories"
          title="What Our Alumni Say"
          accent="Alumni"
          description="Real stories from students who transformed their careers with GD Goenka Healthcare."
          dark
        />

        {layout.featured ? (
          <>
            <motion.div key={layout.featured.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="grid gap-5 lg:grid-cols-[1fr_1.7fr_1fr]">
              {layout.left ? <Card testimonial={layout.left} /> : <div />}
              <Card testimonial={layout.featured} featured />
              {layout.right ? <Card testimonial={layout.right} /> : <div />}
            </motion.div>

            {testimonials.length > 1 ? (
              <div className="mt-6 flex justify-center gap-2">
                {testimonials.map((item, index) => (
                  <button
                    key={item.id || `${item.student_name}-${index}`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                    className={`h-2.5 rounded-full transition ${activeIndex === index ? "w-8 bg-[var(--gold)]" : "w-2.5 bg-white/35 hover:bg-white/50"}`}
                  />
                ))}
              </div>
            ) : null}
          </>
        ) : (
          <p className="text-center text-sm text-white/75">Student testimonials will be updated soon.</p>
        )}
      </div>
    </section>
  );
}
