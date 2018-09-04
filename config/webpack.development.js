const merge = require('webpack-merge')
const webpack = require('webpack')
const commonWebpackConfig = require('./webpack.common')
const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = merge(commonWebpackConfig, {
  devtool: 'inline-source-map',
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new Dotenv()
  ]
})
