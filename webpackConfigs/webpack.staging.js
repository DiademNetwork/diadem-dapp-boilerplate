const webpackConfigMerger = require('./webpackConfigMerger')
const TerserPlugin = require('terser-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const path = require('path')
const commonWebpackConfig = require('./webpack.common')

module.exports = webpackConfigMerger(commonWebpackConfig, {
  devtool: 'inline-source-map',
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin()
    ],
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor_app',
          chunks: 'all',
          minChunks: 2
        }
      }
    }
  },
  // In CI, env variables are passed directly
  // and so are not needed to be added
  plugins: process.env.BACKEND_URL ? [] : [
    new Dotenv({ path: path.join(__dirname, '../envs/.staging.env') })
  ]
})
