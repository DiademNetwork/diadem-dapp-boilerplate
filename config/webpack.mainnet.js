const merge = require('webpack-merge')
const Dotenv = require('dotenv-webpack')
const path = require('path')
const testnetWebpackConfig = require('./webpack.testnet')

module.exports = merge(testnetWebpackConfig, {
  devtool: 'source-map',
  plugins: [
    new Dotenv({ path: path.join(__dirname, '../envs/.mainnet.env') })
  ]
})
