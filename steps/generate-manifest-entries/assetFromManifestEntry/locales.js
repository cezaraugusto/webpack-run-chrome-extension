const os = require('os')
const path = require('path')

module.exports = function (manifestPath) {
  const manifest = require(manifestPath)

  if (
    !manifest ||
    !manifest.default_locale
  ) return []

  return path.resolve(path.dirname(manifestPath), '_locales')
}
