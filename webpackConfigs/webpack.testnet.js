const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpackConfigMerger = require('./webpackConfigMerger')
const Dotenv = require('dotenv-webpack')
const path = require('path')
const commonWebpackConfig = require('./webpack.common')

module.exports = webpackConfigMerger(commonWebpackConfig, {
  devtool: 'inline-source-map',
  mode: 'production',
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
