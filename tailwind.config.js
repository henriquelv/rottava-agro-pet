/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        background: '#F5F5F5',
        primary: {
          500: '#3B82F6',
          600: '#2563EB',
        },
        secondary: '#0f766e',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
} 