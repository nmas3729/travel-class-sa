/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'tc-black': '#050505',
        'tc-red': '#D7192D',
        'tc-red-dark': '#8E0B18',
        'tc-white': '#FFFFFF',
        'tc-grey-light': '#F4F4F4',
        'tc-grey-dark': '#171717',
        'tc-grey-muted': '#999999',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        'tc-soft': '0 6px 24px rgba(5,5,5,0.08)',
        'tc-subtle': '0 2px 6px rgba(5,5,5,0.06)',
      },
      borderRadius: {
        'tc-lg': '0.75rem',
        'tc-md': '0.5rem',
      },
      spacing: {
        'container': '72px',
      },
    },
  },
  plugins: [],
};
