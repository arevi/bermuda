module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-typescript', 'airbnb/hooks', 'plugin:prettier/recommended'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'warn',
  },
  ignorePatterns: [
    '.eslintrc.js',
    'configs',
    'webpack.config.*.ts',
    'tailwind.config.js',
  ],
};
