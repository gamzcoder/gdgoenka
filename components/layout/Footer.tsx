import Link from "next/link";
import { footerStats, navLinks } from "@/data/static";
import type { Course } from "@/lib/types";

interface FooterProps {
  courses: Course[];
}

const phone = process.env.NEXT_PUBLIC_PHONE ?? "+918929883260";
const email = process.env.NEXT_PUBLIC_EMAIL ?? "ramnagar.uk@gdgoenkahealthcare.in";
const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP ?? "918929883260";

export default function Footer({ courses }: FooterProps) {
  const topCourses = Array.from(new Set(courses.map((course) => course.name))).slice(0, 6);

  return (
    <footer className="relative bg-[var(--navy-deeper)] text-white">
      <div className="h-[3px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />

      <div className="grid grid-cols-2 border-b border-[rgba(201,167,86,0.2)] md:grid-cols-4">
        {footerStats.map((stat) => (
          <div key={stat.label} className="px-4 py-6 text-center">
            <p className="font-heading text-4xl text-[var(--gold-light)]">{stat.value}</p>
            <p className="text-[11px] uppercase tracking-[0.15em] text-white/60">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-heading text-3xl text-white">GD Goenka Healthcare</p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[var(--gold-light)]">Ramnagar · Uttarakhand</p>
          <p className="mt-4 text-sm leading-7 text-white/70">
            Premier healthcare education with world-class labs, experienced faculty, and strong placement outcomes.
          </p>
          <div className="mt-4 space-y-2 text-sm text-white/80">
            <p>
              <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
            </p>
            <p>
              <a href={`mailto:${email}`}>{email}</a>
            </p>
            <p>Ramnagar, Uttarakhand, India</p>
          </div>
        </div>

        <div>
          <p className="font-heading text-2xl">Our Courses</p>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {topCourses.map((course) => (
              <li key={course}>• {course}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-heading text-2xl">Quick Links</p>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {navLinks.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="hover:text-[var(--gold-light)]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-heading text-2xl">Get In Touch</p>
          <p className="mt-4 text-sm leading-7 text-white/70">
            Our counselors are available Mon–Sat, 9am–6pm to help you choose the right course.
          </p>
          <a
            href={`https://wa.me/${whatsapp}`}
            className="mt-4 inline-flex rounded-lg bg-[var(--gold)] px-4 py-2 text-sm font-semibold text-[var(--navy-deeper)]"
          >
            WhatsApp Us
          </a>
          <a
            href="#contact"
            className="mt-2 inline-flex rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white/80"
          >
            Apply for Admission
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 text-xs text-white/60">
          <p>© 2026 GD Goenka Healthcare · Ramnagar. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-[var(--gold-light)]">Privacy Policy</Link>
            <Link href="#" className="hover:text-[var(--gold-light)]">Terms of Use</Link>
            <Link href="#" className="hover:text-[var(--gold-light)]">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
