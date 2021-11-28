const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const config = {
  entry: {
    main: path.join(__dirname, '../src/main.ts'),
    preload: path.join(__dirname, '../preload/preload.ts'),
  },
  name: 'main',
  target: 'electron-main',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.ts', '.json'],
  },
  output: {
    path: path.join(__dirname, '../../../build/dev'),
    filename: '[name].js',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../assets'),
          to: path.join(__dirname, '../../../build/dev/assets'),
        },
      ],
    }),
  ],
};

module.exports = config;
