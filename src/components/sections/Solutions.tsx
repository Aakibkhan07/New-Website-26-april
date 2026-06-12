"use client";

import { motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";
import GlassCard from "../GlassCard";

const solutions = [
  {
    title: "Algorithmic Traders",
    description:
      "Deploy and backtest complex algorithms with instant market feedback and multi-leg execution.",
    features: ["Backtesting Engine", "Multi-leg Orders", "Custom Indicators"],
  },
  {
    title: "Quantitative Funds",
    description:
      "Manage large portfolios with systematic risk controls and real-time performance analytics.",
    features: [
      "Portfolio Management",
      "Risk Monitoring",
      "Performance Analytics",
    ],
  },
  {
    title: "Day Traders",
    description:
      "Execute high-frequency strategies across multiple markets with low-latency connections.",
    features: ["Low Latency", "Multi-Market", "Real-time Alerts"],
  },
  {
    title: "Options Traders",
    description:
      "Advanced options analytics with volatility modeling and greek calculations.",
    features: ["Volatility Models", "Greeks Calculator", "Chain Analysis"],
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

export default function Solutions() {
  return (
    <SectionWrapper id="solutions" className="bg-secondary/20">
      <div className="mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4 text-balance"
        >
          Solutions Built for Every Trader
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-foreground/60 max-w-2xl text-balance"
        >
          Tailored trading infrastructure for different strategies and styles
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid md:grid-cols-2 gap-6"
      >
        {solutions.map((solution, index) => (
          <motion.div key={index} variants={itemVariants}>
            <GlassCard>
              <h3 className="text-2xl font-bold mb-3">{solution.title}</h3>
              <p className="text-foreground/70 mb-6">{solution.description}</p>
              <div className="flex flex-wrap gap-2">
                {solution.features.map((feature, i) => (
                  <span
                    key={i}
                    className="text-sm px-3 py-1 rounded-full border border-primary/30 text-primary/80"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
