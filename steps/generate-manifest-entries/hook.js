const resolveManifest = require('../resolveManifest')
const assetFromManifestEntry = require('./assetFromManifestEntry')
const scriptFromManifestEntry = require('./scriptFromManifestEntry')
const scriptFromHtmlEntry = require('./scriptFromHtmlEntry')
const htmlFromManifestEntry = require('./htmlFromManifestEntry')
const cssFromHtmlEntry = require('./cssFromHtmlEntry')

module.exports = function (compiler, extensionPath) {
  return compiler.hooks.afterCompile.tapAsync(
    'open-chrome-extension',
    async (compilation, done) => {
      const manifestPath = resolveManifest(extensionPath)
      const entries = [
        // Get relevant HTML entries from manifest file.
        // Includes locale and the webAccessibleResources array.
        ...await assetFromManifestEntry(manifestPath),
        // Get JavaScript entries from manifest file.
        // Includes background and content scripts.
        ...scriptFromManifestEntry(manifestPath),
        // Get relevant HTML entries from manifest file.
        // Includes all manifest fields that accept HTML values.
        ...htmlFromManifestEntry(manifestPath),
        // Get relevant script entries by scrapping HTML pages
        // defined in the manifest file. Includes all scripts
        // defined in every HTML page declared in the manifest file.
        ...await scriptFromHtmlEntry(manifestPath),
        // Get relevant CSS entries by scrapping HTML pages
        // defined in the manifest file. Includes all CSS
        // defined in every HTML page declared in the manifest file.
        ...await cssFromHtmlEntry(manifestPath)
      ]

      // contextDependencies
      entries.forEach(path => compilation.fileDependencies.add(path))
      done()
    }
  )
}
