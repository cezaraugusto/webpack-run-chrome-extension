const path = require('path')

module.exports = async function (manifestPath) {
  const manifest = require(manifestPath)

  if (
    !manifest ||
    !manifest.content_scripts ||
    !manifest.content_scripts[0].css
  ) return []

  const contentCss = manifest.content_scripts[0].css

  return contentCss.map(cssFile => path
    .resolve(path.dirname(manifestPath), cssFile))
}
