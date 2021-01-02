const resolveManifest = require('../resolveManifest')

module.exports = function (compiler, extensionPath) {
  const manifestPath = resolveManifest(extensionPath)
  const manifest = require(manifestPath)

  console.log('manifest in generate-temp-entries', manifest)

  return compiler.hooks.entryOption.tap(
    'open-chrome-extension',
    (context, entry) => {
      compiler.options.entry = {
      // These are user-defined entries
        ...entry
      }
      console.log(compiler.options.entry)
      // Compiler.hooks.entryOption.call(context, newLoaderPath)

      return true
    }
  )
}
