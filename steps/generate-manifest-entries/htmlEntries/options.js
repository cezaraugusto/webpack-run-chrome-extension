const path = require('path')
const os = require('os')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function (manifestPath) {
  const manifest = require(manifestPath)

  if (
    !manifest ||
    !manifest['options_ui'] ||
    !manifest['options_ui'].page
  ) return {}

  const options = manifest['options_ui'].page

  new HtmlWebpackPlugin({
    // This is a virtual space and doesn't create any folder,
    // but since we need to declare a filename, at least
    // the path is a real temp path
    filename: path.join(os.tmpdir(), options),
    // TODO
    chunks: [options.toString()],
    template: options,
    inject: false
  })
}
