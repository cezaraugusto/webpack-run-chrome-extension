const path = require('path')

module.exports = function (manifestPath) {
  const manifest = require(manifestPath)

  if (
    !manifest ||
    !manifest.options_ui ||
    !manifest.options_ui.page
  ) return ''

  return path.resolve(
    path.dirname(manifestPath),
    manifest.options_ui.page
  )
}
