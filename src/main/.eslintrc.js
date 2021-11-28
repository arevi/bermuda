const path = require('path');

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'airbnb-typescript/base',
    'prettier',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parserOptions: {
    project: path.join(__dirname, './tsconfig.json'),
  },
  ignorePatterns: ['.eslintrc.js', 'configs', 'webpack.config.*.ts', 'preload'],
  rules: {
    /* Prevents unformatted code from passing linting */
    'prettier/prettier': 'error',
    /* Terrible rule, breaks electron imports */
    'import/no-extraneous-dependencies': 'off',
  },
};
