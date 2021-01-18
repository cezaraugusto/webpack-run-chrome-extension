const CopyPlugin = require('copy-webpack-plugin')

const resolveManifest = require('../../resolveManifest')
const backgroundCSSEntry = require('./backgroundCss')
// Const bookmarksOverrideCSSEntry = require('./bookmarksOverrideCss')
// const contentCSSEntry = require('./contentCss')
// const devtoolsCSSEntry = require('./devtoolsCss')
// const historyOverrideCSSEntry = require('./historyOverrideCss')
// const localesEntry = require('./locales')
// const manifestEntry = require('./manifest')
// const newtabOverrideCSSEntry = require('./newtabOverrideCss')
// const optionsCSSEntry = require('./optionsCss')
// const popupCSSEntry = require('./popupCss')
// const webAccessibleResourcesEntry = require('./webAccessibleResources')

module.exports = function (compiler, extensionPath) {
  const manifestPath = resolveManifest(extensionPath)

  return compiler.hooks.watchRun.tapAsync(
    'open-chrome-extension',
    async (compilation, done) => {
      new CopyPlugin({
        patterns: [
          ...await backgroundCSSEntry(manifestPath)
          // ...await bookmarksOverrideCSSEntry(manifestPath),
          // ...await contentCSSEntry(manifestPath),
          // ...await devtoolsCSSEntry(manifestPath),
          // ...await historyOverrideCSSEntry(manifestPath),
          // ...await localesEntry(manifestPath),
          // ...await manifestEntry(manifestPath),
          // ...await newtabOverrideCSSEntry(manifestPath),
          // ...await optionsCSSEntry(manifestPath),
          // ...await popupCSSEntry(manifestPath),
          // ...await webAccessibleResourcesCSSEntry(manifestPath)
        ]
      }).apply(compiler)
      done()
    }
  )
}
