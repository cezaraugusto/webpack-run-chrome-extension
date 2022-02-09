const ChromeLauncher = require('chrome-launcher')

const browserConfig = require('../chrome/browser.config')
const createUserDataDir = require('../chrome/createUserDataDir')
const generateReloadExtension = require('../chrome/generateReloadExtension')

process.on('SIGINT', async () => {
  await ChromeLauncher.killAll()
})
process.on('SIGTERM', async () => {
  await ChromeLauncher.killAll()
})

async function launchChrome (options = {}) {
  generateReloadExtension(options.port)

  const defaultFlags = ChromeLauncher
    .Launcher.defaultFlags()
    .filter(flag => flag !== '--disable-extensions')

  // Get user defaults so we can set the browser flags
  const browserConfigOptions = {
    defaultFlags: defaultFlags || [],
    browserFlags: options.browserFlags || [],
    userDataDir: options.userDataDir || await createUserDataDir(),
    startingUrl: options.startingUrl,
    autoReload: options.autoReload || true
  }

  // Set user defaults to browser
  const chromeConfig = browserConfig(options.extensionPath, browserConfigOptions)

  await ChromeLauncher.launch(chromeConfig)
}

function runBrowserWithExtensionEnabled (compiler, options) {
  // return compiler
  //   .hooks.done.tapAsync('run-chrome-extension', async (_, done) => {
    launchChrome(options)
  //     done()
  // })
}

module.exports = {launchChrome, runBrowserWithExtensionEnabled}
