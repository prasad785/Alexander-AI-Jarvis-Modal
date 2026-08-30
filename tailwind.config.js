/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jarvis: {
          dark: '#020617',
          card: '#0b1329',
          cardLight: '#1c2541',
          glow: '#3b82f6',
          neonCyan: '#00f0ff',
          neonPurple: '#d946ef',
          neonGreen: '#00ff66',
          neonRed: '#ff3366',
          neonAmber: '#ffaa00',
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 15px rgba(0, 240, 255, 0.4)',
        'glow-purple': '0 0 15px rgba(217, 70, 239, 0.4)',
        'glow-green': '0 0 15px rgba(0, 255, 102, 0.4)',
        'glow-red': '0 0 15px rgba(255, 51, 102, 0.4)',
        'glow-blue': '0 0 15px rgba(59, 130, 246, 0.4)',
      },
      animation: {
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      }
    },
  },
  plugins: [],
}
