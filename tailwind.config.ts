import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dmc: {
          black:         "#060B14",
          red:           "#0EA5E9",   // sky blue – main accent
          "red-dark":    "#0369A1",   // deeper sky
          "red-bright":  "#38BDF8",   // lighter sky highlight
          silver:        "#C8DAF0",   // soft blue-white text
          "silver-light":"#E4EFF9",
          "silver-dark": "#7A96B4",   // muted slate-blue
          "dark-1":      "#09101E",
          "dark-2":      "#0F1828",
          "dark-3":      "#142034",
          "dark-4":      "#1A2840",
        },
      },
      fontFamily: {
        cinzel:    ["var(--font-cinzel)", "serif"],
        rajdhani:  ["var(--font-rajdhani)", "sans-serif"],
        orbitron:  ["var(--font-orbitron)", "sans-serif"],
      },
      animation: {
        "pulse-blue":  "pulse-blue 2s ease-in-out infinite",
        "float":       "float 3s ease-in-out infinite",
        "spin-slow":   "spin 8s linear infinite",
        "flicker":     "flicker 4s linear infinite",
        "glow-pulse":  "glow-pulse 2s ease-in-out infinite",
      },
      keyframes: {
        "pulse-blue": {
          "0%, 100%": { boxShadow: "0 0 15px rgba(14,165,233,0.4)" },
          "50%":       { boxShadow: "0 0 30px rgba(14,165,233,0.8), 0 0 60px rgba(14,165,233,0.3)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        "flicker": {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "1" }, "93%": { opacity: "0.8" },
          "94%": { opacity: "1" }, "96%": { opacity: "0.9" },
          "97%": { opacity: "1" },
        },
        "glow-pulse": {
          "0%, 100%": { filter: "drop-shadow(0 0 8px rgba(14,165,233,0.6))" },
          "50%":       { filter: "drop-shadow(0 0 20px rgba(14,165,233,1))" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      boxShadow: {
        "red-glow":     "0 0 20px rgba(14,165,233,0.5), 0 0 40px rgba(14,165,233,0.2)",
        "red-glow-lg":  "0 0 40px rgba(14,165,233,0.7), 0 0 80px rgba(14,165,233,0.3)",
        "silver-glow":  "0 0 20px rgba(200,218,240,0.35), 0 0 40px rgba(200,218,240,0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
