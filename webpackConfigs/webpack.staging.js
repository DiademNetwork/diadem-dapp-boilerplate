const webpackConfigMerger = require('./webpackConfigMerger')
const Dotenv = require('dotenv-webpack')
const path = require('path')
const commonWebpackConfig = require('./webpack.common')

module.exports = webpackConfigMerger(commonWebpackConfig, {
  devtool: 'inline-source-map',
  mode: 'production',
  plugins: [
    // In CI, env variables are passed directly
    // and so are not needed to be added
    process.env.BACKEND_URL ? new Dotenv({ path: path.join(__dirname, '../envs/.staging.env') }) : null
  ]
})
