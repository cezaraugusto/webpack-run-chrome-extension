const path = require('path')

const reloadExtension = path.resolve(__dirname, 'extensions/reload')

module.exports = (extensionDistPath, configOptions) => {
  let options = configOptions

  if (!configOptions) {
    options = {
      defaultFlags: [],
      browserFlags: [],
      userDataDir: null,
      startingUrl: null,
      autoReload: true
    }
  }

  const extensionsToLoad = []

  if (options.autoReload) {
    extensionsToLoad.push(reloadExtension)
  }

  extensionsToLoad.push(extensionDistPath)

  return {
    ignoreDefaultFlags: true,
    userDataDir: options.userDataDir,
    startingUrl: options.startingUrl,
    // Flags set by default:
    // https://github.com/GoogleChrome/chrome-launcher/blob/master/src/flags.ts
    // Flags to pass to Chrome
    // Any of http://peter.sh/experiments/chromium-command-line-switches/
    chromeFlags: [
      ...options.defaultFlags,
      `--load-extension=${extensionsToLoad.join()}`,
      ...options.browserFlags
    ]
  }
}
