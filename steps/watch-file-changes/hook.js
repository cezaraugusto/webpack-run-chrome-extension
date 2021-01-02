const resolveManifest = require('../resolveManifest')
const broadcastSocketMessage = require('./broadcastSocketMessage')

module.exports = function (compiler, wss, extensionPath) {
  const manifestPath = resolveManifest(extensionPath)
  const manifest = require(manifestPath)

  return compiler.hooks.watchRun.tapAsync(
    'open-chrome-extension',
    (compilation, done) => {
      const changedFiles = compilation.modifiedFiles || new Map()

      console.log('manifest in watch-file-changes', manifest)
      // By default, this plugin watch for changes on every file
      // defined in the fields below. If the developer needs support
      // to additional files, then it must be specified as "specificEntries"
      for (const file of Array.from(changedFiles)) {
        console.log('FILES CHANGED:', file)
        broadcastSocketMessage(wss, { status: 'extensionReloadRequested' })
      }

      done()
    }
  )
}
