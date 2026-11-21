/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#04120b',
          900: '#081d13',
          800: '#0e2b1d',
          700: '#16422c',
        },
        vigiamLeaf: '#22a31c',
        vigiamRiver: '#06b6d4',
        vigiamGold: '#eab308',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
};