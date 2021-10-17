import path from 'path';
import { Configuration } from 'webpack';

const rootPath = path.join(__dirname, '../../');
const appPath = path.join(rootPath, './src/main/main.ts');

const config: Configuration = {
  entry: '/src/main/main.ts',
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
    path: path.join(rootPath, './dist/dev'),
    filename: 'app.js',
  },
  plugins: [],
};

export default config;
