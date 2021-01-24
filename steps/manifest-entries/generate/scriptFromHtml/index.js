const backgroundPageScriptEntry = require('./backgroundPage')
const bookmarksOverrideScriptEntry = require('./bookmarks')
const devtoolsScriptEntry = require('./devtools')
const historyOverrideScriptEntry = require('./history')
const newtabOverrideScriptEntry = require('./newtab')
const optionsScriptEntry = require('./options')
const popupScriptEntry = require('./popup')

module.exports = async function (manifestPath) {
  return [
    ...await backgroundPageScriptEntry(manifestPath),
    ...await bookmarksOverrideScriptEntry(manifestPath),
    ...await devtoolsScriptEntry(manifestPath),
    ...await historyOverrideScriptEntry(manifestPath),
    ...await newtabOverrideScriptEntry(manifestPath),
    ...await optionsScriptEntry(manifestPath),
    ...await popupScriptEntry(manifestPath)
  ]
}
