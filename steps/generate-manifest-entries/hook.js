const resolveManifest = require('../resolveManifest')
const backgroundScriptEntry = require('./scriptEntries/backgroundScript')
const contentScriptEntry = require('./scriptEntries/contentScript')
const popupHTMLEntry = require('./htmlEntries/popup')
const optionsHTMLEntry = require('./htmlEntries/options')
const backgroundHTMLEntry = require('./htmlEntries/background')
const devtoolsHTMLEntry = require('./htmlEntries/devtools')

module.exports = function (compiler, extensionPath) {
  const manifestPath = resolveManifest(extensionPath)

  let cachedEntry

  return compiler.hooks.entryOption.tap(
    'open-chrome-extension',
    (context, entry) => {
      const newEntry = {
        ...entry,
        ...backgroundScriptEntry(manifestPath),
        ...contentScriptEntry(manifestPath)
      }

      const { stringify } = JSON
      if (stringify(newEntry) === stringify(cachedEntry)) {
        return
      }

      compiler.options.entry = cachedEntry = newEntry

      compiler.hooks.entryOption.call(context, newEntry)

      popupHTMLEntry(manifestPath)
      optionsHTMLEntry(manifestPath)
      backgroundHTMLEntry(manifestPath)
      devtoolsHTMLEntry(manifestPath)
    }
  )
}
