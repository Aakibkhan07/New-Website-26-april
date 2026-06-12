"use client";

import { motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";
import Button from "../Button";

export default function CTA() {
  return (
    <SectionWrapper className="bg-gradient-to-b from-primary/5 to-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
          Ready to Elevate Your Trading?
        </h2>

        <p className="text-lg text-foreground/70 mb-8 text-balance">
          Join 500+ institutional traders running their strategies on Trade
          Metrix AI. Start your free trial today with no credit card required.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex gap-4 justify-center flex-wrap mb-8"
        >
          <Button variant="primary" size="lg">
            Start Free Trial
          </Button>
          <Button variant="outline" size="lg">
            Schedule Demo
          </Button>
        </motion.div>

        <p className="text-sm text-foreground/50">
          No credit card required. Access all features for 14 days.
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
