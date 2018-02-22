#! /usr/bin/env node
// Do not remove line above. Use to call this script without having to specify 'node'

const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')

const copyPublic = async () => {
  await fs.copy(
    path.join(__dirname, '../public'),
    path.join(__dirname, '../dist')
  )
}

copyPublic()

console.log(chalk.green('public/ folder copied to dist/ with success'))
