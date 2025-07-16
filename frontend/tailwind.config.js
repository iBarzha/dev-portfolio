/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'dark-gradient': 'linear-gradient(135deg, #0f172a 0%, #111827 100%)',
        'light-gradient': 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        'dark-animated': 'linear-gradient(-45deg, #0f0f23, #1a1a2e, #16213e, #0f3460, #533483)',
        'light-animated': 'linear-gradient(-45deg, #fef7ff, #f0f9ff, #ecfdf5, #fffbeb, #fdf2f8)',
      },
      colors: {
        // Custom theme colors
        primary: {
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
        },
        // Theme-aware surfaces
        surface: {
          light: '#ffffff',
          dark: '#0f172a',
        },
        border: {
          light: '#e2e8f0',
          dark: '#334155',
        }
      },
      animation: {
        'gradient-shift': 'gradientShift 20s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '25%': { backgroundPosition: '100% 50%' },
          '50%': { backgroundPosition: '100% 100%' },
          '75%': { backgroundPosition: '0% 100%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(56, 189, 248, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(56, 189, 248, 0.6)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}