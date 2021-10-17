import HtmlWebPackPlugin from 'html-webpack-plugin';
import { Configuration } from 'webpack';
import path from 'path';

const rootPath = path.join(__dirname, '../../');
const rendererPath = path.join(rootPath, './src/renderer/index.tsx');

const config: Configuration = {
  entry: rendererPath,
  name: 'react',
  target: ['web', 'electron-renderer'],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader' },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  output: {
    path: path.join(rootPath, './build'),
    filename: '[name].[chunkhash].js',
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/renderer/public/index.html',
      hash: true,
      filename: 'index.html',
    }),
  ],
};

export default config;
