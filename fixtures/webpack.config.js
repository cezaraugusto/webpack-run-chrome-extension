const path = require('path')
const OpenChromeExtension = require('../module')

module.exports = {
  mode: 'development',
  watch: true,
  entry: {
    background: path.resolve(__dirname, './testExtension/src/background.js')
  },
  plugins: [
    new OpenChromeExtension({
      extensionPath: path.resolve(__dirname, './testExtension')
    })
  ]
}
