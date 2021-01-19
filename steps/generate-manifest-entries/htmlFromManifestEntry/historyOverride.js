const path = require('path')
const os = require('os')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function (compiler, manifestPath) {
  const manifest = require(manifestPath)

  if (
    !manifest ||
    !manifest.chrome_url_overrides ||
    !manifest.chrome_url_overrides.history
  ) return {}

  const history = manifest.chrome_url_overrides.history

  new HtmlWebpackPlugin({
    // This is a virtual space and doesn't create any folder,
    // but since we need to declare a filename, at least
    // the path is a real temp path
    filename: path.join(os.tmpdir(), history),
    // TODO
    chunks: ['history'],
    template: path.resolve(path.dirname(manifestPath), history),
    inject: false
  }).apply(compiler)
}
