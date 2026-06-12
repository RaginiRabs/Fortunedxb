/** @type {import('tailwindcss').Config} */
module.exports = {
  // Light theme only. No dark mode.
  content: [
    './app/**/*.{js,jsx,mdx}',
    './components/**/*.{js,jsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette derived from the Fortune Realty L.L.C logo
        // (metallic bronze / copper clover on warm cream).
        brand: {
          DEFAULT: '#8C6A52', // copper bronze — primary accent
          light: '#A6886F',   // lighter taupe bronze
          soft: '#C4A98F',    // muted highlight
          dark: '#5E4636',    // deep bronze
          deeper: '#3A2C22',  // near-black brown — dark sections (replaces navy)
          pale: '#F2EAE1',    // pale tint — badge / chip backgrounds
        },
        cream: {
          DEFAULT: '#FAF7F3', // warm base
          100: '#F5EFE8',
        },
        ink: {
          DEFAULT: '#2E2620', // primary text
          soft: '#6B5E52',    // secondary text
          faint: '#9A8C7E',   // tertiary / labels
        },
      },
      fontFamily: {
        serif: ['var(--font-serif, ui-serif)', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['var(--font-sans, ui-sans-serif)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(58,44,34,0.04), 0 8px 24px rgba(58,44,34,0.06)',
        lift: '0 14px 44px rgba(58,44,34,0.14)',
      },
      keyframes: {
        floatUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        floatUp: 'floatUp 0.5s ease-out both',
      },
    },
  },
  plugins: [],
};
