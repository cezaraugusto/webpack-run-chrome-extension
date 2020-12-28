const path = require('path')

const OpenChromeExtension = require('../module')

module.exports = {
  mode: 'development',
  entry: {
    background: path.resolve(__dirname, './sampleExtension/src/background.js')
  },
  plugins: [
    new OpenChromeExtension({
      extensionPath: path.resolve(__dirname, './sampleExtension')
    })
  ]
}
