"use client";

import { useId, useMemo, useState } from "react";
import type { Course } from "@/lib/types";

interface LeadFormProps {
  courses: Course[];
  source: string;
  compact?: boolean;
  submitLabel?: string;
}

export default function LeadForm({ courses, source, compact = false, submitLabel = "Request Free Counselling" }: LeadFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const baseId = useId();

  const courseOptions = useMemo(() => {
    const unique = Array.from(new Set(courses.map((item) => item.name).filter(Boolean)));
    return unique;
  }, [courses]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, course, source }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setStatus("success");
      setMessage("Thank you. Our counselor will call you shortly.");
      setName("");
      setPhone("");
      setCourse("");

      window.setTimeout(() => setStatus("idle"), 1800);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Submission failed. Please try again or call us directly.");
    }
  }

  const inputBase = compact
    ? "field-input w-full rounded-lg border border-white/20 bg-white/10 px-3 py-3 text-sm text-white outline-none transition focus:border-[var(--gold)] placeholder:text-transparent"
    : "field-input w-full rounded-lg border border-[var(--border-navy)] bg-[var(--off-white)] px-3 py-3 text-sm text-[var(--text-dark)] outline-none transition focus:border-[var(--gold)] placeholder:text-transparent";

  const labelBase = compact ? "field-label text-white/70" : "field-label";

  return (
    <form onSubmit={onSubmit} className={`space-y-4 ${compact ? "dark-form w-full" : ""}`}>
      <div className="field-wrapper">
        <input
          id={`${baseId}-name`}
          type="text"
          name="name"
          placeholder=" "
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          aria-required="true"
          className={inputBase}
        />
        <label htmlFor={`${baseId}-name`} className={labelBase}>
          Your Name
        </label>
      </div>

      <div className="field-wrapper">
        <input
          id={`${baseId}-phone`}
          type="tel"
          name="phone"
          placeholder=" "
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          pattern="[0-9+\-\s]{8,15}"
          required
          aria-required="true"
          className={inputBase}
        />
        <label htmlFor={`${baseId}-phone`} className={labelBase}>
          Phone Number
        </label>
      </div>

      <div className="field-wrapper">
        <select
          id={`${baseId}-course`}
          name="course"
          value={course}
          onChange={(event) => setCourse(event.target.value)}
          data-filled={course ? "true" : "false"}
          className={`${inputBase} ${compact ? "text-white" : "text-[var(--text-dark)]"}`}
        >
          <option value="" className="text-[var(--text-dark)]">
            Select Course
          </option>
          {courseOptions.map((option) => (
            <option key={option} value={option} className="text-[var(--text-dark)]">
              {option}
            </option>
          ))}
        </select>
        <label htmlFor={`${baseId}-course`} className={labelBase}>
          Preferred Course
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition ${
          status === "success"
            ? "bg-[var(--success)] text-white"
            : status === "error"
              ? "bg-red-600 text-white"
              : compact
                ? "bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] text-[var(--navy-deeper)] hover:opacity-95"
                : "bg-gradient-to-r from-[var(--navy)] to-[var(--navy-light)] text-white hover:opacity-95"
        }`}
      >
        {status === "loading" ? (
          <>
            <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
            Submitting...
          </>
        ) : status === "success" ? (
          <>
            <span>✓</span>
            Submitted
          </>
        ) : (
          `${submitLabel} →`
        )}
      </button>

      {message ? (
        <p id={`${baseId}-message`} className={`text-xs ${status === "success" ? "text-emerald-500" : "text-red-500"}`}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
