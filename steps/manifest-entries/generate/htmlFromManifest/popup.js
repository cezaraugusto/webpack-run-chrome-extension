const path = require('path')

module.exports = function (manifestPath) {
  const manifest = require(manifestPath)

  if (
    !manifest ||
    !manifest.browser_action ||
    !manifest.browser_action.default_popup
  ) return ''

  return path.resolve(
    path.dirname(manifestPath),
    manifest.browser_action.default_popup
  )
}
