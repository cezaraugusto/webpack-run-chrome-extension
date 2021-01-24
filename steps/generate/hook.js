const resolveManifest = require('../resolveManifest')
const scriptFromManifest = require('./scriptFromManifest')
const scriptFromHtml = require('./scriptFromHtml')
const htmlFromManifest = require('./htmlFromManifest')
const cssFromHtml = require('./cssFromHtml')

module.exports = function (compiler, extensionPath) {
  return compiler.hooks.afterCompile.tapAsync(
    'open-chrome-extension',
    async (compilation, done) => {
      const manifestPath = resolveManifest(extensionPath)
      const entries = [
        // Get JavaScript entries from manifest file.
        // Includes background and content scripts.
        ...scriptFromManifest(manifestPath),
        // Get relevant HTML entries from manifest file.
        // Includes all manifest fields that accept HTML values.
        ...htmlFromManifest(manifestPath),
        // Get relevant script entries by scrapping HTML pages
        // defined in the manifest file. Includes all scripts
        // defined in every HTML page declared in the manifest file.
        ...await scriptFromHtml(manifestPath),
        // Get relevant CSS entries by scrapping HTML pages
        // defined in the manifest file. Includes all CSS
        // defined in every HTML page declared in the manifest file.
        ...await cssFromHtml(manifestPath)
      ]

      entries.forEach(path => compilation.fileDependencies.add(path))
      done()
    }
  )
}
