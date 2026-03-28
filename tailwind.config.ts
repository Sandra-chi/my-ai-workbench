import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        border: "#e5e7eb",
        input: "#e5e7eb",
        ring: "#111827",
        background: "#f8fafc",
        foreground: "#0f172a",
        primary: {
          DEFAULT: "#111827",
          foreground: "#ffffff"
        },
        secondary: {
          DEFAULT: "#f1f5f9",
          foreground: "#0f172a"
        },
        muted: {
          DEFAULT: "#f8fafc",
          foreground: "#64748b"
        },
        accent: {
          DEFAULT: "#eef2ff",
          foreground: "#1e1b4b"
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#0f172a"
        }
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem"
      },
      boxShadow: {
        soft: "0 12px 40px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
