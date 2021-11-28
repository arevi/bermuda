const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  entry: path.join(__dirname, '../src/index.tsx'),
  name: 'react',
  target: ['web', 'electron-renderer'],
  mode: 'production',
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
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader' },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './images',
              filename: '[name].[contenthash].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  output: {
    path: path.join(__dirname, '../../../dist/prod/app'),
    filename: './js/[name].[chunkhash].js',
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, '../public/index.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: './css/[name].[contenthash].css',
      ignoreOrder: false,
    }),
  ],
};

module.exports = config;
