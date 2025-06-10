import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F0F7FF',
          100: '#E0EFFF',
          200: '#B9E0FF',
          300: '#7CC5FF',
          400: '#36A9FF',
          500: '#0090FF',
          600: '#0072CC',
          700: '#005999',
          800: '#004066',
          900: '#002233',
        },
        secondary: {
          50: '#FFF0F7',
          100: '#FFE0EF',
          200: '#FFB9E0',
          300: '#FF7CC5',
          400: '#FF36A9',
          500: '#FF0090',
          600: '#CC0072',
          700: '#990059',
          800: '#660040',
          900: '#330020',
        },
        accent: {
          50: '#FDF2F6',
          100: '#FCE7F0',
          200: '#FBCFE3',
          300: '#F9A8CF',
          400: '#F472B6',
          500: '#EA4C89',
          600: '#DB2777',
          700: '#BE185D',
          800: '#9D174D',
          900: '#831843',
        },
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        display: ['var(--font-outfit)'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    },
  },
  plugins: [],
}

export default config 