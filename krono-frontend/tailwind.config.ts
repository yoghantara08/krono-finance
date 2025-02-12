import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities }) {
      addBase({});
      addComponents({});
      addUtilities({});
    }),
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4680FE",
        "primary-hover": "#5490FF",
        "primary-active": "#3666CB",

        // SECONDARY ACCENT
        accent: "#465AD5",
        "accent-hover": "#5A6BEB",
        "accent-active": "#3647A8",

        background: "#121212",
        surface: "#1A1A1A",
        elevated: "#2A2A2A",

        // TEXT
        secondary: "#B8B9BD",
        muted: "#5E5E5E",

        border: "#2C2C2C90",
        "border-hover": "#404040",

        input: "#1A1A1A",
        "input-border": "#333333",

        success: "#31DBB1",
        error: "#FC4A71",
        warning: "#FFDC30",
      },
    },
  },
} satisfies Config;
