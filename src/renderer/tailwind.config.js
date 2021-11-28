module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./src/renderer/**/*.tsx'],
  },
  darkMode: 'class',
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
