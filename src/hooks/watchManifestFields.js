const resolveManifest = require('../resolvers/resolveManifest')
const extensionManifestAssets = require('extension-manifest-assets')

module.exports = function (compiler, extensionPath) {
  return compiler.hooks.afterCompile.tapAsync(
    'run-chrome-extension',
    async (compilation, done) => {
      const manifestPath = resolveManifest(extensionPath)
      const entries = await extensionManifestAssets(manifestPath)

      entries.all.forEach(path => compilation.fileDependencies.add(path))
      done()
    }
  )
}
