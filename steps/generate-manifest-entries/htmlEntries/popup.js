const path = require('path')
const os = require('os')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function (manifestPath) {
  const manifest = require(manifestPath)

  if (
    !manifest ||
    !manifest['browser_action'] ||
    !manifest['browser_action']['default_popup']
  ) return {}

  const popup = manifest['browser_action']['default_popup']

  new HtmlWebpackPlugin({
    // This is a virtual space and doesn't create any folder,
    // but since we need to declare a filename, at least
    // the path is a real temp path
    filename: path.join(os.tmpdir(), popup),
    // TODO
    chunks: [popup.toString()],
    template: popup,
    inject: false
  })
}
