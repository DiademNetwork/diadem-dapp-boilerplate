#! /usr/bin/env node
// Do not remove line above. Use to call this script without having to specify 'node'

const chalk = require('chalk')
const fs = require('fs')

function deleteFolderRecursive (path) {
  if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
    fs.readdirSync(path).forEach(function (file) {
      const curPath = `${path}/${file}`

      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath)
      } else { // delete file
        fs.unlinkSync(curPath)
      }
    })

    console.log(chalk.green(`Deleting directory "${path}"...`))
    fs.rmdirSync(path)
  }
};

console.log(chalk.green('Cleaning working tree...'))

deleteFolderRecursive('./dist')

console.log(chalk.green('Successfully cleaned working tree!'))
