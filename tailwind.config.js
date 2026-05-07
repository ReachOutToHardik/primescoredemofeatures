/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#F8F9FB',
        surface: '#FFFFFF',
        card: '#FFFFFF',
        brandRed: '#E41E26',
        brandNavy: '#222A59',
        brandYellow: '#FFB81C',
        brandGreen: '#63A831',
        brandOrange: '#E55523',
        success: '#63A831',
        textPrimary: '#222A59',
        textSecondary: '#5A6478',
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        glowRed: '0 1px 2px rgba(228,30,38,0.12), 0 8px 24px rgba(228,30,38,0.20)',
        glowNavy: '0 1px 2px rgba(34,42,89,0.10), 0 8px 24px rgba(34,42,89,0.14)',
        card: '0 1px 3px rgba(34,42,89,0.06), 0 6px 24px rgba(34,42,89,0.08)',
        elevated: '0 1px 2px rgba(34,42,89,0.04), 0 12px 40px rgba(34,42,89,0.10)',
      },
      backgroundImage: {
        heroRadial:
          'radial-gradient(800px 400px at 20% 20%, rgba(228,30,38,0.05), transparent 60%), radial-gradient(600px 400px at 80% 25%, rgba(34,42,89,0.04), transparent 60%)',
        dots:
          'radial-gradient(circle at 1px 1px, rgba(34,42,89,0.07) 1px, transparent 1px)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
