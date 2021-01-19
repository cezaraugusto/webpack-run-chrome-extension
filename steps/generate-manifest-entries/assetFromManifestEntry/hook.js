const CopyPlugin = require('copy-webpack-plugin')

const resolveManifest = require('../../resolveManifest')
const localesEntry = require('./locales')
const webAccessibleResources = require('./webAccessibleResources')

module.exports = function (compiler, extensionPath) {
  const manifestPath = resolveManifest(extensionPath)

  return compiler.hooks.watchRun.tapAsync(
    'open-chrome-extension',
    async (compiler, done) => {
      const locales = localesEntry(manifestPath)
      const webResources = webAccessibleResources(manifestPath)

      new CopyPlugin({
        patterns: [
          locales,
          ...webResources
        ]
      }).apply(compiler)
      done()
    }
  )
}
