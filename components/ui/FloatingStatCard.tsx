"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FloatingStatCardProps {
  label: string;
  value: string;
  subLabel: string;
  icon: ReactNode;
  chartData?: number[];
  position?: "left" | "right";
  delay?: number;
  className?: string;
}

export function FloatingStatCard({
  label,
  value,
  subLabel,
  icon,
  chartData = [40, 65, 45, 80, 60, 95],
  position = "left",
  delay = 0.6,
  className,
}: FloatingStatCardProps) {
  const slideVariant = {
    hidden: {
      opacity: 0,
      x: position === "left" ? -30 : 30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  } as const;

  return (
    <motion.div
      variants={slideVariant}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.35)" }}
      className={cn(
        "relative overflow-hidden rounded-xl p-3 transition-all duration-200",
        className
      )}
      style={{
        width: 160,
        background: "rgba(255,255,255,0.12)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
      }}
    >
      {/* Content */}
      <div className="flex items-start justify-between gap-2">
        {/* Left: Icon and label */}
        <div className="flex flex-col gap-1">
          <div className="text-white/90" style={{ width: 16, height: 16 }}>
            {icon}
          </div>
          <span
            className="text-white/60"
            style={{ fontSize: 10 }}
          >
            {label}
          </span>
        </div>

        {/* Right: Value and sublabel */}
        <div className="text-right">
          <p className="text-lg font-bold leading-none text-white">{value}</p>
          <span className="text-[var(--gold)]" style={{ fontSize: 9 }}>
            {subLabel}
          </span>
        </div>
      </div>

      {/* Mini sparkbar chart */}
      <div className="mt-3 flex items-end gap-0.5">
        {chartData.map((height, index) => (
          <motion.div
            key={index}
            initial={{ height: 0 }}
            animate={{ height: `${height * 0.2}px` }}
            transition={{ delay: delay + 0.1 * index, duration: 0.4 }}
            className="w-1 rounded-t"
            style={{
              backgroundColor:
                index === chartData.length - 1
                  ? "var(--gold)"
                  : "rgba(255,255,255,0.3)",
              minHeight: 2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default FloatingStatCard;
