import { associations } from "@/data/static";

export default function Associations() {
  return (
    <section className="bg-white px-4 py-10 md:px-8">
      <div className="mx-auto w-full max-w-6xl text-center">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
          Academic Affiliations & Recognitions
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {associations.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-navy)] bg-[var(--off-white)] px-4 py-2 text-sm font-semibold text-[var(--text-dark)]"
            >
              <span className="h-2 w-2 rounded-full bg-[var(--gold)]" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
