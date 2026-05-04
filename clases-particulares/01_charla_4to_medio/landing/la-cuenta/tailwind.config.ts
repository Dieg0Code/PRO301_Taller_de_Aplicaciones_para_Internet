import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0E5C3A", // deep forest green — primary
          dark: "#0A4A2D",
          50: "#ECFDF5",
          100: "#DCFCE7",
          500: "#16A34A", // accent green for CTAs / cheapest price
          600: "#15803D",
          700: "#166534",
        },
        deal: {
          DEFAULT: "#F97316", // orange for savings/discount badges
          light: "#FFEDD5",
          dark: "#C2410C",
        },
        gray: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
        danger: "#DC2626",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,23,42,0.04), 0 4px 12px rgba(15,23,42,0.06)",
        "card-hover": "0 4px 8px rgba(15,23,42,0.06), 0 12px 28px rgba(15,23,42,0.10)",
      },
      keyframes: {
        ticker: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        pop: { "0%": { transform: "scale(1)" }, "50%": { transform: "scale(1.08)" }, "100%": { transform: "scale(1)" } },
      },
      animation: {
        ticker: "ticker 50s linear infinite",
        pop: "pop 240ms ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
