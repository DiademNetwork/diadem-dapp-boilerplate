const webpack = require('webpack')
const webpackConfigMerger = require('./webpackConfigMerger')
const Dotenv = require('dotenv-webpack')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
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
  plugins: !process.env.BACKEND_URL ? [
    new webpack.EnvironmentPlugin([
      'BACKEND_URL',
      'GETSTREAM_APP_KEY',
      'GETSTREAM_APP_ID',
      'GETSTREAM_ACHIEVEMENT_COMMON_TOKEN',
      'SUPPORT_CONTACT_EMAIL',
      'NODE_ENV'
    ])
  ] : [
    new Dotenv({ path: path.join(__dirname, '../envs/.staging.env') })
  ]
})
