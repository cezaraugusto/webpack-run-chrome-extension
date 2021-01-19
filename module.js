const resolvePort = require('./steps/resolvePort')
const serveSocket = require('./steps/serveSocket')
const generateReloadExtension = require('./steps/generateReloadExtension')
const assetFromManifestEntry =
  require('./steps/generate-manifest-entries/assetFromManifestEntry/hook')
const scriptFromManifestEntry =
  require('./steps/generate-manifest-entries/scriptFromManifestEntry/hook')
const htmlFromManifestEntry =
  require('./steps/generate-manifest-entries/htmlFromManifestEntry/hook')
const cssFromHtmlEntry =
  require('./steps/generate-manifest-entries/cssFromHtmlEntry/hook')
const scriptFromHtmlEntry =
  require('./steps/generate-manifest-entries/htmlFromManifestEntry/hook')
const watchFileChangesHook = require('./steps/watch-file-changes/hook')
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
    // Get relevant HTML entries from manifest file.
    // Includes locale and the webAccessibleResources array.
    assetFromManifestEntry(compiler, this.extensionPath)
    // Get JavaScript entries from manifest file.
    // Includes background and content scripts.
    scriptFromManifestEntry(compiler, this.extensionPath)
    // Get relevant HTML entries from manifest file.
    // Includes all manifest fields that accept HTML values.
    htmlFromManifestEntry(compiler, this.extensionPath)
    // Get relevant script entries by scrapping HTML pages
    // defined in the manifest file. Includes all scripts
    // defined in every HTML page declared in the manifest file.
    scriptFromHtmlEntry(compiler, this.extensionPath)
    // Get relevant CSS entries by scrapping HTML pages
    // defined in the manifest file. Includes all CSS
    // defined in every HTML page declared in the manifest file.
    cssFromHtmlEntry(compiler, this.extensionPath)
    // Actually watch changes This will trigger different
    // reload strategies based on the manifest field the
    // file is included. See the method itself for info..
    watchFileChangesHook(compiler, wss, this.extensionPath)
    // Serve the extension to the browser. At this point
    // the manager extension setup and the client extension
    // with key files being watched.
    // Now we inject these two extensions into the browser.
    serveExtension(this)
  }
}

module.exports = RunChromeExtension
