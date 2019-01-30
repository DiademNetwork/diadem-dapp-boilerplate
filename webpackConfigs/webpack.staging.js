const webpack = require('webpack')
const webpackConfigMerger = require('./webpackConfigMerger')
const Dotenv = require('dotenv-webpack')
const path = require('path')
const commonWebpackConfig = require('./webpack.common')

console.log(process.env.BACKEND_URL)
console.log(!!process.env.BACKEND_URL)

module.exports = webpackConfigMerger(commonWebpackConfig, {
  devtool: 'inline-source-map',
  mode: 'production',
  // In CI, env variables are passed directly
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
    new Dotenv({ path: path.join(__dirname, '../envs/.staging.env') })
  ]
})
