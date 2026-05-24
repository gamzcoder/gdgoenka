import Image from "next/image";
import type { Testimonial } from "@/lib/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const initials = testimonial.student_name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-[var(--gold)]/40 hover:bg-white/10">
      <p className="font-heading text-5xl leading-none text-[var(--gold)]/60">“</p>
      <p className="mt-2 text-sm leading-7 text-white/80 italic">{testimonial.quote}</p>
      <div className="mt-5 flex items-center gap-3">
        {testimonial.photo_url ? (
          <Image
            src={testimonial.photo_url}
            alt={testimonial.student_name}
            width={42}
            height={42}
            className="h-10 w-10 rounded-full border border-[var(--gold)]/50 object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--gold-light)] text-xs font-bold text-[var(--navy-deeper)]">
            {initials}
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-white">{testimonial.student_name}</p>
          <p className="text-xs text-[var(--gold-light)]">
            {testimonial.course} · {testimonial.hospital}
          </p>
        </div>
      </div>
    </article>
  );
}
