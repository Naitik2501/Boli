/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        night: "#0E1330",
        panel: "#161E4A",
        line: "#2B3780",
        snow: "#EAF0FF",
        haze: "#A8B5E8",
        sky: "#9DB4FF",
        cobalt: "#3F63E6",
        cobaltDeep: "#2F52CC",
        marigold: "#F2A93B",
      },
        fontFamily: {
          display: ["var(--font-display)", "var(--font-display-hi)", "serif"],
          body: ["var(--font-body)", "var(--font-body-hi)", "sans-serif"],
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pop: {
          "0%": { opacity: "0", transform: "scale(0.92) translateY(8px)" },
          "60%": { opacity: "1", transform: "scale(1.02) translateY(0)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        ring: {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(1.9)", opacity: "0" },
        },
        dash: {
          "0%": { "stroke-dashoffset": "1" },
          "100%": { "stroke-dashoffset": "0" },
        },
        dot: {
          "0%, 80%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "40%": { transform: "translateY(-6px)", opacity: "1" },
        },
        wave: {
          "0%": { transform: "scaleY(0.25)" },
          "100%": { transform: "scaleY(1)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.06)" },
        },
        blink: { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0.2" } },
        drift: {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(40px, -24px)" },
        },
        burst: {
          "0%": { transform: "translate(0, 0) scale(1)", opacity: "1" },
          "100%": { transform: "translate(var(--x), var(--y)) scale(0.4)", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fadeIn 0.8s ease-out both",
        "slide-down": "slideDown 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        pop: "pop 0.45s cubic-bezier(0.22, 1, 0.36, 1) both",
        float: "float 4s ease-in-out infinite",
        ring: "ring 1.6s ease-out infinite",
        dash: "dash 1.4s ease-out both",
        dot: "dot 1.1s ease-in-out infinite",
        wave: "wave 0.9s ease-in-out infinite alternate",
        breathe: "breathe 2.4s ease-in-out infinite",
        blink: "blink 1s ease-in-out infinite",
        drift: "drift 9s ease-in-out infinite alternate",
        burst: "burst 0.9s ease-out both",
      },
    },
  },
  plugins: [],
};