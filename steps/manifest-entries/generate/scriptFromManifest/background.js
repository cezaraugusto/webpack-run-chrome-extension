const path = require('path')

module.exports = function (manifestPath) {
  const manifest = require(manifestPath)

  if (
    !manifest ||
    !manifest.background ||
    !manifest.background.scripts
  ) return []

  const scripts = manifest.background.scripts

  return scripts
    .map(script => path.resolve(path.dirname(manifestPath), script))
}
