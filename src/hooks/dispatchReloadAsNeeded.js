const messageProvider = require('../webSocketServer/messageDispatcher')

module.exports = function (server, compiler, extensionPath) {
  return compiler.hooks.watchRun.tapAsync(
    'open-chrome-extension',
    (compilation, done) => {
      const files = compilation.modifiedFiles || new Set()
      const changedFile = files.values().next().value

      messageProvider(server, extensionPath, changedFile)
      done()
    }
  )
}
