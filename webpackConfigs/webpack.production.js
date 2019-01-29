const webpackConfigMerger = require('./webpackConfigMerger')
const Dotenv = require('dotenv-webpack')
const path = require('path')
const testnetWebpackConfig = require('./webpack.testnet')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = webpackConfigMerger(testnetWebpackConfig, {
  devtool: 'source-map',
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
  plugins: [
    // In CI, env variables are passed directly
    // and so are not needed to be added
    process.env.BACKEND_URL ? new Dotenv({ path: path.join(__dirname, '../envs/.production.env') }) : null
  ]
})