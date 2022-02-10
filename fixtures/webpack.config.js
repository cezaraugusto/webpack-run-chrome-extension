const path = require('path')

// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CopyPlugin = require('copy-webpack-plugin')

const OpenChromeExtension = require('../module')

module.exports = {
  cache: false,
  mode: 'development',
  watch: true,
  entry: {
    // custom: [
    //   path.resolve(__dirname, './demo-extension/custom/custom1.js')
    // ]
  },
  plugins: [
    new OpenChromeExtension({
      // port: 8080,
      extensionPath: path.resolve(__dirname, './demo-extension')
    }),
    // new HtmlWebpackPlugin({
    //   filename: './dist/custom/custom.html',
    //   chunks: ['custom'],
    //   template: path.resolve(__dirname, './demo-extension/custom/custom.html'),
    //   inject: false
    // }),
    // Allows watching changes in CSS files for content scripts
    // and the public path.
    // You can get the original source filename from Asset Objects.
    // https://webpack.js.org/api/stats/#asset-objects
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, './demo-extension/custom/custom.css'),
    //       to: './dist/custom'
    //     }
    //   ]
    // })
  ]
}
