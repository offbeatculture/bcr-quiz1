/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          50:  '#E8F5F3',
          100: '#D0EDE9',
          200: '#A1DBD3',
          300: '#5BBFB0',
          400: '#2D9E8F',
          500: '#1A7A6E',
          600: '#0F5C52',
          700: '#0B4F4A',
          800: '#083D38',
          900: '#052E2A',
        },
        amber: {
          400: '#E8A830',
          500: '#D4772C',
          600: '#B85E1A',
        },
        coral: {
          400: '#F0776A',
          500: '#C85A3C',
          600: '#A84430',
        },
        cream: {
          50:  '#FAFAF7',
          100: '#F5F0E8',
          200: '#EDE6D8',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans:  ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up':    'fadeUp 0.4s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in':    'fadeIn 0.35s ease both',
        'slide-right':'slideRight 0.38s cubic-bezier(0.22,1,0.36,1) both',
        'slide-left': 'slideLeft 0.38s cubic-bezier(0.22,1,0.36,1) both',
        'pop-in':     'popIn 0.45s cubic-bezier(0.34,1.56,0.64,1) both',
        'pulse-glow': 'pulseGlow 2.5s ease infinite',
        'breathe':    'breathe 4s ease-in-out infinite',
        'spin-slow':  'spin 0.8s linear infinite',
        'count-up':   'fadeUp 0.6s ease both',
        'heartbeat':  'heartbeat 2.5s ease infinite',
        'shimmer':    'shimmer 1.5s ease infinite',
        'float':      'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp:    { from:{ opacity:0, transform:'translateY(14px)' }, to:{ opacity:1, transform:'translateY(0)' } },
        fadeIn:    { from:{ opacity:0 }, to:{ opacity:1 } },
        slideRight:{ from:{ opacity:0, transform:'translateX(32px)' }, to:{ opacity:1, transform:'translateX(0)' } },
        slideLeft: { from:{ opacity:0, transform:'translateX(-32px)' }, to:{ opacity:1, transform:'translateX(0)' } },
        popIn:     { '0%':{ opacity:0, transform:'scale(0.82) translateY(10px)' }, '65%':{ transform:'scale(1.05) translateY(-2px)' }, '100%':{ opacity:1, transform:'scale(1) translateY(0)' } },
        pulseGlow: { '0%,100%':{ boxShadow:'0 0 0 0 rgba(232,168,48,0)' }, '50%':{ boxShadow:'0 0 22px 5px rgba(232,168,48,0.35)' } },
        breathe:   { '0%,100%':{ transform:'scale(1)' }, '50%':{ transform:'scale(1.08)' } },
        heartbeat: { '0%,100%':{ transform:'scale(1)' }, '35%':{ transform:'scale(1.18)' }, '65%':{ transform:'scale(0.93)' } },
        shimmer:   { '0%':{ backgroundPosition:'-200% 0' }, '100%':{ backgroundPosition:'200% 0' } },
        float:     { '0%,100%':{ transform:'translateY(0)' }, '50%':{ transform:'translateY(-6px)' } },
      },
      backgroundImage: {
        'gold-gradient':   'linear-gradient(135deg, #E8A830, #D4772C)',
        'teal-gradient':   'linear-gradient(135deg, #2D9E8F, #0B4F4A)',
        'shimmer-gradient':'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
      },
    },
  },
  plugins: [],
};
