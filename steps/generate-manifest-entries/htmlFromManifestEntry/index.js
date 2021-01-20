// const popupPageHTMLEntry = require('./popupPage')
// const optionsPageHTMLEntry = require('./optionsPage')
const backgroundPageHTMLEntry = require('./backgroundPage')
// const devtoolsPageHTMLEntry = require('./devtoolsPage')
// const newtabOverridePageHTMLEntry = require('./newtabOverridePage')
// const historyOverridePageHTMLEntry = require('./historyOverridePage')

module.exports = function (extensionPath) {
  return [
    // ...popupPageHTMLEntry(extensionPath),
    // ...optionsPageHTMLEntry(extensionPath),
    backgroundPageHTMLEntry(extensionPath),
    // ...devtoolsPageHTMLEntry(extensionPath),
    // ...newtabOverridePageHTMLEntry(extensionPath),
    // ...historyOverridePageHTMLEntry(extensionPath)
  ]
}
