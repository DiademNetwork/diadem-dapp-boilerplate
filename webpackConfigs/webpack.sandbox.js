const webpackConfigMerger = require('./webpackConfigMerger')
const Dotenv = require('dotenv-webpack')
const path = require('path')
const developmentWebpackConfig = require('./webpack.development')

module.exports = webpackConfigMerger(developmentWebpackConfig, {
  devtool: 'inline-source-map',
  plugins: [
    new Dotenv({ path: path.join(__dirname, '../envs/.sandbox.env') })
  ]
})
