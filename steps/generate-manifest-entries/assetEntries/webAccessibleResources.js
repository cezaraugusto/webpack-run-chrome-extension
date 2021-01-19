const os = require('os')
const path = require('path')

module.exports = function (manifestPath) {
  const manifest = require(manifestPath)

  if (
    !manifest ||
    !manifest.web_accessible_resources
  ) return {}

  const webResources = manifest.web_accessible_resources

  return webResources.map((resource) => ({
    from: path.resolve(
      path.dirname(manifestPath),
      resource.replace('*', '')
    ),
    to: path.join(os.tmpdir(), 'webAccessibleResources')
  }))
}
