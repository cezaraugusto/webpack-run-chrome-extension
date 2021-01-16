const path = require('path')
const os = require('os')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function (compiler, manifestPath) {
  const manifest = require(manifestPath)

  if (
    !manifest ||
    !manifest.background ||
    !manifest.background.page
  ) return {}

  const backgroundPage = manifest.background.page

  new HtmlWebpackPlugin({
    // This is a virtual space and doesn't create any folder,
    // but since we need to declare a filename, at least
    // the path is a real temp path
    filename: path.join(os.tmpdir(), backgroundPage),
    // TODO
    chunks: ['background-page'],
    template: path.resolve(path.dirname(manifestPath), backgroundPage),
    inject: false
  }).apply(compiler)
}
