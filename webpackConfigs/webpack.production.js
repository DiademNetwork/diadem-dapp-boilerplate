const webpackConfigMerger = require('./webpackConfigMerger')
const stagingWebpackConfig = require('./webpack.staging')
const Dotenv = require('dotenv-webpack')
const path = require('path')

module.exports = webpackConfigMerger(stagingWebpackConfig, {
  devtool: 'source-map',
  // In CI, env variables are passed directly
  // and so are not needed to be added
  plugins: process.env.BACKEND_URL ? null : [
    new Dotenv({ path: path.join(__dirname, '../envs/.production.env') })
  ]
})
