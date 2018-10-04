const webpackConfigMerger = require('./webpackConfigMerger')
const commonWebpackConfig = require('./webpack.common')
const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = webpackConfigMerger(commonWebpackConfig, {
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    disableHostCheck: true,
    headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' },
    historyApiFallback: true,
    open: true,
    port: 9000
  },
  plugins: [
    new Dotenv({ path: path.join(__dirname, '../envs/.development.env') })
  ]
})
