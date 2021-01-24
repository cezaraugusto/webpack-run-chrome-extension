const backgroundScriptEntry = require('./background')
const contentScriptEntry = require('./content')

module.exports = function (manifestPath) {
  return [
    ...backgroundScriptEntry(manifestPath),
    ...contentScriptEntry(manifestPath)
  ]
}
