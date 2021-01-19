const CopyPlugin = require('copy-webpack-plugin')

const resolveManifest = require('../../resolveManifest')
// const bookmarksOverrideScriptEntry = require('./bookmarksOverrideScript')
// const devtoolsScriptEntry = require('./devtoolsScript')
// const historyOverrideScriptEntry = require('./historyOverrideScript')
// const newtabOverrideScriptEntry = require('./newtabOverrideScript')
// const optionsScriptEntry = require('./optionsScript')
// const popupScriptEntry = require('./popupScript')

module.exports = function (compiler, extensionPath) {
  const manifestPath = resolveManifest(extensionPath)

  return compiler.hooks.watchRun.tapAsync(
    'open-chrome-extension',
    async (compiler, done) => {
      const bookmarksOverrideScript = await bookmarksOverrideScript(manifestPath)
      // const devtoolsScript = await devtoolsScriptEntry(manifestPath)
      // const historyOverrideScript = await historyOverrideScriptEntry(manifestPath)
      // const newtabOverrideScript = await newtabOverrideScriptEntry(manifestPath)
      // const optionsScript = await optionsScriptEntry(manifestPath)
      // const popupScript = await popupScriptEntry(manifestPath)

      new CopyPlugin({
        patterns: [
          ...bookmarksOverrideScript,
          // ...devtoolsScript,
          // ...historyOverrideScript,
          // ...newtabOverrideScript,
          // ...optionsScript,
          // ...popupScript
        ]
      }).apply(compiler)
      done()
    }
  )
}
