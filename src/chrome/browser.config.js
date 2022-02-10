const path = require('path')

const reloadExtension = path.resolve(__dirname, 'manager-extension')

module.exports = (extensionDistPath, configOptions) => {
  let options = configOptions

  if (!configOptions) {
    options = {
      userDataDir: null,
      browserFlags: [],
    }
  }

  const extensionsToLoad = [extensionDistPath, reloadExtension]

  // Flags set by default:
  // https://github.com/GoogleChrome/chrome-launcher/blob/master/src/flags.ts
  return [
    `--load-extension=${extensionsToLoad.join()}`,
    `--user-data-dir=${options.userDataDir}`,
    // Flags to pass to Chrome
    // Any of http://peter.sh/experiments/chromium-command-line-switches/
    ...options.browserFlags.join(' ')
  ].join(' ')
}
