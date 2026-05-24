"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { facilities } from "@/data/static";

const gradients = [
  "from-[var(--navy)] to-[var(--navy-light)]",
  "from-[var(--navy-dark)] to-[var(--navy)]",
  "from-[var(--gold-dark)] to-[var(--gold)]",
  "from-[var(--navy-light)] to-[var(--navy)]",
  "from-[var(--navy-deeper)] to-[var(--navy)]",
  "from-[var(--gold)] to-[var(--gold-light)]",
];

export default function Facilities() {
  const [feature, ...rest] = facilities;

  return (
    <section className="bg-[var(--off-white)] px-4 py-14 md:px-8 md:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeader
          eyebrow="Infrastructure"
          title="World-Class Facilities"
          accent="Facilities"
          description="Everything you need to learn, practise, and excel in your healthcare career."
        />

        {feature ? (
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45 }}
            className="group mb-6 overflow-hidden rounded-2xl border border-[var(--border-navy)] bg-white md:grid md:grid-cols-[40%_60%]"
          >
            <div className="relative min-h-[240px] overflow-hidden bg-gradient-to-br from-[var(--navy-deeper)] to-[var(--navy-light)]">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_12px)] transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(9,29,71,0.6)] to-transparent" />
              <span className="absolute right-4 top-4 rounded-full bg-[var(--gold)] px-2 py-1 text-xs font-semibold text-[var(--navy-deeper)]">Featured</span>
            </div>
            <div className="border-l-4 border-[var(--gold)] p-6 md:p-8">
              <h3 className="font-heading text-3xl text-[var(--navy-dark)] md:text-4xl">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{feature.description}</p>
            </div>
          </motion.article>
        ) : null}

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((facility, index) => (
            <motion.article
              key={facility.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20, y: 16 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.42, delay: index * 0.06 }}
              className="group overflow-hidden rounded-2xl border border-[var(--border-navy)] bg-white"
            >
              <div className={`relative h-36 overflow-hidden bg-gradient-to-br ${gradients[index % gradients.length]}`}>
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_12px)] transition duration-[900ms] group-hover:scale-105 group-hover:translate-x-[2%] group-hover:translate-y-[1%]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(9,29,71,0.65)] to-transparent transition group-hover:from-[rgba(9,29,71,0.82)]" />
                <span className="absolute right-3 top-3 text-xl text-[var(--gold-light)]">✚</span>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-2xl text-[var(--navy-dark)]">{facility.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{facility.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
