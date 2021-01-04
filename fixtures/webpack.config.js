const path = require('path')

const OpenChromeExtension = require('../module')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  watch: true,
  devServer: {
    // TODO: check if it works without this
    contentBase: path.resolve(__dirname, './demo-extension'),
    watchContentBase: true
  },
  entry: {
    background: [
      path.resolve(__dirname, './demo-extension/background/background.js'),
      path.resolve(__dirname, './demo-extension/background/command.js')
    ],
    content: [
      path.resolve(__dirname, './demo-extension/content/content1.js'),
      path.resolve(__dirname, './demo-extension/content/content2.js')
    ],
    options: [
      path.resolve(__dirname, './demo-extension/options/options1.js'),
      path.resolve(__dirname, './demo-extension/options/options2.js'),
    ],
    popup: [
      path.resolve(__dirname, './demo-extension/popup/popup1.js'),
      path.resolve(__dirname, './demo-extension/popup/popup2.js')
    ],
    custom: [
      path.resolve(__dirname, './demo-extension/custom/custom1.js'),
      path.resolve(__dirname, './demo-extension/custom/custom2.js')
    ]
  },
  plugins: [
    new OpenChromeExtension({
      extensionPath: path.resolve(__dirname, './demo-extension')
    }),
		new HtmlWebpackPlugin({
      filename: './dist/popup/popup.html',
      chunks: ['popup'],
      template: path.resolve(__dirname, './demo-extension/popup/popup.html'),
      inject: false
    }),
		new HtmlWebpackPlugin({
      filename: './dist/options/options.html',
      chunks: ['options'],
      template: path.resolve(__dirname, './demo-extension/options/options.html'),
      inject: false
    }),
		new HtmlWebpackPlugin({
      filename: './dist/custom/custom.html',
      chunks: ['custom'],
      template: path.resolve(__dirname, './demo-extension/custom/custom.html'),
      inject: false
    }),
		new HtmlWebpackPlugin({
      filename: './dist/background/background.html',
      chunks: ['background'],
      template: path.resolve(__dirname, './demo-extension/background/background.html'),
      inject: false
    }),
		new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './demo-extension/public'),
          to: './dist/custom/public'
        },
        {
          from: path.resolve(__dirname, './demo-extension/content/content1.css'),
          to: './dist/content'
        },
        {
          from: path.resolve(__dirname, './demo-extension/content/content2.css'),
          to: './dist/content'
        }
      ]
    })
  ]
}
