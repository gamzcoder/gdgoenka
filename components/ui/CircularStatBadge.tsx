"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CircularStatBadgeProps {
  value: number;
  suffix?: string;
  label: string;
  size?: number;
  color?: string;
  animateOnView?: boolean;
  className?: string;
}

export function CircularStatBadge({
  value,
  suffix = "%",
  label,
  size = 120,
  color = "var(--gold)",
  animateOnView = true,
  className,
}: CircularStatBadgeProps) {
  const [isInView, setIsInView] = useState(!animateOnView);
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const strokeWidth = 4;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const filledPortion = (value / 100) * circumference;
  const offset = circumference - filledPortion;

  useEffect(() => {
    if (!animateOnView) {
      setDisplayValue(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [animateOnView, value]);

  // Animate the number count up
  useEffect(() => {
    if (!isInView || reduceMotion) {
      setDisplayValue(value);
      return;
    }

    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out expo
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayValue(Math.round(easeOutExpo * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, reduceMotion]);

  return (
    <motion.div
      ref={ref}
      className={cn("relative", className)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Floating bob animation wrapper */}
      <motion.div
        animate={reduceMotion ? {} : { y: [0, -6, 0] }}
        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
        className="relative"
        style={{
          width: size,
          height: size,
          filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.2))",
        }}
      >
        {/* Background circle with glassmorphism */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "rgba(9,29,71,0.7)",
            backdropFilter: "blur(12px)",
          }}
        />

        <svg
          width={size}
          height={size}
          className="absolute inset-0 -rotate-90"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Faint full circle track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth={strokeWidth}
          />
          
          {/* Animated arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={isInView ? offset : circumference}
            style={{
              transition: reduceMotion ? "none" : "stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-heading font-bold text-white"
            style={{ fontSize: size * 0.2 }}
          >
            {displayValue}
            {suffix}
          </span>
          <span
            className="uppercase tracking-[0.1em] text-white/75"
            style={{ fontSize: size * 0.054 }}
          >
            {label}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default CircularStatBadge;
