import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#101318",
        cloud: "#f5f7fb",
        mint: "#37d6b3",
        ocean: "#1f8fff",
        coral: "#ff6f61"
      },
      boxShadow: {
        "soft-panel": "0 18px 50px rgba(16, 19, 24, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
