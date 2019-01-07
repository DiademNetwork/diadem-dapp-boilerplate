const webpackConfigMerger = require('./webpackConfigMerger')
const Dotenv = require('dotenv-webpack')
const path = require('path')
const testnetWebpackConfig = require('./webpack.testnet')

module.exports = webpackConfigMerger(testnetWebpackConfig, {
  devtool: 'source-map',
  mode: 'production',
  plugins: [
    new Dotenv({ path: path.join(__dirname, '../envs/.mainnet.env') })
  ]
})
