/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        backgroundAccent: "var(--background-accent)",
        foreground: "var(--foreground)",
        branding: "var(--branding)",
        brandingDark: "var(--branding-dark)",
        brandingLight: "var(--branding-light)",
        accent: "var(--accent)",
        darkAccent: "var(--dark-accent)",
        lightAccent: "var(--light-accent)",
        primary: "var(--primary)",
        border: "var(--border)",
        footer: "var(--footer)",
      },
    },
  },
  darkMode: "selector",
  plugins: [],
};
