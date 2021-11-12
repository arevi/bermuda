import path from 'path';
import { Configuration } from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';

const config: Configuration = {
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
    path: path.join(__dirname, '../../../dist/dev'),
    filename: '[name].js',
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: '../main/assets', to: 'assets' }],
    }),
  ],
};

export default config;
