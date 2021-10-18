import path from 'path';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import { Configuration } from 'webpack';

const config: Configuration = {
  entry: path.join(__dirname, '../src/index.tsx'),
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
    path: path.join(__dirname, '../../../dist/dev'),
    filename: '[name].[chunkhash].js',
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, '../src/public/index.html'),
      hash: true,
      filename: 'index.html',
    }),
  ],
};

export default config;
