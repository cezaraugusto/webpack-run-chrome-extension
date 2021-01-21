const resolveManifest = require('../../resolveManifest')

const {
  resolveEntry,
  resolveArrayEntry,
  resolveDependencyArrayEntry
} = require('./resolveEntry')

module.exports = function (extensionPath) {
  const manifestPath = resolveManifest(extensionPath)
  const manifest = require(manifestPath)

  return {
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
}
