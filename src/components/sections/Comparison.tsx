"use client";

import { motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";
import GlassCard from "../GlassCard";

const comparisonData = [
  {
    feature: "Real-Time Data",
    manual: "❌",
    automated: "✅",
  },
  {
    feature: "24/7 Trading",
    manual: "❌",
    automated: "✅",
  },
  {
    feature: "Emotion-Free Execution",
    manual: "❌",
    automated: "✅",
  },
  {
    feature: "Backtesting & Simulation",
    manual: "❌",
    automated: "✅",
  },
  {
    feature: "Risk Management Automation",
    manual: "❌",
    automated: "✅",
  },
  {
    feature: "Multi-Market Analysis",
    manual: "❌",
    automated: "✅",
  },
  {
    feature: "Scalability",
    manual: "❌",
    automated: "✅",
  },
  {
    feature: "API Integration",
    manual: "❌",
    automated: "✅",
  },
];

export default function Comparison() {
  return (
    <SectionWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
          Manual vs. Automated Trading
        </h2>
        <p className="text-lg text-foreground/60 max-w-2xl text-balance">
          See why institutional traders choose automation for competitive advantage
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="overflow-x-auto"
      >
        <div className="min-w-max">
          <GlassCard className="!p-0">
            <div className="grid grid-cols-3 gap-0">
              {/* Headers */}
              <div className="p-6 border-b border-r border-border/30">
                <p className="font-bold text-foreground/70">Feature</p>
              </div>
              <div className="p-6 border-b border-r border-border/30">
                <p className="font-bold text-foreground/70">Manual Trading</p>
              </div>
              <div className="p-6 border-b border-border/30">
                <p className="font-bold text-foreground/70">
                  Trade Metrix AI
                </p>
              </div>

              {/* Rows */}
              {comparisonData.map((row, index) => (
                <div key={index} className="contents">
                  <div className="p-6 border-b border-r border-border/30 text-foreground/80">
                    {row.feature}
                  </div>
                  <div className="p-6 border-b border-r border-border/30 text-center text-xl">
                    {row.manual}
                  </div>
                  <div className="p-6 border-b border-border/30 text-center text-xl text-primary">
                    {row.automated}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
