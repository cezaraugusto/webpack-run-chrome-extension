const broadcastSocketMessage = require('./broadcastSocketMessage')

module.exports = function (compiler, wss) {
  return compiler.hooks.watchRun.tapAsync(
    'open-chrome-extension',
    (compilation, done) => {
      const changedFiles = compilation.modifiedFiles || new Map()

      // Console.log('manifest in watch-file-changes', manifest)
      // By default, this plugin watch for changes on every file
      // defined in the fields below. If the developer needs support
      // to additional files, then it must be specified as "specificEntries"
      for (const file of Array.from(changedFiles)) {
        // * Manifest.js: reloads the extension.
        // * content: reloads all tabs.
        // * popup: reloads the tab where "default_popup" is located.
        // * background:
        //   * if background page, reloads the background tab
        //   * if scripts in the "background" field, reload the extension.
        // * options: reloads the "options.html" tab.
        // * specificEntries: User-defined entries to watch, not defined
        // in the manifest.json file.
        console.log('FILES CHANGED:', file)
        broadcastSocketMessage(wss, { status: 'extensionReloadRequested' })
      }

      done()
    }
  )
}
