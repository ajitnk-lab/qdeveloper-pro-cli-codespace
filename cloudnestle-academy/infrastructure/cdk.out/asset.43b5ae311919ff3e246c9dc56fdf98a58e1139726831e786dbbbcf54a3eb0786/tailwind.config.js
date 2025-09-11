/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      'xs': ['1rem', { lineHeight: '1.5' }],
      'sm': ['1.125rem', { lineHeight: '1.6' }],
      'base': ['1.25rem', { lineHeight: '1.7' }],
      'lg': ['1.375rem', { lineHeight: '1.8' }],
      'xl': ['1.5rem', { lineHeight: '1.9' }],
      '2xl': ['1.75rem', { lineHeight: '2' }],
      '3xl': ['2rem', { lineHeight: '2.1' }],
      '4xl': ['2.5rem', { lineHeight: '2.2' }],
      '5xl': ['3rem', { lineHeight: '2.3' }],
      '6xl': ['4rem', { lineHeight: '2.4' }],
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
}
