#! /usr/bin/env node
// Do not remove line above. Use to call this script without having to specify 'node'

const rimraf = require('rimraf')
const path = require('path')
const chalk = require('chalk')

rimraf(path.join(__dirname, '../dist'), () => {
  console.log(chalk.green('dist/ folder emptied successfully'))
})
