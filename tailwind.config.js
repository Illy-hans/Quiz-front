import daisyui from 'daisyui';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontSize: {
          'h1': ['2.25rem', { lineHeight: '3rem' }], // Example size for h1
          'h2': ['1.875rem', { lineHeight: '2.25rem' }], // Example size for h2
          'h3': ['1.5rem', { lineHeight: '2rem' }], // Example size for h3
          'h4': ['1.25rem', { lineHeight: '1.75rem' }], // Example size for h4
          'h5': ['1rem', { lineHeight: '1.5rem' }], // Example size for h5
          'h6': ['0.875rem', { lineHeight: '1.25rem' }], // Example size for h6
      },
    },
  },
  plugins: [typography, daisyui],
  daisyui: {
    themes:["cupcake"],
  },
}

