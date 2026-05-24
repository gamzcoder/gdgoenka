interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  dark?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  accent,
  description,
  dark = false,
}: SectionHeaderProps) {
  const [before, after] = accent ? title.split(accent) : [title, ""];

  return (
    <div className="mx-auto mb-12 max-w-3xl text-center md:mb-14">
      <p
        className={`mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] ${
          dark ? "text-[var(--gold-light)]" : "text-[var(--gold-dark)]"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`font-heading text-[2rem] leading-[1.08] md:text-[3rem] ${
          dark ? "text-white" : "text-[var(--navy-dark)]"
        }`}
      >
        {before}
        {accent ? <span className="text-[var(--gold)]">{accent}</span> : null}
        {after}
      </h2>
      <div className="mx-auto mt-4 h-[2px] w-24 rounded-full bg-gradient-to-r from-[var(--gold-dark)] via-[var(--gold)] to-[var(--gold-light)]" />
      {description ? (
        <p className={`mx-auto mt-4 max-w-2xl text-sm leading-7 ${dark ? "text-[var(--text-light)]" : "text-[var(--text-muted)]"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
