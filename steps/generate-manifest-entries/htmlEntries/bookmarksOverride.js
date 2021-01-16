const path = require('path')
const os = require('os')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function (compiler, manifestPath) {
  const manifest = require(manifestPath)

  if (
    !manifest ||
    !manifest['chrome_url_overrides'] ||
    !manifest['chrome_url_overrides'].bookmarks
  ) return {}

  const bookmarks = manifest['chrome_url_overrides'].bookmarks

  new HtmlWebpackPlugin({
    // This is a virtual space and doesn't create any folder,
    // but since we need to declare a filename, at least
    // the path is a real temp path
    filename: path.join(os.tmpdir(), bookmarks),
    // TODO
    chunks: ['bookmarks'],
    template: path.resolve(path.dirname(manifestPath), bookmarks),
    inject: false
  }).apply(compiler)
}
