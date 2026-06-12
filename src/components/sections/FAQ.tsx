"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../SectionWrapper";
import GlassCard from "../GlassCard";

const faqs = [
  {
    question: "How quickly can I get started with Trade Metrix AI?",
    answer:
      "Most traders are live within 24-48 hours. We provide onboarding support, documentation, and API integration assistance to get you up and running quickly.",
  },
  {
    question: "What exchanges do you support?",
    answer:
      "We support all major US exchanges including NYSE, NASDAQ, CBOE, CME, and ICE. International exchange support is available on enterprise plans.",
  },
  {
    question: "Is there a minimum trading volume requirement?",
    answer:
      "No minimum volume requirement. We serve traders of all sizes, from independent traders to large hedge funds.",
  },
  {
    question: "How does the pricing work?",
    answer:
      "We offer flexible pricing with plans starting at $499/month for individuals and custom enterprise pricing for funds and institutions.",
  },
  {
    question: "What kind of uptime guarantee do you provide?",
    answer:
      "We provide 99.9% SLA with automatic failover, redundant systems, and 24/7 monitoring. Enterprise clients get dedicated infrastructure.",
  },
  {
    question: "Can I backtest strategies before going live?",
    answer:
      "Yes, our backtesting engine supports historical data from 20+ years. You can test strategies with real market data before deployment.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <SectionWrapper id="faq" className="bg-secondary/20">
      <div className="mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4 text-balance"
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-foreground/60 max-w-2xl text-balance"
        >
          Everything you need to know about Trade Metrix AI
        </motion.p>
      </div>

      <div className="space-y-4 max-w-3xl">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <button
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
              className="w-full"
            >
              <GlassCard className="text-left hover:border-primary/50">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-bold text-lg pr-4">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-primary flex-shrink-0 mt-1"
                  >
                    ▼
                  </motion.div>
                </div>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-foreground/70 mt-4 pt-4 border-t border-border/20">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            </button>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
