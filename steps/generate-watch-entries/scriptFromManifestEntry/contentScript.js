const path = require('path')

module.exports = function (manifestPath) {
  const manifest = require(manifestPath)

  if (
    !manifest ||
    !manifest.content_scripts ||
    !manifest.content_scripts[0].js
  ) return []

  const scripts = manifest.content_scripts[0].js

  return scripts
    .map(script => path.resolve(path.dirname(manifestPath), script))
}
