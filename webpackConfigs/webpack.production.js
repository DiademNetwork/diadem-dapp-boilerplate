const webpack = require('webpack')
const webpackConfigMerger = require('./webpackConfigMerger')
const stagingWebpackConfig = require('./webpack.staging')
const TerserPlugin = require('terser-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const path = require('path')

console.log(process.env.BACKEND_URL)

module.exports = webpackConfigMerger(stagingWebpackConfig, {
  devtool: 'source-map',
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
  // In CI, env variables will be available already (so process.env.BACKEND_URL will already exists)
  // and so are not needed to be added
  plugins: process.env.BACKEND_URL ? [
    new webpack.DefinePlugin({
      'process.env.BACKEND_URL': process.env.BACKEND_URL,
      'process.env.GETSTREAM_APP_KEY': process.env.GETSTREAM_APP_KEY,
      'process.env.GETSTREAM_APP_ID': process.env.GETSTREAM_APP_ID,
      'process.env.GETSTREAM_ACHIEVEMENT_COMMON_TOKEN': process.env.GETSTREAM_ACHIEVEMENT_COMMON_TOKEN,
      'process.env.SUPPORT_CONTACT_EMAIL': process.env.SUPPORT_CONTACT_EMAIL,
      'process.env.NODE_ENV': process.env.NODE_ENV
    })
  ] : [
    new Dotenv({ path: path.join(__dirname, '../envs/.production.env') })
  ]
})
