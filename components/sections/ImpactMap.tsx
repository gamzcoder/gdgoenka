"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface PlacementLocation {
  city: string;
  lat: number;
  lng: number;
  count: number;
  label: string;
}

const placementData: PlacementLocation[] = [
  { city: "Delhi NCR", lat: 28.6, lng: 77.2, count: 312, label: "Delhi NCR" },
  { city: "Mumbai", lat: 19.0, lng: 72.8, count: 187, label: "Mumbai" },
  { city: "Dehradun", lat: 30.3, lng: 78.0, count: 245, label: "Dehradun" },
  { city: "Lucknow", lat: 26.8, lng: 80.9, count: 134, label: "Lucknow" },
  { city: "Chandigarh", lat: 30.7, lng: 76.7, count: 98, label: "Chandigarh" },
  { city: "Bangalore", lat: 12.9, lng: 77.5, count: 76, label: "Bangalore" },
  { city: "Hyderabad", lat: 17.3, lng: 78.4, count: 89, label: "Hyderabad" },
  { city: "Jaipur", lat: 26.9, lng: 75.7, count: 112, label: "Jaipur" },
  { city: "Ramnagar", lat: 29.4, lng: 79.1, count: 45, label: "Ramnagar (Home)" },
];

// Convert lat/lng to SVG coordinates (simplified for India map bounds)
function toSvgCoords(lat: number, lng: number): { x: number; y: number } {
  // India bounds approximately: lat 8-37, lng 68-97
  const minLat = 8, maxLat = 37;
  const minLng = 68, maxLng = 97;
  
  const x = ((lng - minLng) / (maxLng - minLng)) * 280 + 60;
  const y = ((maxLat - lat) / (maxLat - minLat)) * 340 + 30;
  
  return { x, y };
}

interface ImpactMapProps {
  className?: string;
}

export function ImpactMap({ className }: ImpactMapProps) {
  const [hoveredCity, setHoveredCity] = useState<PlacementLocation | null>(null);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const totalAlumni = placementData.reduce((sum, loc) => sum + loc.count, 0);

  return (
    <section ref={ref} className={cn("bg-[var(--off-white)] px-4 py-14 md:px-8 md:py-20", className)}>
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:w-[40%]"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--gold)]">
              Impact Map
            </p>
            <h2 className="font-heading text-3xl text-[var(--navy-dark)] md:text-4xl">
              Our Alumni Are
              <span className="block text-[var(--navy)]">Everywhere</span>
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
              GD Goenka Healthcare Academy alumni are making a difference across India,
              working in top hospitals and healthcare institutions nationwide.
            </p>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:gap-8">
              <div className="rounded-lg border border-[var(--border-navy)] bg-white p-4">
                <p className="font-heading text-3xl text-[var(--navy-dark)]">{totalAlumni}+</p>
                <p className="text-xs text-[var(--text-muted)]">Alumni Placed</p>
              </div>
              <div className="rounded-lg border border-[var(--border-navy)] bg-white p-4">
                <p className="font-heading text-3xl text-[var(--navy-dark)]">9+</p>
                <p className="text-xs text-[var(--text-muted)]">Major Cities</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#courses"
                className="rounded-lg bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] px-5 py-2.5 text-sm font-semibold text-[var(--navy-deeper)]"
              >
                Explore Courses
              </a>
              <a
                href="#contact"
                className="rounded-lg border border-[var(--navy)] px-5 py-2.5 text-sm font-medium text-[var(--navy)]"
              >
                Quick Quiz
              </a>
            </div>
          </motion.div>

          {/* Right: Map */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="relative lg:w-[60%]"
          >
            <svg
              viewBox="0 0 400 400"
              className="w-full"
              style={{ maxWidth: 500 }}
            >
              {/* India outline - simplified path */}
              <path
                d="M180,30 L220,35 L260,40 L290,55 L320,70 L340,100 L350,130 L355,160 L350,190 L340,220 L320,250 L300,280 L280,310 L250,340 L220,360 L190,370 L160,365 L130,350 L100,320 L80,290 L70,260 L65,230 L70,200 L80,170 L90,140 L100,110 L120,80 L150,50 L180,30 Z"
                fill="var(--navy-pale)"
                stroke="var(--navy)"
                strokeWidth="1"
                opacity="0.6"
              />

              {/* Placement dots */}
              {placementData.map((location, index) => {
                const { x, y } = toSvgCoords(location.lat, location.lng);
                const dotSize = Math.max(8, Math.min(16, location.count / 20));

                return (
                  <g
                    key={location.city}
                    onMouseEnter={() => setHoveredCity(location)}
                    onMouseLeave={() => setHoveredCity(null)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Outer pulse ring */}
                    <motion.circle
                      cx={x}
                      cy={y}
                      r={dotSize * 1.5}
                      fill="var(--gold)"
                      opacity="0.3"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: [1, 2, 1], opacity: [0.3, 0, 0.3] } : {}}
                      transition={{
                        delay: index * 0.15,
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />

                    {/* Main dot */}
                    <motion.circle
                      cx={x}
                      cy={y}
                      r={dotSize / 2}
                      fill="var(--gold)"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: [0, 1.3, 1] } : {}}
                      transition={{
                        delay: 0.3 + index * 0.1,
                        duration: 0.4,
                        ease: "backOut",
                      }}
                    />

                    {/* Label for major cities */}
                    {location.count > 100 && (
                      <motion.text
                        x={x}
                        y={y + dotSize + 10}
                        textAnchor="middle"
                        fontSize="9"
                        fill="var(--navy-dark)"
                        fontWeight="500"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.8 + index * 0.1 }}
                      >
                        {location.count}
                      </motion.text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Tooltip */}
            <AnimatePresence>
              {hoveredCity && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute rounded-lg bg-white px-3 py-2 shadow-lg"
                  style={{
                    left: toSvgCoords(hoveredCity.lat, hoveredCity.lng).x * 1.25,
                    top: toSvgCoords(hoveredCity.lat, hoveredCity.lng).y - 40,
                    transform: "translateX(-50%)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[var(--gold)]" />
                    <span className="text-xs font-semibold text-[var(--navy-dark)]">
                      {hoveredCity.label}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[10px] text-[var(--text-muted)]">
                    {hoveredCity.count} Alumni Placed
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom stats chips */}
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <span className="rounded-full bg-[var(--navy-pale)] px-3 py-1 text-xs text-[var(--navy)]">
                52% Alumni in North India
              </span>
              <span className="rounded-full bg-[var(--gold-pale)] px-3 py-1 text-xs text-[var(--gold-dark)]">
                {totalAlumni}+ Alumni Placed
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ImpactMap;
