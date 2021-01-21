const path = require('path')
const resolveManifest = require('../../resolveManifest')

const broadcastSocketMessage = require('../broadcastSocketMessage')

function resolveEntry (manifestPath, file) {
  if (!file) return null
  return path.resolve(path.dirname(manifestPath), file)
}

function resolveArrayEntry (manifestPath, files) {
  if (!files || files.length === 0) return []
  if (!Array.isArray(files)) return [files]

  return files
    .map(file => path.resolve(path.dirname(manifestPath), file))
}

function resolveDependencyArrayEntry (manifestPath, files) {
  if (!files || files.length === 0) return []
  if (!Array.isArray(files)) return [files]

  return files
    .map(file => path.resolve(path.dirname(manifestPath), file + '$'))
}

module.exports = function (wss, extensionPath, file) {
  const manifestPath = resolveManifest(extensionPath)
  const manifest = require(manifestPath)

  const watched = {
    // Reload extension
    backgroundScript: (
      manifest.background &&
      manifest.background.scripts &&
      resolveArrayEntry(manifestPath, manifest.background.scripts) ||
      []
    ),
    // Reload background tab
    backgroundPage: (
      manifest.background &&
      manifest.background.page &&
      resolveEntry(manifestPath, manifest.background.page)
    ),
    // Reload popup tab
    popupPage: (
      manifest.browser_action &&
      manifest.browser_action.default_popup &&
      resolveEntry(manifestPath, manifest.browser_action.default_popup)
    ),
    // Reload newtab page
    newtabOverride: (
      manifest.chrome_url_overrides &&
      manifest.chrome_url_overrides.newtab &&
      resolveEntry(manifestPath, manifest.chrome_url_overrides.newtab)
    ),
    // Reload history page tab
    historyOverride: (
      manifest.chrome_url_overrides &&
      manifest.chrome_url_overrides.history &&
      resolveEntry(manifestPath, manifest.chrome_url_overrides.history)
    ),
    // Reload bookmarks page tab
    bookmarksOverride: (
      manifest.chrome_url_overrides &&
      manifest.chrome_url_overrides.bookmarks &&
      resolveEntry(manifestPath, manifest.chrome_url_overrides.bookmarks)
    ),
    // Reload all tabs
    contentScript: (
      manifest.content_scripts &&
      manifest.content_scripts[0] &&
      manifest.content_scripts[0].js &&
      resolveArrayEntry(manifestPath, manifest.content_scripts[0].js) ||
      []
    ),
    // Reload all tabs
    contentCss: (
      manifest.content_scripts &&
      manifest.content_scripts[0] &&
      manifest.content_scripts[0].css &&
      resolveArrayEntry(manifestPath, manifest.content_scripts[0].css) ||
      []
    ),
    // Reload extension
    devtoolsPage: (
      manifest.devtools_page &&
      resolveEntry(manifestPath, manifest.devtools_page)
    ),
    // Reload option tab
    optionsPage: (
      manifest.options_ui &&
      manifest.options_ui.page &&
      resolveEntry(manifestPath, manifest.options_ui.page)
    ),
    // Reload whole extension
    htmlScript: (
      file &&
      file.endsWith('.js') &&
      resolveDependencyArrayEntry(manifestPath, file) ||
      []
    ),
    // Reload all tabs
    htmlCss: (
      file &&
      file.endsWith('.css') &&
      resolveDependencyArrayEntry(manifestPath, file) ||
      []
    )
  }

  if (!file) return

  // const filesNotFromManifest = (
  //   watched.htmlScript.includes(file) ||
  //   watched.htmlCss.includes(file))
  // )

  // reload extension
  if (
    watched.backgroundScript.includes(file) ||
    watched.htmlScript.includes(file + '$') ||
    watched.htmlCss.includes(file + '$') ||
    file === watched.devtoolsPage
  ) {
    console.log('👀👀👀👀👀👀👀👀 RELOAD EXTENSION~!!!!', file)
  }

  // reload tab
  if (
    file === watched.bookmarksOverride ||
    file === watched.historyOverride ||
    file === watched.backgroundPage ||
    file === watched.newtabOverride ||
    file === watched.newtabOverride ||
    file === watched.popupPage
  ) {
    console.log('🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹 RELOAD TAB!!!!', file)
  }

  if (
    // reloadAllTabs
    watched.contentScript.includes(file) ||
    watched.contentCss.includes(file)
  ) {
    console.log('🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆 reload all tabsssssss', file)
  }

  // console.log('FILE CHANGED: 🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️', file)
  broadcastSocketMessage(wss, { status: 'extensionReloadRequested' })
// if (file === manifest)
// if (files.size === 1) {
//   console.log('😎😎😎😎😎😎😎😎😎😎', )
// } else {
// If more than one file changed at once,
// assume we need a full extension reload
// TODO: reload whole extension
// }
// Console.log('manifest in watch-file-changes', manifest)
// By default, this plugin watch for changes on every file
// defined in the fields below. If the developer needs support
// to additional files, then it must be specified as "specificEntries"
// for (const file of Array.from(files)) {
// * Manifest.js: reloads the extension.
// * content: reloads all tabs.
// * popup: reloads the tab where "default_popup" is located.
// * background:
//   * if background page, reloads the background tab
//   * if scripts in the "background" field, reload the extension.
// * options: reloads the "options.html" tab.
// * specificEntries: User-defined entries to watch, not defined
// in the manifest.json file.
}