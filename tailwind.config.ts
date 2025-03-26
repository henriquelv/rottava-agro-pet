import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554'
        },
        text: {
          DEFAULT: '#1e293b',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617'
        },
        background: '#f8fafc',
        border: '#e2e8f0'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      animation: {
        'slide-up': 'slide-up 0.2s ease-out',
        'slide-down': 'slide-down 0.2s ease-out',
        'slide-left': 'slide-left 0.2s ease-out',
        'slide-right': 'slide-right 0.2s ease-out'
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'slide-down': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'slide-left': {
          '0%': { transform: 'translateX(10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        'slide-right': {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        }
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'inherit',
            a: {
              color: '#2563eb',
              '&:hover': {
                color: '#1d4ed8',
              },
            },
            '[class~="lead"]': {
              color: '#4b5563',
            },
            strong: {
              color: 'inherit',
            },
            'ol[type="A"]': {
              '--list-counter-style': 'upper-alpha',
            },
            'ol[type="a"]': {
              '--list-counter-style': 'lower-alpha',
            },
            'ol[type="A" s]': {
              '--list-counter-style': 'upper-alpha',
            },
            'ol[type="a" s]': {
              '--list-counter-style': 'lower-alpha',
            },
            'ol[type="I"]': {
              '--list-counter-style': 'upper-roman',
            },
            'ol[type="i"]': {
              '--list-counter-style': 'lower-roman',
            },
            'ol[type="I" s]': {
              '--list-counter-style': 'upper-roman',
            },
            'ol[type="i" s]': {
              '--list-counter-style': 'lower-roman',
            },
            'ol[type="1"]': {
              '--list-counter-style': 'decimal',
            },
            'ul > li': {
              paddingLeft: '1.5em',
            },
            'ul > li::before': {
              width: '0.375em',
              height: '0.375em',
              top: 'calc(0.875em - 0.1875em)',
              left: '0.25em',
              borderRadius: '50%',
              backgroundColor: 'currentColor',
              opacity: 0.4,
            },
            hr: {
              borderColor: 'currentColor',
              opacity: 0.1,
            },
            blockquote: {
              fontWeight: '500',
              fontStyle: 'italic',
              color: 'inherit',
              borderLeftWidth: '0.25rem',
              borderLeftColor: 'currentColor',
              opacity: 0.6,
              quotes: '"\\201C""\\201D""\\2018""\\2019"',
            },
            'blockquote p:first-of-type::before': {
              content: 'open-quote',
            },
            'blockquote p:last-of-type::after': {
              content: 'close-quote',
            },
            h1: {
              color: 'inherit',
            },
            h2: {
              color: 'inherit',
            },
            h3: {
              color: 'inherit',
            },
            h4: {
              color: 'inherit',
            },
            'figure figcaption': {
              color: 'inherit',
              opacity: 0.6,
            },
            code: {
              color: 'inherit',
              fontWeight: '600',
            },
            'code::before': {
              content: '"`"',
            },
            'code::after': {
              content: '"`"',
            },
            'a code': {
              color: 'inherit',
            },
            pre: {
              color: '#e5e7eb',
              backgroundColor: '#1f2937',
              overflowX: 'auto',
            },
            'pre code': {
              backgroundColor: 'transparent',
              borderWidth: '0',
              borderRadius: '0',
              padding: '0',
              fontWeight: '400',
              color: 'inherit',
              fontSize: 'inherit',
              fontFamily: 'inherit',
              lineHeight: 'inherit',
            },
            'pre code::before': {
              content: 'none',
            },
            'pre code::after': {
              content: 'none',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

export default config 