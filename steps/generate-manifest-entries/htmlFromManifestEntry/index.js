const backgroundPageHTMLEntry = require('./backgroundPage')
const bookmarksOverridePageHTMLEntry = require('./bookmarksOverridePage')
const devtoolsPageHTMLEntry = require('./devtoolsPage')
const historyOverridePageHTMLEntry = require('./historyOverridePage')
const newtabOverridePageHTMLEntry = require('./newtabOverridePage')
const optionsPageHTMLEntry = require('./optionsPage')
const popupPageHTMLEntry = require('./popupPage')

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
