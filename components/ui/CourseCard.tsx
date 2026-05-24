import type { Course } from "@/lib/types";

interface CourseCardProps {
  course: Course;
  index: number;
}

const gradients = [
  "from-[var(--navy)] to-[var(--navy-light)]",
  "from-[var(--navy-dark)] to-[var(--navy)]",
  "from-[var(--gold-dark)] to-[var(--gold)]",
  "from-[var(--navy-light)] to-[var(--navy)]",
  "from-[var(--navy-deeper)] to-[var(--navy)]",
  "from-[var(--gold)] to-[var(--gold-light)]",
];

export default function CourseCard({ course, index }: CourseCardProps) {
  return (
    <article className="course-flip h-[320px]">
      <div className="course-flip-inner relative h-full">
        <div className="course-face absolute inset-0 overflow-hidden rounded-2xl border border-[var(--border-navy)] bg-white">
          <div className={`relative flex h-36 items-center justify-center bg-gradient-to-br ${gradients[index % gradients.length]}`}>
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_11px)]" />
            <span className="absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--navy-deeper)]">
              {course.type}
            </span>
            <span className="relative text-4xl text-white/45">✚</span>
          </div>
          <div className="space-y-3 p-5">
            <h3 className="font-heading text-2xl leading-7 text-[var(--navy-dark)]">{course.name}</h3>
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">{course.category}</p>
            <div className="flex gap-2 text-xs text-[var(--text-muted)]">
              <span className="rounded-full bg-[var(--off-white)] px-3 py-1">{course.duration}</span>
              <span className="rounded-full bg-[var(--off-white)] px-3 py-1">{course.type}</span>
            </div>
            <p className="text-sm leading-6 text-[var(--text-muted)]">Hover to preview details</p>
          </div>
        </div>

        <div className="course-face course-face-back absolute inset-0 overflow-hidden rounded-2xl border border-[var(--border-gold)] bg-[var(--navy-deeper)] p-5 text-white">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--gold-light)]">Program Overview</p>
          <h4 className="mt-2 font-heading text-3xl leading-8 text-white">{course.name}</h4>
          <p className="mt-3 text-sm leading-7 text-[var(--text-light)]">{course.description}</p>
          <div className="mt-5 flex items-center justify-between">
            <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/80">{course.duration}</span>
            <a href="#contact" className="rounded-lg bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] px-4 py-2 text-sm font-semibold text-[var(--navy-deeper)]">
              Apply Now →
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
