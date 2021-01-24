const resolvePort = require('./steps/resolvePort')
const serveSocket = require('./steps/serveSocket')
const generateReloadExtension = require('./steps/generateReloadExtension')
const generateWatchEntriesHook = require('./steps/generate/hook')
const watchFileChangesHook = require('./steps/watch/hook')
const serveExtension = require('./steps/serveExtension')

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
    this.autoReload = options.autoReload
  }

  apply (compiler) {
    // We don't need to watch anything on production
    if (compiler.options.mode === 'production') return

    // Kickoff server
    const wss = serveSocket(this.port)
    // Generate the reload extension on the fly since
    // we can't tell what port is available before runtime.
    generateReloadExtension(this.port)
    // Generate watch files from manifest entries and
    // JS/CSS files defined in HTML files also from the manifest.
    generateWatchEntriesHook(compiler, this.extensionPath)
    // Actually watch changes This will trigger different
    // reload strategies based on the manifest field the
    // file is included. See the method itself for info.
    watchFileChangesHook(compiler, wss, this.extensionPath)
    // Serve the extension to the browser. At this point
    // the manager extension setup and the client extension
    // with key files being watched.
    // Now we inject these two extensions into the browser.
    serveExtension(this)
  }
}

module.exports = RunChromeExtension
