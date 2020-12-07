const findFreePort = require('find-free-port-sync')

// Steps
const serveSocket = require('./steps/serveSocket')
const generateReloadExtension = require('./steps/generateReloadExtension')
const broadcastSocketMessage = require('./steps/broadcastSocketMessage')
const serveExtension = require('./steps/serveExtension')

const port = findFreePort({ start: 1024, end: 5000 })

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

    const wss = serveSocket('localhost', port)

    // Generate the reload extension on the fly since
    // we can't tell what port is available before runtime.
    generateReloadExtension(port)

    compiler.hooks.afterEmit.tapAsync('open-chrome-extension', (_, done) => {
      broadcastSocketMessage(wss, { status: 'reloadRequested' })
      done()
    })

    serveExtension(this)
  }
}

module.exports = OpenChromeExtension
