const resolveManifest = require('../../resolveManifest')
const backgroundScriptEntry = require('./backgroundScript')
const contentScriptEntry = require('./contentScript')

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

      /* eslint-disable no-multi-assign */
      compiler.options.entry = cachedEntry = newEntry

      compiler.hooks.entryOption.call(context, newEntry)
    }
  )
}
