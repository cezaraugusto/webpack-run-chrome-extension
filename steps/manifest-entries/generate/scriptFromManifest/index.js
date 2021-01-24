const backgroundScriptEntry = require('./backgroundScript')
const contentScriptEntry = require('./contentScript')

module.exports = function (manifestPath) {
  return [
    ...backgroundScriptEntry(manifestPath),
    ...contentScriptEntry(manifestPath)
  ]
}
