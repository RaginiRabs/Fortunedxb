/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ThemeContext toggles `.dark` on <html>; enables dark: variants
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Luxury design tokens. Light = DEFAULT, dark = `.dark` key, used via
      // explicit `dark:` variants (e.g. `bg-background dark:bg-background-dark`).
      colors: {
        background: {
          DEFAULT: '#FAF6F1', // Light Mode canvas
          dark: '#1C1815',    // Dark Mode canvas
        },
        surface: {
          DEFAULT: '#FFFFFF', // Light Mode cards / containers
          dark: '#262019',    // Dark Mode cards / containers
        },
        // `card` kept as alias of surface for any legacy references
        card: {
          DEFAULT: '#FFFFFF',
          dark: '#262019',
        },
        border: {
          DEFAULT: '#E7DED4', // Light hairline
          dark: '#3A322B',    // Dark hairline
        },
        brand: {
          DEFAULT: '#775F59', // Corporate identity tone
          light: '#A8948D',   // Lightened for dark-mode legibility
        },
        primary: {
          DEFAULT: '#B0905E', // Muted champagne gold accent (same both modes)
          light: '#C7AC82',
          dark: '#93764A',
          pale: '#E2D3B8',
        },
        // gold alias → champagne, for any Tailwind `gold-*` references
        gold: {
          DEFAULT: '#B0905E',
          light: '#C7AC82',
          dark: '#93764A',
          pale: '#E2D3B8',
        },
        navy: {
          DEFAULT: '#0B1A2A',
          light: '#1E3A5F',
          dark: '#061220',
        },
        foreground: {
          DEFAULT: '#463833',   // Headings / critical text — light
          dark: '#F2EAE3',      // Headings / critical text — dark
          muted: '#6E5C53',     // Body / descriptive — light
          mutedDark: '#C3B4AA', // Body / descriptive — dark
        },
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
