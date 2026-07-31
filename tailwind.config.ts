import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Light Mode - Elegant White Luxury
        light: {
          background: "#FFFFFF",
          surface: "#F8FAFC",
          text: "#0F172A",
          accent: "#0066CC",
        },
        // Dark Mode - RGB Blue Futuristic
        dark: {
          background: "rgb(2, 6, 23)",
          surface: "rgb(15, 23, 42)",
          primaryGlow: "rgb(0, 140, 255)",
          secondaryGlow: "rgb(0, 210, 255)",
          gradientStart: "rgb(0, 140, 255)",
          gradientEnd: "rgb(0, 255, 255)",
          text: "#FFFFFF",
          textSecondary: "#94A3B8",
        },
        // Glass effects
        glass: {
          light: "rgba(255, 255, 255, 0.7)",
          dark: "rgba(15, 23, 42, 0.7)",
          border: "rgba(255, 255, 255, 0.1)",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "aurora-light": "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 50%, #E2E8F0 100%)",
        "aurora-dark": "linear-gradient(135deg, rgb(2,6,23) 0%, rgb(15,23,42) 50%, rgb(2,6,23) 100%)",
        "premium-blue": "linear-gradient(135deg, rgb(0,140,255) 0%, rgb(0,255,255) 100%)",
        "premium-dark": "linear-gradient(135deg, rgb(0,140,255) 0%, rgb(0,210,255) 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "fade-in-down": "fadeInDown 0.6s ease-out",
        "fade-in-left": "fadeInLeft 0.6s ease-out",
        "fade-in-right": "fadeInRight 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-down": "slideDown 0.6s ease-out",
        "scale-in": "scaleIn 0.6s ease-out",
        "rotate-in": "rotateIn 0.6s ease-out",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        shimmer: "shimmer 2s linear infinite",
        blob: "blob 7s infinite",
        "spin-slow": "spin 3s linear infinite",
        "bounce-slow": "bounce 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInLeft: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        rotateIn: {
          "0%": { opacity: "0", transform: "rotate(-10deg)" },
          "100%": { opacity: "1", transform: "rotate(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(0, 140, 255, 0.5)" },
          "100%": { boxShadow: "0 0 20px rgba(0, 140, 255, 0.8), 0 0 30px rgba(0, 210, 255, 0.6)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
