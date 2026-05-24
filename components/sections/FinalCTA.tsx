import Image from "next/image";
import LeadForm from "@/components/ui/LeadForm";
import type { Course } from "@/lib/types";

interface FinalCTAProps {
  courses: Course[];
}

export default function FinalCTA({ courses }: FinalCTAProps) {
  return (
    <section id="contact" className="relative overflow-hidden bg-[linear-gradient(135deg,var(--navy-deeper),var(--navy-dark),var(--navy))] px-4 py-14 md:px-8 md:py-20">
      <svg
        className="pointer-events-none absolute right-[-120px] top-1/2 h-[520px] w-[520px] -translate-y-1/2 opacity-[0.05] [animation:rotateRays_40s_linear_infinite]"
        viewBox="0 0 400 400"
        aria-hidden="true"
      >
        {Array.from({ length: 12 }).map((_, index) => {
          const angle = (index * 360) / 12;
          return <line key={index} x1="200" y1="200" x2="200" y2="10" stroke="white" strokeWidth="2" transform={`rotate(${angle} 200 200)`} />;
        })}
      </svg>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/15 bg-white/5 backdrop-blur-sm lg:grid-cols-2">
        <div className="relative min-h-[320px]">
          <Image src="/og-image.jpg" alt="GD Goenka healthcare students" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(9,29,71,0.88)] via-[rgba(9,29,71,0.35)] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <p className="font-heading text-5xl leading-none text-[var(--gold-light)]">“</p>
            <p className="mt-2 max-w-md text-sm leading-7 text-white/90">
              Your first step into healthcare can change your life. Let our counselors help you choose the right course and career path.
            </p>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <h2 className="font-heading text-[2rem] leading-[1.08] text-white md:text-[2.8rem]">
            Still Deciding? <span className="text-[var(--gold-light)]">Let&apos;s Talk.</span>
          </h2>
          <p className="mt-3 text-sm leading-7 text-[var(--text-light)]">
            Fill your details and our admission advisor will call you back within 24 hours.
          </p>

          <div className="mt-6 rounded-2xl border border-white/15 bg-[rgba(9,29,71,0.72)] p-4 md:p-5">
            <LeadForm courses={courses} source="Final CTA" compact submitLabel="Get Free Counselling" />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-white/75">
            <span className="rounded-full border border-white/15 px-3 py-1">🔒 100% Confidential</span>
            <span className="rounded-full border border-white/15 px-3 py-1">✓ Call back in 24hrs</span>
            <span className="rounded-full border border-white/15 px-3 py-1">✓ No spam</span>
          </div>
        </div>
      </div>
    </section>
  );
}
