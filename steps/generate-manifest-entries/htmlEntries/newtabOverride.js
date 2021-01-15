const path = require('path')
const os = require('os')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function (compiler, manifestPath) {
  const manifest = require(manifestPath)

  if (
    !manifest ||
    !manifest['chrome_url_overrides'] ||
    !manifest['chrome_url_overrides'].newtab
  ) return {}

  const newtab = manifest['chrome_url_overrides'].newtab

  new HtmlWebpackPlugin({
    // This is a virtual space and doesn't create any folder,
    // but since we need to declare a filename, at least
    // the path is a real temp path
    filename: path.join(os.tmpdir(), newtab),
    // TODO
    chunks: ['newtab'],
    template: path.resolve(path.dirname(manifestPath), newtab),
    inject: false
  }).apply(compiler)
}
