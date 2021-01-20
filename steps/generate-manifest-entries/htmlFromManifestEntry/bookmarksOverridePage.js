const path = require('path')

module.exports = function (manifestPath) {
  const manifest = require(manifestPath)

  if (
    !manifest ||
    !manifest.chrome_url_overrides ||
    !manifest.chrome_url_overrides.bookmarks
  ) return ''

  return path.resolve(
    path.dirname(manifestPath),
    manifest.chrome_url_overrides.bookmarks
  )
}
