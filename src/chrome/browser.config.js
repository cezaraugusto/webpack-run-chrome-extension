const path = require('path')

const reloadExtension = path.resolve(__dirname, 'manager-extension')

module.exports = (extensionDistPath, configOptions) => {
  const extensionsToLoad = [extensionDistPath]

  if (configOptions.autoReload) {
    extensionsToLoad.push(reloadExtension)
  }

  // Flags set by default:
  // https://github.com/GoogleChrome/chrome-launcher/blob/master/src/flags.ts
  return [
    `--load-extension=${extensionsToLoad.join()}`,
    `--user-data-dir=${configOptions.userDataDir}`,
    // Flags to pass to Chrome
    // Any of http://peter.sh/experiments/chromium-command-line-switches/
    ...configOptions.browserFlags
  ].join(' ')
}
