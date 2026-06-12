/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts,scss}'],
  theme: {
    extend: {
      colors: {
        surface: '#051424',
        'on-surface': '#d4e4fa',
        secondary: '#ffb77d',
        'secondary-container': '#d97707',
        'on-secondary-container': '#432100',
        'surface-variant': '#273647',
        'on-surface-variant': '#c6c6cd',
        primary: '#bec6e0',
        'primary-fixed-dim': '#bec6e0',
        'secondary-fixed': '#ffdcc3'
      },
      fontFamily: {
        display: ['Newsreader', 'serif'],
        body: ['Be Vietnam Pro', 'sans-serif']
      }
    }
  },
  plugins: []
};
