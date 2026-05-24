"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import GalleryItem from "@/components/ui/GalleryItem";
import SectionHeader from "@/components/ui/SectionHeader";
import { galleryCategories } from "@/data/static";
import type { GalleryCategory, GalleryItem as GalleryItemType } from "@/lib/types";

interface GalleryProps {
  items: GalleryItemType[];
}

export default function Gallery({ items }: GalleryProps) {
  const [active, setActive] = useState<GalleryCategory>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const tabRefs = useRef<Record<GalleryCategory, HTMLButtonElement | null>>({
    All: null,
    Labs: null,
    Classrooms: null,
    Campus: null,
    Events: null,
  });

  const filtered = useMemo(() => {
    if (active === "All") return items;
    return items.filter((item) => item.category === active);
  }, [active, items]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const activeButton = tabRefs.current[active];
    if (!container || !activeButton) return;

    const containerRect = container.getBoundingClientRect();
    const activeRect = activeButton.getBoundingClientRect();
    setIndicator({ left: activeRect.left - containerRect.left, width: activeRect.width });
  }, [active]);

  useEffect(() => {
    setLightboxIndex(null);
  }, [active]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowRight") {
        if (filtered.length === 0) return;
        setLightboxIndex((prev) => {
          if (prev === null) return prev;
          return (prev + 1) % filtered.length;
        });
      }
      if (event.key === "ArrowLeft") {
        if (filtered.length === 0) return;
        setLightboxIndex((prev) => {
          if (prev === null) return prev;
          return (prev - 1 + filtered.length) % filtered.length;
        });
      }
    };

    window.addEventListener("keydown", onKey);
    closeBtnRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, filtered.length]);

  const activeItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <section id="gallery" className="bg-[var(--off-white)] px-4 py-14 md:px-8 md:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeader
          eyebrow="Campus Life"
          title="Our Facilities & Campus"
          accent="Facilities"
          description="Explore our modern labs, classrooms, and student learning spaces."
        />

        <div ref={containerRef} className="relative mx-auto mb-6 flex w-fit flex-wrap justify-center gap-1 rounded-full border border-[var(--border-navy)] bg-white p-1">
          <motion.div
            aria-hidden="true"
            className="absolute bottom-1 top-1 rounded-full bg-[var(--gold-pale)]"
            animate={{ left: indicator.left, width: indicator.width }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          />
          {galleryCategories.map((tab) => (
            <button
              key={tab}
              ref={(node) => {
                tabRefs.current[tab] = node;
              }}
              type="button"
              onClick={() => setActive(tab)}
              className={`relative z-10 rounded-full px-4 py-2 text-sm transition ${
                active === tab ? "text-[var(--navy)]" : "text-[var(--text-muted)] hover:text-[var(--navy)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }} className="columns-1 gap-3 md:columns-2 lg:columns-3">
          {filtered.map((item, index) => (
            <GalleryItem key={`${item.id}-${item.image_url}-${index}`} item={item} index={index} onClick={() => setLightboxIndex(index)} />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {activeItem ? (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4"
            role="dialog"
            aria-modal="true"
            aria-label={`Gallery image: ${activeItem.caption}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              {activeItem.image_url ? (
                <div className="relative aspect-[16/10] w-full">
                  <Image src={activeItem.image_url} alt={activeItem.caption} fill sizes="90vw" className="object-contain" />
                </div>
              ) : (
                <div className="aspect-[16/10] w-full bg-[linear-gradient(120deg,var(--navy-deeper),var(--navy),var(--gold-dark))]" />
              )}

              <div className="flex items-center justify-between gap-2 bg-[rgba(9,29,71,0.92)] px-4 py-3 text-white">
                <p className="text-sm font-semibold">{activeItem.caption}</p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="rounded-full border border-white/25 px-3 py-1 text-xs"
                    onClick={() =>
                      setLightboxIndex((prev) => {
                        if (filtered.length === 0) return null;
                        if (prev === null) return prev;
                        return (prev - 1 + filtered.length) % filtered.length;
                      })
                    }
                    aria-label="Previous image"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-white/25 px-3 py-1 text-xs"
                    onClick={() =>
                      setLightboxIndex((prev) => {
                        if (filtered.length === 0) return null;
                        if (prev === null) return prev;
                        return (prev + 1) % filtered.length;
                      })
                    }
                    aria-label="Next image"
                  >
                    →
                  </button>
                </div>
              </div>

              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="absolute right-3 top-3 rounded-full bg-black/55 p-2 text-white"
                aria-label="Close gallery lightbox"
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
