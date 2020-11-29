module.exports = (extensionDistPath, configOptions) => {
  let options = configOptions

  if (!configOptions) {
    options = {
      defaultFlags: [],
      browserFlags: [],
      userDataDir: null,
      startingUrl: null
    }
  }

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
      `--load-extension=${extensionDistPath}`,
      ...options.browserFlags
    ]
  }
}
