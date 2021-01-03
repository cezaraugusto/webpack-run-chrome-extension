const path = require('path')

const OpenChromeExtension = require('../module')

module.exports = {
  mode: 'development',
  watch: true,
  devServer: {
    watchContentBase: true
  },
  entry: {
    background: [
      // path.resolve(__dirname, './demo-extension/background/background.html'),
      path.resolve(__dirname, './demo-extension/background/background.js'),
      path.resolve(__dirname, './demo-extension/background/command.js')
    ],
    content: [
      path.resolve(__dirname, './demo-extension/content/content1.js'),
      path.resolve(__dirname, './demo-extension/content/content2.js')
    ],
    options: [
      // path.resolve(__dirname, './demo-extension/options.html'),
      path.resolve(__dirname, './demo-extension/options/options1.js'),
      path.resolve(__dirname, './demo-extension/options/options2.js'),
    ],
    popup: [
      // path.resolve(__dirname, './demo-extension/popup/popup.html'),
      path.resolve(__dirname, './demo-extension/popup/popup1.js'),
      path.resolve(__dirname, './demo-extension/popup/popup2.js')
    ],
    custom: [
      // path.resolve(__dirname, './demo-extension/custom/custom.html'),
      path.resolve(__dirname, './demo-extension/custom/custom1.js'),
      path.resolve(__dirname, './demo-extension/custom/custom2.js')
    ]
  },
  plugins: [
    new OpenChromeExtension({
      extensionPath: path.resolve(__dirname, './demo-extension')
    })
  ]
}
