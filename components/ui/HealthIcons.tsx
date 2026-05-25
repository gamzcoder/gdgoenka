"use client";

import {
  Stethoscope,
  FlaskConical,
  Radiation,
  Scissors,
  Heart,
  Activity,
  Microscope,
  Pill,
  Brain,
  Eye,
  Bone,
  Baby,
  Syringe,
  ClipboardList,
  HeartPulse,
  Thermometer,
  Bandage,
  Hospital,
  UserRound,
  Users,
  GraduationCap,
  BookOpen,
  Award,
  MapPin,
  Building2,
  TrendingUp,
  Star,
  ShieldCheck,
  Globe,
  Lightbulb,
  PhoneCall,
  MessageCircle,
  Dna
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Icon map - maps semantic names to Lucide icons
const iconMap = {
  // Healthcare courses
  stethoscope: Stethoscope,
  flask: FlaskConical,
  radiation: Radiation,
  scissors: Scissors,
  heart: Heart,
  activity: Activity,
  microscope: Microscope,
  pill: Pill,
  brain: Brain,
  eye: Eye,
  bone: Bone,
  baby: Baby,
  syringe: Syringe,
  clipboard: ClipboardList,
  "heart-pulse": HeartPulse,
  thermometer: Thermometer,
  bandage: Bandage,
  hospital: Hospital,
  // People & education
  user: UserRound,
  users: Users,
  "graduation-cap": GraduationCap,
  "book-open": BookOpen,
  award: Award,
  // Location & building
  "map-pin": MapPin,
  building: Building2,
  // Stats & trust
  "trending-up": TrendingUp,
  star: Star,
  "shield-check": ShieldCheck,
  globe: Globe,
  lightbulb: Lightbulb,
  // Communication
  phone: PhoneCall,
  message: MessageCircle,
  dna:Dna
} as const;

export type HealthIconName = keyof typeof iconMap;

// Size map in pixels
const sizes = {
  sm: 16,
  md: 22,
  lg: 28,
  xl: 40,
} as const;

// Color map using CSS variables
const colors = {
  navy: "var(--navy)",
  gold: "var(--gold)",
  white: "#ffffff",
  muted: "var(--text-muted)",
} as const;

// Background color map
const bgColors = {
  "navy-pale": "var(--navy-pale)",
  "gold-pale": "var(--gold-pale)",
  navy: "var(--navy)",
  gold: "var(--gold)",
} as const;

export interface HealthIconProps {
  name: HealthIconName;
  size?: keyof typeof sizes;
  variant?: keyof typeof colors;
  withBackground?: boolean;
  bgVariant?: keyof typeof bgColors;
  label?: string;
  animated?: boolean;
  className?: string;
}

export function HealthIcon({
  name,
  size = "md",
  variant = "navy",
  withBackground = false,
  bgVariant = "navy-pale",
  label,
  animated = false,
  className,
}: HealthIconProps) {
  const IconComponent = iconMap[name];
  const iconSize = sizes[size];
  const iconColor = colors[variant];
  const bgColor = bgColors[bgVariant];

  // Determine animation class based on icon type
  const getAnimationClass = () => {
    if (!animated) return "";
    switch (name) {
      case "heart":
      case "heart-pulse":
        return "animate-heartbeat";
      case "flask":
        return "animate-bubble";
      case "radiation":
        return "animate-spin-slow";
      case "activity":
        return "animate-pulse";
      default:
        return "";
    }
  };

  const animationClass = getAnimationClass();

  if (withBackground) {
    const bgSize = iconSize * 2;
    const isFilledBg = bgVariant === "navy" || bgVariant === "gold";
    const adjustedIconColor = isFilledBg ? "#ffffff" : iconColor;

    return (
      <div className={cn("flex flex-col items-center gap-2", className)}>
        <div
          className={cn(
            "flex items-center justify-center rounded-xl transition-all duration-300",
            animationClass
          )}
          style={{
            width: bgSize,
            height: bgSize,
            backgroundColor: bgColor,
          }}
        >
          <IconComponent
            size={iconSize}
            style={{ color: adjustedIconColor }}
            strokeWidth={1.8}
          />
        </div>
        {label && (
          <span className="text-xs font-medium text-[var(--text-muted)]">
            {label}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={cn("inline-flex flex-col items-center gap-1", className)}>
      <IconComponent
        size={iconSize}
        style={{ color: iconColor }}
        strokeWidth={1.8}
        className={animationClass}
      />
      {label && (
        <span className="text-xs font-medium text-[var(--text-muted)]">
          {label}
        </span>
      )}
    </div>
  );
}

// Course icon mapping helper
export const courseIconMap: Record<string, HealthIconName> = {
  "B.Sc Medical Lab Technology": "flask",
  "B.Sc Radiology": "radiation",
  "B.Sc OT Technology": "scissors",
  "Diploma Nursing": "heart",
  "Diploma Physiotherapy": "activity",
  "Certificate Healthcare Mgmt": "clipboard",
  // Generic mappings
  Degree: "graduation-cap",
  Diploma: "book-open",
  Certificate: "award",
  MLT: "flask",
  Radiology: "radiation",
  OT: "scissors",
  Nursing: "heart",
  Physiotherapy: "activity",
};

// Facility icon mapping
export const facilityIconMap: Record<string, HealthIconName> = {
  "Medical Laboratory": "microscope",
  "Radiology Unit": "radiation",
  "OT Simulation": "scissors",
  "Smart Classrooms": "book-open",
  Library: "book-open",
  "Physiotherapy Lab": "activity",
};

// Why Us icon mapping
export const whyUsIconMap: Record<string, HealthIconName> = {
  "30+ Years of Excellence": "award",
  "World-Class Labs": "flask",
  "Expert Faculty": "users",
  "99% Placement Rate": "trending-up",
  "100+ Academies PAN India": "globe",
  "Recognized Certifications": "shield-check",
};

export default HealthIcon;
