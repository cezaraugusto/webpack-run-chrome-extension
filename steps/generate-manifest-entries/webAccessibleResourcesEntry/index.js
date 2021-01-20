const fs = require('fs-extra')
const path = require('path')

function getResourcePath (manifestPath, resource) {
  return path.resolve(
    path.dirname(manifestPath),
    resource.replace('*', '')
  )
}

module.exports = async function (manifestPath) {
  const manifest = require(manifestPath)

  if (
    !manifest ||
    !manifest.web_accessible_resources
  ) return []

  const manifestResources = manifest.web_accessible_resources
  const webAccessibleResources = []

  for (const resource of manifestResources) {
    const resourcePath = getResourcePath(manifestPath, resource)
    const resourceStat = await fs.lstat(resourcePath)
    if (
      resource.endsWith('*') ||
      resourceStat.isDirectory()
    ) {
      // TODO: Accept folders and wildcards via node-glob or similar
      console.error(
        '\n[webpack-open-chrome-extension] Warning:\n\n' +
        'Directories and wildcards in webAccessibleResources\n' +
        'are currently not supported by webpack-open-chrome-extension.\n\n' +
        'Changes in your webAccessibleResources are not being watched.' +
        '\n'
      )
      return []
    } else {
      webAccessibleResources.push(resourcePath)
    }
  }
  return webAccessibleResources
}
