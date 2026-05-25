"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, GraduationCap, BookOpen, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Course } from "@/lib/types";

interface CoursePathCarouselProps {
  courses: Course[];
  className?: string;
}

const typeConfig = {
  Degree: {
    icon: <GraduationCap size={14} />,
    color: "bg-[var(--navy)]",
    textColor: "text-white",
  },
  Diploma: {
    icon: <BookOpen size={14} />,
    color: "bg-[var(--gold)]",
    textColor: "text-[var(--navy-deeper)]",
  },
  Certificate: {
    icon: <Award size={14} />,
    color: "bg-[var(--navy-light)]",
    textColor: "text-white",
  },
};

export function CoursePathCarousel({ courses, className }: CoursePathCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = 260; // card width + gap
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Group and sort courses by type
  const sortedCourses = [...courses].sort((a, b) => {
    const order = { Degree: 0, Diploma: 1, Certificate: 2 };
    return order[a.type] - order[b.type];
  });

  return (
    <section className={cn("bg-white px-4 py-14 md:px-8 md:py-20", className)}>
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
          {/* Left sticky panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0 lg:sticky lg:top-32 lg:w-[300px]"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--gold)]">
              Find Your Path
            </p>
            <h2 className="font-heading text-3xl text-[var(--navy-dark)] md:text-4xl">
              Degree vs. Diploma:
              <span className="block text-[var(--navy)]">Choose Wisely</span>
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
              Explore our healthcare courses and find the perfect match for your career goals, 
              timeline, and aspirations.
            </p>

            {/* Navigation arrows */}
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => scroll("left")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-navy)] text-[var(--navy)] transition hover:bg-[var(--navy-pale)]"
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-navy)] text-[var(--navy)] transition hover:bg-[var(--navy-pale)]"
                aria-label="Scroll right"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <a
              href="#courses"
              className="mt-6 inline-block rounded-lg border border-[var(--navy)] px-5 py-2.5 text-sm font-medium text-[var(--navy)] transition hover:bg-[var(--navy)] hover:text-white"
            >
              Explore All Courses
            </a>
          </motion.div>

          {/* Carousel */}
          <div className="relative flex-1 overflow-hidden">
            {/* Fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent lg:hidden" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent" />

            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide"
              style={{
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {sortedCourses.map((course, index) => {
                const config = typeConfig[course.type];

                return (
                  <motion.article
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(18,56,132,0.12)" }}
                    className="relative flex w-[240px] flex-shrink-0 flex-col overflow-hidden rounded-2xl border border-[var(--border-navy)] bg-white"
                    style={{ scrollSnapAlign: "start" }}
                  >
                    {/* Image placeholder with gradient */}
                    <div className="relative h-36 overflow-hidden bg-gradient-to-br from-[var(--navy-deeper)] to-[var(--navy-light)]">
                      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_12px)]" />
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--gold)]/30 to-transparent" />
                      
                      {/* Type badge */}
                      <div
                        className={cn(
                          "absolute left-3 top-3 flex items-center gap-1.5 rounded-full px-2.5 py-1",
                          config.color,
                          config.textColor
                        )}
                      >
                        {config.icon}
                        <span className="text-[10px] font-semibold">{course.type}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="font-heading text-lg leading-tight text-[var(--navy-dark)]">
                        {course.name}
                      </h3>
                      <p className="mt-2 flex-1 text-xs leading-relaxed text-[var(--text-muted)]">
                        {course.description.length > 80
                          ? `${course.description.slice(0, 80)}...`
                          : course.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-[var(--text-muted)]">
                          {course.duration}
                        </span>
                        <a
                          href="#courses"
                          className="text-xs font-medium text-[var(--navy)] underline-offset-2 hover:underline"
                        >
                          Learn More
                        </a>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CoursePathCarousel;
