const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

process.env.BABEL_ENV = 'development';

module.exports = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname + '/website', 'index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true
  },
  devtool: 'source-map',
  devServer: {
    static: path.resolve('dist'),
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', {
          loader: 'style-resources-loader',
          options: {
            patterns: path.resolve(__dirname, 'src/styles/theme.scss')
          }
        }]
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            ['babel-preset-react-app']
          ]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname + '/website', 'index.html')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      linkType: 'text/css'
    }),
  ],
  optimization: {
    runtimeChunk: 'single'
  }
}