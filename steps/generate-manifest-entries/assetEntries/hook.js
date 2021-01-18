const CopyPlugin = require('copy-webpack-plugin')

const resolveManifest = require('../../resolveManifest')
const backgroundCSSEntry = require('./backgroundCss')
const bookmarksOverrideCSSEntry = require('./bookmarksOverrideCss')
const contentCSSEntry = require('./contentCss')
const devtoolsCSSEntry = require('./devtoolsCss')
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
    async (compiler, done) => {
      const backgroundCss = await backgroundCSSEntry(manifestPath)
      const bookmarksOverrideCSS = await bookmarksOverrideCSSEntry(manifestPath)
      const contentCSS = await contentCSSEntry(manifestPath)
      const devtoolsCSS = await devtoolsCSSEntry(manifestPath)
      // const historyOverrideCSS = await historyOverrideCSSEntry(manifestPath)
      // const locales = await localesEntry(manifestPath)
      // const manifest = await manifestEntry(manifestPath)
      // const newtabOverrideCSS = await newtabOverrideCSSEntry(manifestPath)
      // const optionsCSS = await optionsCSSEntry(manifestPath)
      // const popupCSS = await popupCSSEntry(manifestPath)
      // const webAccessibleResourcesCSS = await webAccessibleResourcesCSSEntry(manifestPath)

      new CopyPlugin({
        patterns: [
          ...backgroundCss,
          ...bookmarksOverrideCSS,
          ...contentCSS,
          ...devtoolsCSS,
          // ...historyOverrideCSS,
          // ...locales,
          // ...manifest,
          // ...newtabOverrideCSS,
          // ...optionsCSS,
          // ...popupCSS,
          // ...webAccessibleResourcesCSS
        ]
      }).apply(compiler)
      done()
    }
  )
}
