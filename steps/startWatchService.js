const broadcastSocketMessage = require('./broadcastSocketMessage')

module.exports = function (wss, manifestPath, changedFiles) {
  // const manifest = require(manifestPath)

  for (const file of Array.from(changedFiles)) {
    console.log('FILES CHANGED:', file)
    broadcastSocketMessage(wss, { status: 'extensionReloadRequested' })
  }
}
