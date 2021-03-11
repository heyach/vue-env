const path = require('path');
const merge = require('webpack-merge')
const webpackConfig = require('./webpack.config')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge(webpackConfig, {
  devtool: "#source-map",
  output: {
    path: path.join(__dirname, '../hhh'),
    publicPath: '/',
    filename: 'js/[name].[hash:8].js'
  },
  devServer: {
    port: 8080,
    proxy: {
      '/': {
        target: 'http://127.0.0.1:5000',
        changOrigin: true,
        // pathRewrite: { '^/api': '' }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html')
    }),
    new CopyWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
})
