const path = require('path')
const messageProvider = require('../webSocketServer/messageDispatcher')

module.exports = function (server, compiler, extensionPath) {
  return compiler.hooks.watchRun.tapAsync(
    'open-chrome-extension',
    (compilation, done) => {
      const files = compilation.modifiedFiles || new Set()
      const changedFile = files.values().next().value

      if (!changedFile) return done()

      console.info('[Extension File Watcher] Updates on:', path.basename(changedFile))
      messageProvider(server, extensionPath, changedFile)
      done()
    }
  )
}
