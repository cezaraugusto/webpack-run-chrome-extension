const resolvePort = require('./src/resolvers/resolvePort')
const startServer = require('./src/webSocketServer/startServer')
const watchManifestFields = require('./src/hooks/watchManifestFields')
const dispatchReloadAsNeeded = require('./src/hooks/dispatchReloadAsNeeded')
const {runBrowserWithExtensionEnabled} = require('./src/hooks/runBrowserWithExtensionEnabled')

process.on('unhandledRejection', (error) => { throw error })

// The plugin works by opening a Node websocket server
// watched by webpack that connects to an extension
// responsible for triggering reloads on all extensions.
class RunChromeExtension {
  constructor (options = {}) {
    // User-defined options
    this.port = resolvePort(options.port)
    this.extensionPath = options.extensionPath
    this.browserFlags = options.browserFlags
    this.userDataDir = options.userDataDir
    this.startingUrl = options.startingUrl
    this.autoReload = options.autoReload || true
  }

  apply (compiler) {
    // We don't need to watch anything on production
    if (compiler.options.mode === 'production') return

    // Kickoff server
    const wss = startServer(this.port)

    // Generate watch files from manifest entries and
    // JS/CSS files defined in HTML files also from the manifest.
    // Users might wish to ignore it in favo of their own reload
    // strategies. _reloadService.js includes all of them.
    if (this.autoReload) watchManifestFields(compiler, this.extensionPath)

    // Actually watch changes This will trigger different
    // reload strategies based on the manifest field the
    // file is included. See the method itself for info.
    dispatchReloadAsNeeded(wss, compiler, this.extensionPath)

    // Serve the extension to the browser. At this point
    // the manager extension setup and the client extension
    // with key files being watched.
    // Now we inject these two extensions into the browser.
    runBrowserWithExtensionEnabled(compiler, this)
  }
}

module.exports = RunChromeExtension
