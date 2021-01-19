const resolveManifest = require('../resolveManifest')
// const assetFromManifestEntry = require('./assetFromManifestEntry/hook')
const scriptFromManifestEntry = require('./scriptFromManifestEntry')
// const htmlFromManifestEntry = require('./htmlFromManifestEntry/hook')
// const cssFromHtmlEntry = require('./cssFromHtmlEntry/hook')
// const scriptFromHtmlEntry = require('./htmlFromManifestEntry/hook')

module.exports = function (compiler, extensionPath) {
  return compiler.hooks.afterCompile.tapAsync(
    'open-chrome-extension',
    (compilation, done) => {
      const manifestPath = resolveManifest(extensionPath)
      const entries = [
        // Get relevant HTML entries from manifest file.
        // Includes locale and the webAccessibleResources array.
        // ...await assetFromManifestEntry(compiler, extensionPath)
        // Get JavaScript entries from manifest file.
        // Includes background and content scripts.
        ...scriptFromManifestEntry(manifestPath)
        // Get relevant HTML entries from manifest file.
        // Includes all manifest fields that accept HTML values.
        // ...await htmlFromManifestEntry(compiler, extensionPath)
        // Get relevant script entries by scrapping HTML pages
        // defined in the manifest file. Includes all scripts
        // defined in every HTML page declared in the manifest file.
        // ...await scriptFromHtmlEntry(compiler, extensionPath)
        // Get relevant CSS entries by scrapping HTML pages
        // defined in the manifest file. Includes all CSS
        // defined in every HTML page declared in the manifest file.
        // ...await cssFromHtmlEntry(compiler, extensionPath)
      ]

      // contextDependencies
      entries.forEach(path => compilation.fileDependencies.add(path))
      done()
    }
  )
}
