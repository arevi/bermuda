module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'airbnb-typescript',
    'prettier',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: [
    '.eslintrc.js',
    'configs',
    'webpack.config.*.ts',
    'tailwind.config.js',
    'build',
  ],
  rules: {
    /* Prevents unformatted code from passing linting */
    'prettier/prettier': 'error',
    /* Terrible rule, breaks electron imports */
    'import/no-extraneous-dependencies': 'off',
  },
};
