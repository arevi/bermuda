import path from 'path';
import { Configuration } from 'webpack';

const config: Configuration = {
  entry: path.join(__dirname, '../src/main.ts'),
  name: 'app',
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
    path: path.join(__dirname, '../../../dist/dev'),
    filename: 'app.js',
  },
  plugins: [],
};

export default config;
