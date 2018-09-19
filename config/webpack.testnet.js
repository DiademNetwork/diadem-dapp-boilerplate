const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const merge = require('webpack-merge')
const Dotenv = require('dotenv-webpack')
const path = require('path')
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
    new Dotenv({ path: path.join(__dirname, '../envs/.testnet.env') })
  ]
})
