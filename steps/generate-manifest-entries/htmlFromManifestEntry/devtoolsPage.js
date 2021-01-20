const path = require('path')

module.exports = function (manifestPath) {
  const manifest = require(manifestPath)

  if (
    !manifest ||
    !manifest.devtools_page
  ) return ''

  return path.resolve(
    path.dirname(manifestPath),
    manifest.devtools_page
  )
}
