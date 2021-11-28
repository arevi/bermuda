const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const config = {
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
    path: path.join(__dirname, '../../dist/dev/app/js'),
    filename: '[name].[chunkhash].js',
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, '../public/index.html'),
      filename: 'index.html',
    }),
  ],
};

module.exports = config;
