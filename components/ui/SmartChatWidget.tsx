"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Minus, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { QuickCareerQuiz } from "./QuickCareerQuiz";

interface SmartChatWidgetProps {
  counsellorName?: string;
  counsellorPhoto?: string;
  responseTime?: string;
  className?: string;
}

export function SmartChatWidget({
  counsellorName = "Priya",
  counsellorPhoto,
  responseTime = "5 minutes",
  className,
}: SmartChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "quiz">("chat");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Chat Widget Lead",
          phone,
          course: "General Inquiry",
          source: "Smart Chat Widget",
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setPhone("");
      }
    } catch {
      // Handle error silently
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      <AnimatePresence mode="wait">
        {!isOpen ? (
          // Collapsed state - floating button
          <motion.button
            key="collapsed"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            onClick={() => setIsOpen(true)}
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--gold-light)] text-[var(--navy-deeper)] shadow-lg"
            style={{ boxShadow: "0 4px 20px rgba(201, 167, 86, 0.4)" }}
            aria-label="Open chat widget"
          >
            <MessageCircle size={22} />
            
            {/* Pulse ring animation */}
            <span className="absolute inset-0 animate-ping rounded-full bg-[var(--gold)] opacity-30" />
            
            {/* Chat label */}
            <span className="absolute -top-1 right-0 rounded-full bg-[var(--navy)] px-2 py-0.5 text-[10px] font-semibold text-white">
              Chat
            </span>
          </motion.button>
        ) : (
          // Expanded state - chat panel
          <motion.div
            key="expanded"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="flex w-[280px] flex-col overflow-hidden rounded-[20px] bg-white shadow-xl"
            style={{ boxShadow: "0 20px 60px rgba(18,56,132,0.2)" }}
            role="dialog"
            aria-label="Chat with counsellor"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-[var(--navy-deeper)] px-4 py-3">
              <span className="text-sm font-semibold text-white">Smart Chat</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded p-1 text-white/70 hover:bg-white/10 hover:text-white"
                  aria-label="Minimize"
                >
                  <Minus size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded p-1 text-white/70 hover:bg-white/10 hover:text-white"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[var(--border-navy)]">
              <button
                type="button"
                onClick={() => setActiveTab("chat")}
                className={cn(
                  "flex-1 py-2 text-xs font-medium transition",
                  activeTab === "chat"
                    ? "border-b-2 border-[var(--gold)] text-[var(--navy)]"
                    : "text-[var(--text-muted)] hover:text-[var(--navy)]"
                )}
              >
                Get a Call
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("quiz")}
                className={cn(
                  "flex-1 py-2 text-xs font-medium transition",
                  activeTab === "quiz"
                    ? "border-b-2 border-[var(--gold)] text-[var(--navy)]"
                    : "text-[var(--text-muted)] hover:text-[var(--navy)]"
                )}
              >
                Career Quiz
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-4">
              <AnimatePresence mode="wait">
                {activeTab === "chat" ? (
                  <motion.div
                    key="chat"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.15 }}
                  >
                    {/* Counsellor photo */}
                    <div className="mb-3 flex justify-center">
                      <div
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[var(--navy)] to-[var(--navy-light)] text-xl font-bold text-white"
                        style={{ border: "3px solid var(--gold)" }}
                      >
                        {counsellorPhoto ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={counsellorPhoto}
                            alt={counsellorName}
                            className="h-full w-full rounded-full object-cover"
                          />
                        ) : (
                          counsellorName.charAt(0)
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <p className="text-center font-heading text-base text-[var(--navy-dark)]">
                      Quick Career Quiz & Chat
                    </p>
                    <p className="mt-1 text-center text-xs text-[var(--text-muted)]">
                      Find the right course in 75 secs
                    </p>

                    {/* Form */}
                    {!isSuccess ? (
                      <form onSubmit={handleSubmit} className="mt-4">
                        <div className="flex items-center gap-2 rounded-lg border border-[var(--border-navy)] px-3 py-2 focus-within:border-[var(--navy)]">
                          <Phone size={16} className="text-[var(--text-muted)]" />
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Your Number"
                            className="flex-1 bg-transparent text-sm text-[var(--text-body)] outline-none placeholder:text-[var(--text-muted)]"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] py-2.5 text-xs font-semibold text-[var(--navy-deeper)] disabled:opacity-60"
                        >
                          {isSubmitting ? "Sending..." : "Request for Counselling"}
                        </button>
                      </form>
                    ) : (
                      <div className="mt-4 rounded-lg bg-green-50 p-3 text-center text-sm text-green-700">
                        {"We'll call you back shortly!"}
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="quiz"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.15 }}
                  >
                    <QuickCareerQuiz
                      onComplete={(course) => {
                        console.log("Quiz completed with course:", course);
                        setActiveTab("chat");
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-center gap-2 border-t border-[var(--border-navy)] py-2 text-xs text-[var(--text-muted)]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              Online - Replies in {responseTime}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SmartChatWidget;
