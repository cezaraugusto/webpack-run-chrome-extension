const resolveManifest = require('../../resolveManifest')
const popupHTMLEntry = require('./popup')
const optionsHTMLEntry = require('./options')
const backgroundHTMLEntry = require('./background')
const devtoolsHTMLEntry = require('./devtools')
const newtabOverrideHTMLEntry = require('./newtabOverride')
const historyOverrideHTMLEntry = require('./historyOverride')

module.exports = function (compiler, extensionPath) {
  const manifestPath = resolveManifest(extensionPath)

  return compiler.hooks.entryOption.tap(
    'open-chrome-extension', () => {
      popupHTMLEntry(compiler, manifestPath)
      optionsHTMLEntry(compiler, manifestPath)
      backgroundHTMLEntry(compiler, manifestPath)
      devtoolsHTMLEntry(compiler, manifestPath)
      newtabOverrideHTMLEntry(compiler, manifestPath)
      historyOverrideHTMLEntry(compiler, manifestPath)
    }
  )
}
