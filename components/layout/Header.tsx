"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { navLinks } from "@/data/static";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { MegaMenu, MegaMenuMobile } from "@/components/layout/MegaMenu";

const phone = process.env.NEXT_PUBLIC_PHONE ?? "+918929883260";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "glass-header" : "border-b border-[var(--border-navy)] bg-white/95"}`}>
      <div className="mx-auto flex h-[76px] w-full max-w-6xl items-center justify-between gap-4 px-4 md:px-8">
        <Link href="#" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--navy)] to-[var(--navy-dark)] text-lg font-bold text-[var(--gold)] shadow-[var(--shadow)] [animation:pulseOnce_0.6s_ease_0.5s_both]">
            ✚
          </div>
          <div>
            <p className="font-heading text-2xl leading-none text-[var(--navy-dark)]">GD Goenka Healthcare</p>
            <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--gold-dark)]">Ramnagar, Uttarakhand</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) =>
            link.label === "Courses" ? (
              <MegaMenu key={link.label} triggerLabel={link.label} />
            ) : (
              <Link key={link.label} href={link.href} className="group relative rounded-md px-3 py-2 text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--navy)]">
                {link.label}
                <span className="absolute bottom-0 left-3 h-[2px] w-0 bg-[var(--gold)] transition-all duration-300 group-hover:w-[calc(100%-24px)]" />
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="rounded-lg border border-[var(--border-navy)] bg-[var(--navy-pale)] px-3 py-2 text-xs font-semibold text-[var(--navy)]"
          >
            {phone}
          </a>
          <a
            href="#contact"
            className="apply-shimmer rounded-lg px-4 py-2 text-xs font-semibold text-[var(--navy-deeper)] shadow-[0_8px_20px_rgba(201,167,86,0.35)]"
          >
            Apply Now →
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border-navy)] lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <div className="space-y-1">
            <span className="block h-0.5 w-5 bg-[var(--navy)]" />
            <span className="block h-0.5 w-5 bg-[var(--navy)]" />
            <span className="block h-0.5 w-5 bg-[var(--navy)]" />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu backdrop"
              className="fixed inset-0 z-40 bg-[rgba(9,29,71,0.45)] lg:hidden"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.aside
              className="fixed right-0 top-0 z-50 flex h-svh w-[82%] max-w-[360px] flex-col bg-white p-6 shadow-2xl lg:hidden"
              initial={{ x: reduceMotion ? 0 : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: reduceMotion ? 0 : "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-6 flex items-center justify-between">
                <p className="font-heading text-2xl text-[var(--navy-dark)]">Menu</p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-[var(--border-navy)] p-2 text-[var(--navy)]"
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              <motion.nav className="flex flex-1 flex-col gap-1" variants={staggerContainer} initial="hidden" animate="visible">
                <motion.div variants={staggerItem}>
                  <MegaMenuMobile onItemClick={() => setOpen(false)} className="mb-2 border-b border-[var(--border-navy)] pb-3" />
                </motion.div>
                {navLinks.filter((link) => link.label !== "Courses").map((link) => (
                  <motion.div key={link.label} variants={staggerItem}>
                    <Link
                      href={link.href}
                      className="block rounded-lg px-3 py-3 text-base font-medium text-[var(--text-muted)] hover:bg-[var(--navy-pale)] hover:text-[var(--navy)]"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              <a href="#contact" onClick={() => setOpen(false)} className="apply-shimmer mt-4 rounded-lg px-4 py-3 text-center text-sm font-semibold text-[var(--navy-deeper)]">
                Apply Now →
              </a>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
