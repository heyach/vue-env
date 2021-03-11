const path = require('path');
const merge = require('webpack-merge')
const webpackConfig = require('./webpack.config')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(webpackConfig, {
  output: {
    path: path.join(__dirname, '../static'),
    publicPath: '/static/',
    filename: 'js/[name].[hash:8].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new CleanWebpackPlugin(['static'], {
      root: path.resolve(__dirname, '..'),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../src/index.html')
    }),
    new CopyWebpackPlugin()
  ]
})
