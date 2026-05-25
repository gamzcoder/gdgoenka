"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  FlaskConical,
  Users,
  MapPin,
  PhoneCall,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MegaMenuItem {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  href: string;
}

const menuItems: MegaMenuItem[] = [
  {
    icon: <GraduationCap size={20} />,
    title: "Degrees",
    subtitle: "B.Sc healthcare programs",
    href: "#courses",
  },
  {
    icon: <BookOpen size={20} />,
    title: "Diplomas",
    subtitle: "Short-term career courses",
    href: "#courses",
  },
  {
    icon: <FlaskConical size={20} />,
    title: "Labs",
    subtitle: "Hands-on practical training",
    href: "#facilities",
  },
  {
    icon: <Users size={20} />,
    title: "Alumni Stories",
    subtitle: "Student placement journeys",
    href: "#testimonials",
  },
  {
    icon: <MapPin size={20} />,
    title: "Campus Tour",
    subtitle: "Explore our facilities",
    href: "#gallery",
  },
  {
    icon: <PhoneCall size={20} />,
    title: "Contact Us",
    subtitle: "Talk to a counsellor",
    href: "#contact",
  },
];

interface MegaMenuProps {
  triggerLabel?: string;
  className?: string;
}

export function MegaMenu({ triggerLabel = "Courses", className }: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger button */}
      <button
        type="button"
        className="group relative flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--navy)]"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {triggerLabel}
        <ChevronDown
          size={14}
          className={cn(
            "transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
        <span className="absolute bottom-0 left-3 h-[2px] w-0 bg-[var(--gold)] transition-all duration-300 group-hover:w-[calc(100%-24px)]" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Invisible bridge to prevent gap hover issues */}
            <div className="absolute left-0 right-0 h-2" />
            
            {/* Dropdown panel */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-1/2 top-full z-50 w-[600px] -translate-x-1/2 pt-2"
            >
              <div
                className="rounded-b-2xl bg-white p-6 shadow-lg"
                style={{
                  borderTop: "2px solid var(--gold)",
                  boxShadow: "0 16px 40px rgba(18,56,132,0.12)",
                }}
              >
                <div className="grid grid-cols-3 gap-3">
                  {menuItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group/item flex items-start gap-3 rounded-lg p-3 transition-colors duration-200 hover:bg-[var(--navy-pale)]"
                    >
                      {/* Icon wrapper */}
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[var(--navy-pale)] text-[var(--navy)] transition-all duration-200 group-hover/item:bg-[var(--navy)] group-hover/item:text-white"
                      >
                        {item.icon}
                      </div>
                      
                      {/* Text */}
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[var(--navy-dark)]">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                          {item.subtitle}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Mobile version - stacked list
export function MegaMenuMobile({
  onItemClick,
  className,
}: {
  onItemClick?: () => void;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
        Programs & More
      </p>
      {menuItems.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          onClick={onItemClick}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[var(--text-muted)] transition hover:bg-[var(--navy-pale)] hover:text-[var(--navy)]"
        >
          <span className="text-[var(--navy)]">{item.icon}</span>
          {item.title}
        </Link>
      ))}
    </div>
  );
}

export default MegaMenu;
