export default {
  plugins: {
    "@tailwindcss/postcss": {},
    'cssnano': {
      preset: ['default', {
        calc: false,
      }],
    },
  }
}