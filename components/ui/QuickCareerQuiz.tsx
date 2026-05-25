"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, FlaskConical, Heart, Activity, Radiation } from "lucide-react";
import { cn } from "@/lib/utils";

type Interest = "lab" | "patient" | "radiology" | "physio";
type Duration = "6months" | "1year" | "2years" | "3years";
type Goal = "salary" | "hospital" | "studies" | "home";

interface QuizState {
  step: number;
  interest: Interest | null;
  duration: Duration | null;
  goal: Goal | null;
}

const interestOptions: { value: Interest; label: string; icon: React.ReactNode }[] = [
  { value: "lab", label: "Lab Science", icon: <FlaskConical size={18} /> },
  { value: "patient", label: "Patient Care", icon: <Heart size={18} /> },
  { value: "radiology", label: "Radiology", icon: <Radiation size={18} /> },
  { value: "physio", label: "Physiotherapy", icon: <Activity size={18} /> },
];

const durationOptions: { value: Duration; label: string }[] = [
  { value: "6months", label: "6 months" },
  { value: "1year", label: "1 year" },
  { value: "2years", label: "2 years" },
  { value: "3years", label: "3 years" },
];

const goalOptions: { value: Goal; label: string }[] = [
  { value: "salary", label: "High Salary" },
  { value: "hospital", label: "Join a top hospital" },
  { value: "studies", label: "Higher studies" },
  { value: "home", label: "Work near home" },
];

function getRecommendation(state: QuizState): { course: string; duration: string; placement: string } {
  const { interest, duration } = state;
  
  if (interest === "lab") {
    if (duration === "3years") {
      return { course: "B.Sc Medical Lab Technology", duration: "3 years", placement: "99%" };
    }
    return { course: "Diploma in Healthcare Management", duration: "1 year", placement: "95%" };
  }
  
  if (interest === "patient") {
    return { course: "Diploma in Nursing", duration: "2 years", placement: "99%" };
  }
  
  if (interest === "radiology") {
    if (duration === "3years") {
      return { course: "B.Sc Radiology & Imaging", duration: "3 years", placement: "98%" };
    }
    return { course: "Certificate in Radiology Assistance", duration: "1 year", placement: "94%" };
  }
  
  if (interest === "physio") {
    if (duration === "3years") {
      return { course: "B.Sc OT Technology", duration: "3 years", placement: "97%" };
    }
    if (duration === "2years") {
      return { course: "Diploma in Physiotherapy", duration: "2 years", placement: "97%" };
    }
    return { course: "Certificate in Rehab Assistance", duration: "6 months", placement: "92%" };
  }
  
  return { course: "Free Counselling Session", duration: "30 mins", placement: "N/A" };
}

interface QuickCareerQuizProps {
  onComplete?: (course: string) => void;
  className?: string;
}

export function QuickCareerQuiz({ onComplete, className }: QuickCareerQuizProps) {
  const [state, setState] = useState<QuizState>({
    step: 1,
    interest: null,
    duration: null,
    goal: null,
  });

  const progress = (state.step / 4) * 100;

  const goBack = () => {
    if (state.step > 1) {
      setState((prev) => ({ ...prev, step: prev.step - 1 }));
    }
  };

  const selectInterest = (interest: Interest) => {
    setState((prev) => ({ ...prev, interest, step: 2 }));
  };

  const selectDuration = (duration: Duration) => {
    setState((prev) => ({ ...prev, duration, step: 3 }));
  };

  const selectGoal = (goal: Goal) => {
    setState((prev) => ({ ...prev, goal, step: 4 }));
  };

  const recommendation = state.step === 4 ? getRecommendation(state) : null;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Progress bar */}
      <div className="mb-4 h-1 w-full overflow-hidden rounded-full bg-[var(--navy-pale)]">
        <motion.div
          className="h-full bg-[var(--gold)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Back button */}
      {state.step > 1 && state.step < 4 && (
        <button
          type="button"
          onClick={goBack}
          className="mb-3 flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--navy)]"
        >
          <ChevronLeft size={14} />
          Back
        </button>
      )}

      <AnimatePresence mode="wait" custom={state.step}>
        {/* Step 1: Interest */}
        {state.step === 1 && (
          <motion.div
            key="step1"
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <p className="mb-3 text-sm font-medium text-[var(--navy-dark)]">
              What interests you most?
            </p>
            <div className="grid grid-cols-2 gap-2">
              {interestOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => selectInterest(option.value)}
                  className="flex items-center gap-2 rounded-lg border border-[var(--border-navy)] bg-white p-2.5 text-xs font-medium text-[var(--text-muted)] transition hover:border-[var(--gold)] hover:bg-[var(--gold-pale)] hover:text-[var(--navy)]"
                >
                  <span className="text-[var(--navy)]">{option.icon}</span>
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Duration */}
        {state.step === 2 && (
          <motion.div
            key="step2"
            custom={2}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <p className="mb-3 text-sm font-medium text-[var(--navy-dark)]">
              How long do you want to study?
            </p>
            <div className="flex flex-wrap gap-2">
              {durationOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => selectDuration(option.value)}
                  className="rounded-full border border-[var(--border-navy)] bg-white px-4 py-2 text-xs font-medium text-[var(--text-muted)] transition hover:border-[var(--gold)] hover:bg-[var(--gold-pale)] hover:text-[var(--navy)]"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: Goal */}
        {state.step === 3 && (
          <motion.div
            key="step3"
            custom={3}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <p className="mb-3 text-sm font-medium text-[var(--navy-dark)]">
              {"What's your primary goal?"}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {goalOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => selectGoal(option.value)}
                  className="rounded-lg border border-[var(--border-navy)] bg-white p-2.5 text-xs font-medium text-[var(--text-muted)] transition hover:border-[var(--gold)] hover:bg-[var(--gold-pale)] hover:text-[var(--navy)]"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 4: Result */}
        {state.step === 4 && recommendation && (
          <motion.div
            key="step4"
            custom={4}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="text-center"
          >
            <p className="mb-2 text-xs text-[var(--text-muted)]">
              We recommend:
            </p>
            <p className="font-heading text-lg font-semibold text-[var(--navy-dark)]">
              {recommendation.course}
            </p>
            <div className="mt-2 flex justify-center gap-4 text-xs text-[var(--text-muted)]">
              <span>Duration: {recommendation.duration}</span>
              <span>Placement: {recommendation.placement}</span>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => onComplete?.(recommendation.course)}
                className="w-full rounded-lg bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] py-2.5 text-xs font-semibold text-[var(--navy-deeper)]"
              >
                Apply for this course
              </button>
              <button
                type="button"
                onClick={() => setState({ step: 1, interest: null, duration: null, goal: null })}
                className="w-full rounded-lg border border-[var(--navy)] py-2.5 text-xs font-medium text-[var(--navy)]"
              >
                Retake Quiz
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default QuickCareerQuiz;
