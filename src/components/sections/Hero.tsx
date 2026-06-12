"use client";

import { motion } from "framer-motion";
import Button from "../Button";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto text-center z-10"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-balance"
        >
          Institutional Trading{" "}
          <span className="text-primary">Infrastructure</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto text-balance"
        >
          Deploy sophisticated trading strategies with AI-powered automation,
          real-time market analysis, and institutional-grade execution across
          multiple asset classes.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex gap-4 justify-center flex-wrap"
        >
          <Button variant="primary" size="lg">
            Start Free Trial
          </Button>
          <Button variant="outline" size="lg">
            Schedule Demo
          </Button>
        </motion.div>

        {/* Metrics */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-4 md:gap-8 mt-16 md:mt-20"
        >
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
              500+
            </div>
            <p className="text-sm md:text-base text-foreground/60">
              Active Traders
            </p>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
              $2B+
            </div>
            <p className="text-sm md:text-base text-foreground/60">
              Trading Volume
            </p>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
              99.9%
            </div>
            <p className="text-sm md:text-base text-foreground/60">Uptime</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
