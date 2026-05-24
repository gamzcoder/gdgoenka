"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import CourseCard from "@/components/ui/CourseCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";
import type { Course } from "@/lib/types";

interface CoursesProps {
  courses: Course[];
}

type CourseFilter = "All" | Course["type"];

const filters: CourseFilter[] = ["All", "Degree", "Diploma", "Certificate"];

export default function Courses({ courses }: CoursesProps) {
  const [activeFilter, setActiveFilter] = useState<CourseFilter>("All");
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<CourseFilter, HTMLButtonElement | null>>({
    All: null,
    Degree: null,
    Diploma: null,
    Certificate: null,
  });

  const filteredCourses = useMemo(() => {
    if (activeFilter === "All") return courses;
    return courses.filter((course) => course.type === activeFilter);
  }, [activeFilter, courses]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const activeButton = tabRefs.current[activeFilter];
    if (!container || !activeButton) return;

    const containerRect = container.getBoundingClientRect();
    const activeRect = activeButton.getBoundingClientRect();

    setIndicator({
      left: activeRect.left - containerRect.left,
      width: activeRect.width,
    });
  }, [activeFilter]);

  return (
    <section id="courses" className="bg-[var(--off-white)] px-4 py-14 md:px-8 md:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeader
          eyebrow="Academic Programs"
          title="Our Courses"
          accent="Courses"
          description="Degree and diploma programs aligned with the needs of modern healthcare."
        />

        <div ref={containerRef} className="relative mx-auto mb-8 flex w-fit flex-wrap items-center justify-center gap-1 rounded-full border border-[var(--border-navy)] bg-white p-1">
          <motion.div
            aria-hidden="true"
            className="absolute bottom-1 top-1 rounded-full bg-[var(--gold-pale)]"
            animate={{ left: indicator.left, width: indicator.width }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          />
          {filters.map((tab) => (
            <button
              key={tab}
              ref={(node) => {
                tabRefs.current[tab] = node;
              }}
              type="button"
              onClick={() => setActiveFilter(tab)}
              className={`relative z-10 rounded-full px-4 py-2 text-sm font-medium transition ${
                activeFilter === tab ? "text-[var(--navy)]" : "text-[var(--text-muted)] hover:text-[var(--navy)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
            variants={staggerContainer}
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredCourses.map((course, index) => (
              <motion.div key={course.id || `${course.name}-${index}`} variants={staggerItem} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
                <CourseCard course={course} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredCourses.length === 0 ? (
          <motion.p variants={fadeUp} initial="hidden" animate="visible" className="mt-4 text-center text-sm text-[var(--text-muted)]">
            No courses available in this category yet.
          </motion.p>
        ) : null}
      </div>
    </section>
  );
}
