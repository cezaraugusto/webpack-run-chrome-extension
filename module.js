// Steps
const resolvePort = require('./steps/resolvePort')
const serveSocket = require('./steps/serveSocket')
const generateReloadExtension = require('./steps/generateReloadExtension')
const startWatchService = require('./steps/startWatchService')
const resolveManifest = require('./steps/resolveManifest')
const serveExtension = require('./steps/serveExtension')

// The plugin works by opening a Node websocket server
// watched by webpack that connects to an extension
// responsible for triggering reloads on all extensions.
class RunChromeExtension {
  constructor (options = {}) {
    // User-defined options
    this.port = options.port
    this.extensionPath = options.extensionPath
    this.browserFlags = options.browserFlags
    this.userDataDir = options.userDataDir
    this.startingUrl = options.startingUrl
    this.autoReload = options.autoReload
  }

  apply (compiler) {
    // We don't need to watch anything on production
    if (compiler.options.mode === 'production') return

    const port = resolvePort(this.port)

    const wss = serveSocket(port)

    // Generate the reload extension on the fly since
    // we can't tell what port is available before runtime.
    generateReloadExtension(port)

    compiler.hooks.watchRun.tapAsync(
      'open-chrome-extension',
      (compilation, done) => {
        const extensionPath = resolveManifest(this.extensionPath)
        const changedFiles = compilation.modifiedFiles || new Map()

        startWatchService(wss, extensionPath, changedFiles)
        done()
      })

    serveExtension(this)
  }
}

module.exports = RunChromeExtension
