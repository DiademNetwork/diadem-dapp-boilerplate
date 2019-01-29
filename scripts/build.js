#! /usr/bin/env node
// Do not remove line above. Use to call this script without having to specify 'node'

/*
  Webpack build with development as default environment
*/

const fs = require('fs-extra')
const webpack = require('webpack')
const chalk = require('chalk')
const path = require('path')

const DEFAULT_ENV = 'development'
const env = process.env.NODE_ENV || 'development'

const getWebpackConfig = () => {
  let target = path.join(__dirname, `../webpackConfigs/webpack.${env}.js`)
  if (!fs.existsSync(target)) {
    console.log(
      chalk.yellow(`WARNING: No webpack.${env}, using webpack.${DEFAULT_ENV}`)
    )
    target = path.join(__dirname, `../webpackConfigs/webpack.${DEFAULT_ENV}`)
  }
  return require(target)
}

(function buildWithWebpack () {
  const webpackConfig = getWebpackConfig()
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      console.error(err.stack || err)
      if (err.details) {
        console.error(err.details)
      }
      return
    }

    const info = stats.toJson()

    if (stats.hasErrors()) {
      console.error(info.errors)
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings)
    }

    console.log(chalk.green(`Webpack build successful`))
  })
})()
