const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const merge = require('webpack-merge')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
const commonWebpackConfig = require('./webpack.common')

module.exports = merge(commonWebpackConfig, {
  devtool: 'source-map',
  plugins: [
    new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        mangle: {
          safari10: true,
          keep_fnames: true
        }
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new Dotenv()
  ]
})
