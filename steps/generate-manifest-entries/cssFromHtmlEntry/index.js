//const backgroundCssEntry = require('./backgroundCss')
const bookmarksOverrideCssEntry = require('./bookmarksOverrideCss')
// const contentCssEntry = require('./contentCss')
// const devtoolsCssEntry = require('./devtoolsCss')
// const historyOverrideCssEntry = require('./historyOverrideCss')
// const newtabOverrideCssEntry = require('./newtabOverrideCss')
// const optionsCssEntry = require('./optionsCss')
// const popupCssEntry = require('./popupCss')

module.exports = async function (manifestPath) {
  return [
    // ...await backgroundCssEntry(manifestPath),
    ...await bookmarksOverrideCssEntry(manifestPath),
    // ...await contentCssEntry(manifestPath),
    // ...await devtoolsCssEntry(manifestPath),
    // ...await historyOverrideCssEntry(manifestPath),
    // ...await newtabOverrideCssEntry(manifestPath),
    // ...await optionsCssEntry(manifestPath),
    // ...await popupCssEntry(manifestPath)
  ]
}
