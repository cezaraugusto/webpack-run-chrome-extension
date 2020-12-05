const {
  webSocketServer,
  webSocketServerBroadcast
} = require('./steps/serveSocket')
const serveExtension = require('./steps/serveExtension')

// The plugin works by opening a Node websocket server
// watched by webpack that connects to an extension
// responsible for triggering reloads on all extensions.
class OpenChromeExtension {
  constructor (options = {}) {
    this.isChromeOpen = false
    // User-defined options
    this.extensionPath = options.extensionPath
    this.browserFlags = options.browserFlags
    this.userDataDir = options.userDataDir
    this.startingUrl = options.startingUrl
    this.autoReload = options.autoReload
  }

  apply (compiler) {
    // We don't need to watch anything on production
    if (compiler.options.mode === 'production') return

    // Kickstart a wss server so extension can start listening to changes.
    const wss = webSocketServer('localhost', 8082)

    compiler.hooks.afterEmit.tapAsync('open-chrome-extension', (_, done) => {
      webSocketServerBroadcast(wss, { status: 'reloadRequested' })
      done()
    })

    serveExtension(this)
  }
}

module.exports = OpenChromeExtension
