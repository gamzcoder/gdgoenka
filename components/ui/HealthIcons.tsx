"use client";

import type { CSSProperties } from "react";
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
  ClipboardPlus,
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
  Dna,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
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
  clipboard: ClipboardPlus,
  "heart-pulse": HeartPulse,
  thermometer: Thermometer,
  bandage: Bandage,
  hospital: Hospital,
  user: UserRound,
  users: Users,
  "graduation-cap": GraduationCap,
  "book-open": BookOpen,
  award: Award,
  "map-pin": MapPin,
  building: Building2,
  "trending-up": TrendingUp,
  star: Star,
  "shield-check": ShieldCheck,
  globe: Globe,
  lightbulb: Lightbulb,
  phone: PhoneCall,
  message: MessageCircle,
  dna: Dna,
} as const;

const sizes = {
  sm: 16,
  md: 22,
  lg: 28,
  xl: 40,
} as const;

const colors = {
  navy: "var(--navy)",
  gold: "var(--gold)",
  white: "var(--white)",
  muted: "var(--text-muted)",
} as const;

const bgColors = {
  "navy-pale": "var(--navy-pale)",
  "gold-pale": "var(--gold-pale)",
  navy: "var(--navy)",
  gold: "var(--gold)",
} as const;

export type HealthIconName = keyof typeof iconMap;
export type HealthIconSize = keyof typeof sizes;
export type HealthIconVariant = keyof typeof colors;
export type HealthIconBgVariant = keyof typeof bgColors;

export const iconCatalog: Record<
  HealthIconName,
  { icon: LucideIcon; label: string; variant: HealthIconVariant; size: HealthIconSize }
> = {
  stethoscope: { icon: Stethoscope, label: "General medicine", variant: "navy", size: "lg" },
  flask: { icon: FlaskConical, label: "MLT", variant: "gold", size: "lg" },
  radiation: { icon: Radiation, label: "Radiology", variant: "gold", size: "lg" },
  scissors: { icon: Scissors, label: "OT Technology", variant: "gold", size: "lg" },
  heart: { icon: Heart, label: "Nursing", variant: "gold", size: "lg" },
  activity: { icon: Activity, label: "Physiotherapy", variant: "gold", size: "lg" },
  microscope: { icon: Microscope, label: "Lab science", variant: "gold", size: "xl" },
  pill: { icon: Pill, label: "Pharmacy", variant: "navy", size: "lg" },
  brain: { icon: Brain, label: "Neurology", variant: "navy", size: "lg" },
  eye: { icon: Eye, label: "Ophthalmology", variant: "navy", size: "lg" },
  bone: { icon: Bone, label: "Orthopedics", variant: "navy", size: "lg" },
  baby: { icon: Baby, label: "Pediatrics", variant: "navy", size: "lg" },
  syringe: { icon: Syringe, label: "Vaccination", variant: "navy", size: "lg" },
  clipboard: { icon: ClipboardPlus, label: "Patient records", variant: "gold", size: "lg" },
  "heart-pulse": { icon: HeartPulse, label: "Cardiology", variant: "gold", size: "lg" },
  thermometer: { icon: Thermometer, label: "Fever screening", variant: "navy", size: "lg" },
  bandage: { icon: Bandage, label: "First aid", variant: "navy", size: "lg" },
  hospital: { icon: Hospital, label: "Hospital placement", variant: "navy", size: "lg" },
  user: { icon: UserRound, label: "Student", variant: "navy", size: "lg" },
  users: { icon: Users, label: "Faculty", variant: "navy", size: "lg" },
  "graduation-cap": { icon: GraduationCap, label: "Degree", variant: "navy", size: "lg" },
  "book-open": { icon: BookOpen, label: "Diploma", variant: "navy", size: "lg" },
  award: { icon: Award, label: "Certification", variant: "navy", size: "lg" },
  "map-pin": { icon: MapPin, label: "Location", variant: "navy", size: "lg" },
  building: { icon: Building2, label: "Campus", variant: "navy", size: "lg" },
  "trending-up": { icon: TrendingUp, label: "Career growth", variant: "navy", size: "lg" },
  star: { icon: Star, label: "Excellence", variant: "gold", size: "lg" },
  "shield-check": { icon: ShieldCheck, label: "Accreditation", variant: "navy", size: "lg" },
  globe: { icon: Globe, label: "PAN India", variant: "navy", size: "lg" },
  lightbulb: { icon: Lightbulb, label: "Innovation", variant: "gold", size: "lg" },
  phone: { icon: PhoneCall, label: "Phone", variant: "gold", size: "lg" },
  message: { icon: MessageCircle, label: "Message", variant: "gold", size: "lg" },
  dna: { icon: Dna, label: "Healthcare", variant: "white", size: "xl" },
};

export interface HealthIconProps {
  name: HealthIconName;
  size?: HealthIconSize;
  variant?: HealthIconVariant;
  withBackground?: boolean;
  bgVariant?: HealthIconBgVariant;
  label?: string;
  animated?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function HealthIcon({
  name,
  size = "md",
  variant,
  withBackground = false,
  bgVariant = "navy-pale",
  label,
  animated = false,
  className,
  style,
}: HealthIconProps) {
  const IconComponent = iconMap[name];
  const iconSize = sizes[size];
  const iconColor = colors[variant ?? iconCatalog[name].variant ?? "navy"];
  const bgColor = bgColors[bgVariant];

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
    const adjustedIconColor = bgVariant === "navy" || bgVariant === "gold" ? "var(--white)" : iconColor;

    return (
      <div className={cn("flex flex-col items-center gap-2", className)} style={style}>
        <div
          className={cn("flex items-center justify-center rounded-xl transition-all duration-300", animationClass)}
          style={{
            width: bgSize,
            height: bgSize,
            backgroundColor: bgColor,
          }}
        >
          <IconComponent size={iconSize} style={{ color: adjustedIconColor }} strokeWidth={1.8} />
        </div>
        {label ? <span className="text-xs font-medium text-[var(--text-muted)]">{label}</span> : null}
      </div>
    );
  }

  return (
    <div className={cn("inline-flex flex-col items-center gap-1", className)} style={style}>
      <IconComponent size={iconSize} style={{ color: iconColor }} strokeWidth={1.8} className={animationClass} />
      {label ? <span className="text-xs font-medium text-[var(--text-muted)]">{label}</span> : null}
    </div>
  );
}

export const courseIconMap: Record<string, HealthIconName> = {
  "B.Sc Medical Lab Technology": "flask",
  "B.Sc Radiology": "radiation",
  "B.Sc OT Technology": "scissors",
  "Diploma Nursing": "heart",
  "Diploma Physiotherapy": "activity",
  "Certificate Healthcare Mgmt": "clipboard",
  Degree: "graduation-cap",
  Diploma: "book-open",
  Certificate: "award",
  MLT: "flask",
  Radiology: "radiation",
  OT: "scissors",
  Nursing: "heart",
  Physiotherapy: "activity",
};

export const facilityIconMap: Record<string, HealthIconName> = {
  "Medical Laboratory": "microscope",
  "Radiology Unit": "radiation",
  "Radiology & Imaging Unit": "radiation",
  "OT Simulation": "scissors",
  "Operation Theatre Simulation": "scissors",
  "Smart Classrooms": "book-open",
  Library: "book-open",
  "Library & Resource Centre": "book-open",
  "Physiotherapy Lab": "activity",
};

export const whyUsIconMap: Record<string, HealthIconName> = {
  "30+ Years of Excellence": "award",
  "World-Class Labs": "flask",
  "Expert Faculty": "users",
  "99% Placement Rate": "trending-up",
  "100+ Academies PAN India": "globe",
  "Recognized Certifications": "shield-check",
};

export default HealthIcon;
