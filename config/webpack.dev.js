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
    port: 8888,
    // 配置contentBase为根目录的src后，可以通过启动地址直接访问到本地资源
    // 如src下有一个a.png，通过http://localhost:8888/a.png即可访问到
    contentBase: path.join(__dirname, '../src'),
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changOrigin: true,
        pathRewrite: { '^/api': '' }
      },
      '/': {
          target: 'http://192.168.2.137',
          changeOrigin: false,
          pathRewrite: {
              '^/': ''
          }
      },
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
