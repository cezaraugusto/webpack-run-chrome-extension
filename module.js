const ChromeLauncher = require('chrome-launcher')
const browserConfig = require('./browser.config')

process.on('SIGINT', async () => await ChromeLauncher.killAll())
process.on('SIGTERM', async () => await ChromeLauncher.killAll())

const defaultFlags = ChromeLauncher
  .Launcher.defaultFlags()
  .filter(flag => flag !== '--disable-extensions')

class OpenChromeExtension {
  constructor (options = {}) {
    this.isChromeOpen = false
    // User-defined options
    this.extensionPath = options.extensionPath
    this.browserFlags = options.browserFlags
    this.userDataDir = options.userDataDir
    this.startingUrl = options.startingUrl
  }

  apply (compiler) {
    // Do nothing on production
    if (compiler.options.mode === 'production') return

    compiler.hooks.afterEmit.tapAsync(
      'webpack-open-chrome-extension',
      async (compilation, callback) => {
      const extensionPath = this.extensionPath

      // The context we run is within webpack watch mode
      // so we need a way to prevent Chrome instances
      // from infinite loops
			if (this.isChromeOpen) return callback()

      const browserConfigOptions = {
        defaultFlags: defaultFlags || [],
        browserFlags: this.browserFlags || [],
        userDataDir: this.userDataDir,
        startingUrl: this.startingUrl
      }

      const chromeConfig = browserConfig(extensionPath, browserConfigOptions)
      const launchedChrome = await ChromeLauncher.launch(chromeConfig)
      this.isChromeOpen = launchedChrome.pid != null
      callback()
    })
  }
}

module.exports = OpenChromeExtension
