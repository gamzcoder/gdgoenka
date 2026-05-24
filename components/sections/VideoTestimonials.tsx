"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import VideoCard from "@/components/ui/VideoCard";
import type { VideoTestimonial } from "@/lib/types";

interface VideoTestimonialsProps {
  videos: VideoTestimonial[];
}

export default function VideoTestimonials({ videos }: VideoTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
    };

    window.addEventListener("keydown", onKey);
    closeBtnRef.current?.focus();

    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex]);

  const activeVideo = activeIndex !== null ? videos[activeIndex] : null;

  return (
    <section className="bg-white px-4 py-14 md:px-8 md:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeader
          eyebrow="Student Videos"
          title="Hear It From Them"
          accent="Them"
          description="Real student journeys from classroom training to hospital placements."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {videos.map((video, index) => (
            <VideoCard key={`${video.id}-${video.video_url}-${index}`} video={video} index={index} onOpen={() => setActiveIndex(index)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeVideo ? (
          <motion.div
            className="fixed inset-0 z-[75] flex items-center justify-center bg-black/90 p-4"
            role="dialog"
            aria-modal="true"
            aria-label={`Video testimonial by ${activeVideo.student_name}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIndex(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <video controls autoPlay preload="none" className="aspect-video w-full bg-black">
                <source src={activeVideo.video_url} type="video/mp4" />
              </video>
              <div className="bg-[rgba(9,29,71,0.95)] px-4 py-3 text-white">
                <p className="text-sm font-semibold">{activeVideo.student_name}</p>
                <p className="text-xs text-[var(--gold-light)]">{activeVideo.course}</p>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => setActiveIndex(null)}
                className="absolute right-3 top-3 rounded-full bg-black/55 p-2 text-white"
                aria-label="Close video testimonial"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
