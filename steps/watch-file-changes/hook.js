const watchService = require('./watch-service')

module.exports = function (compiler, wss, extensionPath) {
  return compiler.hooks.watchRun.tapAsync(
    'open-chrome-extension',
    (compilation, done) => {
      const files = compilation.modifiedFiles || new Set()
      const changedFile = files.values().next().value

      watchService(wss, extensionPath, changedFile)
      done()
    }
  )
}
