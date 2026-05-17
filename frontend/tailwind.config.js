/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          950: '#020817',
          900: '#0a0f1e',
          800: '#0d1426',
          700: '#131d35',
          600: '#1a2640',
        },
        neon: {
          blue: '#00d4ff',
          cyan: '#22d3ee',
        },
        ipl: {
          orange: '#ff6b00',
          gold: '#ffd700',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'waveform': 'waveform-anim 0.8s ease-in-out infinite alternate',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,212,255,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0,212,255,0.7)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'waveform-anim': {
          'from': { height: '4px' },
          'to': { height: '28px' },
        },
      },
      boxShadow: {
        'neon-blue': '0 0 20px rgba(0,212,255,0.3)',
        'neon-orange': '0 0 20px rgba(255,107,0,0.4)',
        'glass': '0 8px 32px rgba(0,0,0,0.4)',
      },
      backgroundImage: {
        'captain-gradient': 'linear-gradient(135deg, #00d4ff 0%, #6366f1 50%, #10b981 100%)',
      },
    },
  },
  plugins: [],
}
