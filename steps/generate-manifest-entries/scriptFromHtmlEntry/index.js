const bookmarksOverrideScriptEntry = require('./bookmarksOverrideScript')
// const devtoolsScriptEntry = require('./devtoolsScript')
// const historyOverrideScriptEntry = require('./historyOverrideScript')
// const newtabOverrideScriptEntry = require('./newtabOverrideScript')
// const optionsScriptEntry = require('./optionsScript')
// const popupScriptEntry = require('./popupScript')

module.exports = async function (manifestPath) {
  return [
    ...await bookmarksOverrideScriptEntry(manifestPath)
    // ...await devtoolsScriptEntry(manifestPath)
    // ...await historyOverrideScriptEntry(manifestPath)
    // ...await newtabOverrideScriptEntry(manifestPath)
    // ...await optionsScriptEntry(manifestPath)
    // ...await popupScriptEntry(manifestPath)
  ]
}
