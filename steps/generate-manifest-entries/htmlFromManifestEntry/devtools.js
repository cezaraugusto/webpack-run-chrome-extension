const path = require('path')
const os = require('os')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function (compiler, manifestPath) {
  const manifest = require(manifestPath)

  if (
    !manifest ||
    !manifest.devtools_page
  ) return {}

  const devtools = manifest.devtools_page

  new HtmlWebpackPlugin({
    // This is a virtual space and doesn't create any folder,
    // but since we need to declare a filename, at least
    // the path is a real temp path
    filename: path.join(os.tmpdir(), devtools),
    // TODO
    chunks: ['browser-devtools'],
    template: path.resolve(path.dirname(manifestPath), devtools),
    inject: false
  }).apply(compiler)
}
