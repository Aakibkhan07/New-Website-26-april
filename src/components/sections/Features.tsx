"use client";

import { motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";
import GlassCard from "../GlassCard";

const features = [
  {
    title: "AI-Powered Strategy Automation",
    description:
      "Deploy machine learning models to automate complex trading strategies with real-time market adaptation.",
    icon: "⚡",
  },
  {
    title: "Multi-Asset Trading",
    description:
      "Trade across stocks, options, futures, and crypto with unified infrastructure and real-time position management.",
    icon: "📊",
  },
  {
    title: "Real-Time Analytics",
    description:
      "Monitor market conditions with institutional-grade data feeds and advanced charting capabilities.",
    icon: "📈",
  },
  {
    title: "Low-Latency Execution",
    description:
      "Execute trades with microsecond precision through optimized routing to major exchanges.",
    icon: "🚀",
  },
  {
    title: "Risk Management Tools",
    description:
      "Advanced position sizing, stop-loss automation, and portfolio-level risk monitoring.",
    icon: "🛡️",
  },
  {
    title: "24/7 API Access",
    description:
      "Integrate with your existing systems through our comprehensive REST and WebSocket APIs.",
    icon: "🔌",
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

export default function Features() {
  return (
    <SectionWrapper id="features" className="bg-secondary/20">
      <div className="mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-balance"
        >
          Powerful Features for Serious Traders
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-foreground/60 max-w-2xl text-balance"
        >
          Everything you need to execute professional-grade trading strategies
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {features.map((feature, index) => (
          <motion.div key={index} variants={itemVariants}>
            <GlassCard>
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
