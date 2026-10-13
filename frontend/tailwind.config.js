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
        primary: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          accent: '#3B82F6',
          light: '#DBEAFE',
        },
        navy: {
          DEFAULT: '#0F172A',
          dark: '#020617',
          light: '#1E293B',
          surface: '#F8FAFC',
        },
        ice: {
          DEFAULT: '#EFF6FF',
          alt: '#DBEAFE',
          card: '#F0F7FF',
        },
        surface: {
          light: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          blueBorder: '#DBEAFE',
        },
        neutral: {
          main: '#0F172A',
          secondary: '#475569',
          muted: '#64748B',
          light: '#F1F5F9',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'blue-sm': '0 2px 8px -2px rgba(37, 99, 235, 0.15)',
        'blue-glow': '0 8px 30px -4px rgba(37, 99, 235, 0.25)',
        'card-subtle': '0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.03)',
        'card-hover': '0 12px 32px -4px rgba(37, 99, 235, 0.12), 0 4px 12px -2px rgba(15, 23, 42, 0.06)',
        'elevated': '0 20px 40px -10px rgba(11, 18, 32, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
