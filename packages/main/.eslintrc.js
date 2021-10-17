module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'airbnb-typescript',
    'prettier',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parserOptions: {
    tsConfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  ignorePatterns: ['.eslintrc.js', 'configs', 'webpack.config.*.ts', 'build'],
  rules: {
    /* Prevents unformatted code from passing linting */
    'prettier/prettier': 'error',
    /* Terrible rule, breaks electron imports */
    'import/no-extraneous-dependencies': 'off',
  },
};
