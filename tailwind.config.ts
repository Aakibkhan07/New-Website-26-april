import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      background: "#0a0a0a",
      foreground: "#ffffff",
      primary: "#00b4ff",
      secondary: "#0f1419",
      accent: "#1a2332",
      border: "#1a2332",
      muted: "#64748b",
      white: "#ffffff",
      black: "#000000",
    },
    fontFamily: {
      sans: ["var(--font-sans)", "system-ui", "sans-serif"],
    },
    boxShadow: {
      glass: "0 8px 32px 0 rgba(0, 180, 255, 0.1)",
      "glass-hover": "0 8px 32px 0 rgba(0, 180, 255, 0.2)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    },
    animation: {
      "fade-in": "fadeIn 0.6s ease-in-out",
      "slide-up": "slideUp 0.6s ease-out",
      "pulse-glow": "pulseGlow 2s ease-in-out infinite",
    },
    keyframes: {
      fadeIn: {
        "0%": { opacity: "0" },
        "100%": { opacity: "1" },
      },
      slideUp: {
        "0%": { opacity: "0", transform: "translateY(20px)" },
        "100%": { opacity: "1", transform: "translateY(0)" },
      },
      pulseGlow: {
        "0%, 100%": { boxShadow: "0 0 20px rgba(0, 180, 255, 0.3)" },
        "50%": { boxShadow: "0 0 40px rgba(0, 180, 255, 0.6)" },
      },
    },
  },
};

export default config;
