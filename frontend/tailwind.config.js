/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"]
      },
      colors: {
        ink: "#101318",
        mist: "#f6f7fb",
        accent: "#ff6b35",
        mint: "#34d399"
      },
      boxShadow: {
        soft: "0 12px 30px rgba(16,19,24,0.12)",
        glow: "0 14px 40px rgba(255,107,53,0.28)"
      },
      backgroundImage: {
        "hero-texture": "radial-gradient(circle at top, rgba(255,107,53,0.16), transparent 55%), radial-gradient(circle at 20% 20%, rgba(52,211,153,0.18), transparent 45%)"
      }
    }
  },
  plugins: []
};
