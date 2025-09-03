// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#4CAF50",   // Parrot Green
          secondary: "#1B263B", // Deep Blue
          accent1: "#FFD166",   // Yellow
          accent2: "#EF476F",   // Coral Red
          text: "#2D3142",      // Text primary
          muted: "#6B7280",     // Text secondary
          bg: "#FAFAFA",        // Background
          surface: "#FFFFFF",   // Card surface
          border: "#E5E7EB",    // Neutral border
        },
      },
      borderRadius: {
        xl: "16px",
        "2xl": "18px",
      },
      boxShadow: {
        card: "0 10px 30px rgba(0,0,0,.08)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
