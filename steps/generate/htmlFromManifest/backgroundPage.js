const path = require('path')

module.exports = function (manifestPath) {
  const manifest = require(manifestPath)

  if (
    !manifest ||
    !manifest.background ||
    !manifest.background.page
  ) return ''

  return path
    .resolve(path.dirname(manifestPath), manifest.background.page)
}
