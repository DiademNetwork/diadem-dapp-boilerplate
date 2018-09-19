const merge = require('webpack-merge')

module.exports = merge({
  customizeArray (a, b, key) {
    // overrides plugins instead of append them
    if (key === 'plugins') {
      return b
    }

    return undefined
  }
})
