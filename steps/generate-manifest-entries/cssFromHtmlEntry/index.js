const CopyPlugin = require('copy-webpack-plugin')

const resolveManifest = require('../../resolveManifest')
const backgroundCssEntry = require('./backgroundCss')
const bookmarksOverrideCssEntry = require('./bookmarksOverrideCss')
const contentCssEntry = require('./contentCss')
const devtoolsCssEntry = require('./devtoolsCss')
const historyOverrideCssEntry = require('./historyOverrideCss')
const newtabOverrideCssEntry = require('./newtabOverrideCss')
const optionsCssEntry = require('./optionsCss')
const popupCssEntry = require('./popupCss')

module.exports = function (compiler, extensionPath) {
  const manifestPath = resolveManifest(extensionPath)

  return compiler.hooks.watchRun.tapAsync(
    'open-chrome-extension',
    async (compiler, done) => {
      const backgroundCss = await backgroundCssEntry(manifestPath)
      const bookmarksOverrideCss = await bookmarksOverrideCssEntry(manifestPath)
      const contentCss = await contentCssEntry(manifestPath)
      const devtoolsCss = await devtoolsCssEntry(manifestPath)
      const historyOverrideCss = await historyOverrideCssEntry(manifestPath)
      const newtabOverrideCss = await newtabOverrideCssEntry(manifestPath)
      const optionsCss = await optionsCssEntry(manifestPath)
      const popupCss = await popupCssEntry(manifestPath)

      new CopyPlugin({
        patterns: [
          ...backgroundCss,
          ...bookmarksOverrideCss,
          ...contentCss,
          ...devtoolsCss,
          ...historyOverrideCss,
          ...newtabOverrideCss,
          ...optionsCss,
          ...popupCss
        ]
      }).apply(compiler)
      done()
    }
  )
}
