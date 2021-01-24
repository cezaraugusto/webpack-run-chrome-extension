const backgroundPageHTMLEntry = require('./backgroundPage')
const bookmarksOverridePageHTMLEntry = require('./bookmarks')
const devtoolsPageHTMLEntry = require('./devtools')
const historyOverridePageHTMLEntry = require('./history')
const newtabOverridePageHTMLEntry = require('./newtab')
const optionsPageHTMLEntry = require('./options')
const popupPageHTMLEntry = require('./popup')

module.exports = function (extensionPath) {
  return [
    backgroundPageHTMLEntry(extensionPath),
    bookmarksOverridePageHTMLEntry(extensionPath),
    devtoolsPageHTMLEntry(extensionPath),
    historyOverridePageHTMLEntry(extensionPath),
    newtabOverridePageHTMLEntry(extensionPath),
    optionsPageHTMLEntry(extensionPath),
    popupPageHTMLEntry(extensionPath)
  ]
}
