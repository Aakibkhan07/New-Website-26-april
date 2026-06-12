"use client";

import { motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";
import GlassCard from "../GlassCard";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Founder, Quantum Trading Systems",
    quote:
      "Trade Metrix AI transformed our trading infrastructure. We went from manual execution to 500+ strategies running simultaneously with zero downtime.",
    avatar: "SC",
  },
  {
    name: "Marcus Johnson",
    role: "Portfolio Manager, Alpha Capital",
    quote:
      "The risk management tools alone have saved us millions. The automated position monitoring and exposure checks are exactly what institutional traders need.",
    avatar: "MJ",
  },
  {
    name: "Elena Rodriguez",
    role: "Head of Trading, TechFund Global",
    quote:
      "Integration was seamless. Within 48 hours we had our entire quant framework running on their infrastructure with perfect data consistency.",
    avatar: "ER",
  },
  {
    name: "David Park",
    role: "Options Trader, Independent",
    quote:
      "The low-latency execution and volatility modeling features give me the edge I need. Support team is incredibly responsive too.",
    avatar: "DP",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function Testimonials() {
  return (
    <SectionWrapper id="testimonials">
      <div className="mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4 text-balance"
        >
          Trusted by Industry Leaders
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-foreground/60 max-w-2xl text-balance"
        >
          See what professional traders are saying about Trade Metrix AI
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid md:grid-cols-2 gap-6"
      >
        {testimonials.map((testimonial, index) => (
          <motion.div key={index} variants={itemVariants}>
            <GlassCard>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-foreground/60">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-foreground/80 italic">&quot;{testimonial.quote}&quot;</p>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
