/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        spooky: {
          950: '#07060b',
          900: '#0c0a14',
          850: '#110f1c',
          800: '#161324',
          700: '#211d36',
          600: '#2f294d',
        },
        ectoplasm: {
          DEFAULT: '#10b981',
          glow: '#34d399',
          dark: '#059669',
          light: '#6ee7b7',
        },
        phantom: {
          DEFAULT: '#a855f7',
          glow: '#c084fc',
          dark: '#7e22ce',
          light: '#e9d5ff',
        },
        ghost: {
          white: '#f1f5f9',
          smoke: '#94a3b8',
          mist: 'rgba(255, 255, 255, 0.07)',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        display: ['"Cinzel Decorative"', '"Cinzel"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'flicker': 'flicker 2s infinite',
        'mist': 'mistMove 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1.5deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(52, 211, 153, 0.4))' },
          '50%': { opacity: '0.9', filter: 'drop-shadow(0 0 30px rgba(168, 85, 247, 0.7))' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
          '52%': { opacity: '0.4' },
          '54%': { opacity: '0.95' },
          '80%': { opacity: '0.9' },
          '82%': { opacity: '0.6' },
          '83%': { opacity: '1' },
        },
        mistMove: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      boxShadow: {
        'ghost-glow': '0 0 35px -5px rgba(168, 85, 247, 0.35)',
        'ecto-glow': '0 0 35px -5px rgba(16, 185, 129, 0.35)',
        'inner-dark': 'inset 0 2px 8px 0 rgba(0, 0, 0, 0.6)',
      }
    },
  },
  plugins: [],
}
