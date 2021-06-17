const ChromeLauncher = require('chrome-launcher')

const browserConfig = require('../browser.config')
const createUserDataDir = require('./manifest-entries/watch/createUserDataDir')

process.on('SIGINT', async () => {
  await ChromeLauncher.killAll()
})
process.on('SIGTERM', async () => {
  await ChromeLauncher.killAll()
})

process.on('unhandledRejection', (error) => { throw error })

async function launchChrome (options = {}) {
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

function serveExtensionHook (compiler, options) {
  return compiler
    .hooks.done.tapAsync('open-chrome-extension', async (_, done) => {
      await launchChrome(options)
      done()
  })
}

module.exports = {launchChrome, serveExtensionHook}
