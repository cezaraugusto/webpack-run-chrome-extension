const bookmarksOverrideCssEntry = require('./bookmarks')
const contentCssEntry = require('./content')
const devtoolsCssEntry = require('./devtools')
const historyOverrideCssEntry = require('./history')
const newtabOverrideCssEntry = require('./newtab')
const optionsCssEntry = require('./options')
const popupCssEntry = require('./popup')

module.exports = async function (manifestPath) {
  return [
    ...await bookmarksOverrideCssEntry(manifestPath),
    ...await contentCssEntry(manifestPath),
    ...await devtoolsCssEntry(manifestPath),
    ...await historyOverrideCssEntry(manifestPath),
    ...await newtabOverrideCssEntry(manifestPath),
    ...await optionsCssEntry(manifestPath),
    ...await popupCssEntry(manifestPath)
  ]
}
