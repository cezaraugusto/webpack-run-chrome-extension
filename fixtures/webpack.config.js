const path = require('path')
const OpenChromeExtension = require('../module')

function extensionPathOptionConfig () {
  return {
    mode: 'development',
    entry: {
      background: path.resolve(__dirname, './testExtension/src/background.js')
    },
    output: {
      path: path.resolve(__dirname, './testExtension/dist')
    },
    plugins: [
      new OpenChromeExtension({
        extensionPath: path.resolve(__dirname, './testExtension/dist')
      })
    ]
  }
}

module.exports = {
  extensionPathOptionConfig
}
