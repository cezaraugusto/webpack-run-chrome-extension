const os = require('os')
const path = require('path')

const OpenChromeExtension = require('../module')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CopyPlugin = require('copy-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  cache: {
    type: 'filesystem',
    cacheDirectory: path.join(os.tmpdir(), 'temp_dir'),
    version: Math.random().toString()
  },
  // cacheWithContext: false,
  infrastructureLogging: {
    level: 'error',
    debug: [
      'open-chrome-extension',
      'open-chrome-extension',
      /open-chrome-extension/
    ]
  },
  mode: 'development',
  watch: true,
  devServer: {
    hot: true
    // TODO: check if it works without this
    // contentBase: path.resolve(__dirname, './demo-extension'),
    // watchContentBase: true
  },
  entry: {
    // Devtools: [
    //   path.resolve(__dirname, './demo-extension/devtools/sidebar.js'),
    //   path.resolve(__dirname, './demo-extension/devtools/devtools.js'),
    // ],
    custom: [
      path.resolve(__dirname, './demo-extension/custom/custom1.js')
    ]
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  plugins: [
    new OpenChromeExtension({
      extensionPath: path.resolve(__dirname, './demo-extension')
    }),
    // new MiniCssExtractPlugin(),
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
    //       from: path.resolve(__dirname, './demo-extension/manifest.json'),
    //       to: './dist'
    //     },
    //     // TODO: should this be handled by public path?
    //     {
    //       from: path.resolve(__dirname, './demo-extension/public'),
    //       to: './dist/public'
    //     },
    //     {
    //       from: path.resolve(__dirname, './demo-extension/content/content1.css'),
    //       to: './dist/content'
    //     },
    //     {
    //       from: path.resolve(__dirname, './demo-extension/content/content2.css'),
    //       to: './dist/content'
    //     },
    //     {
    //       from: path.resolve(__dirname, './demo-extension/custom/custom.css'),
    //       to: './dist/custom'
    //     },
    //     {
    //       from: path.resolve(__dirname, './demo-extension/devtools/devtools.css'),
    //       to: './dist/devtools'
    //     }
    //   ]
    // })
  ]
  // Module: {
  // rules: [
  //   {
  //     test: /\.css$/i,
  //     use: [MiniCssExtractPlugin.loader, 'css-loader'],
  //   },
  // ]
  // }
}
