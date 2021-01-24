// const path = require('path')
// const resolveManifest = require('../../resolveManifest')

// const {
//   resolveEntry,
//   resolveDependencyEntry,
//   resolveArrayEntry
// } = require('./resolveEntry')

// module.exports = function (extensionPath, file) {
//   const manifestPath = resolveManifest(extensionPath)
//   const manifest = require(manifestPath)

//   return {
//     // Reload extension
//     backgroundScript: (
//       manifest.background &&
//       manifest.background.scripts &&
//       resolveArrayEntry(manifestPath, manifest.background.scripts) ||
//       []
//     ),
//     // Reload background tab
//     backgroundPage: (
//       manifest.background &&
//       manifest.background.page &&
//       resolveEntry(manifestPath, manifest.background.page)
//     ),
//     backgroundPageScript: (
//       manifest.background &&
//       manifest.background.page &&
//       resolveDependencyEntry(
//         manifest.background.page,
//         file + '_backgroundscript'
//       )
//     ),
//     // Reload popup tab
//     popup: (
//       manifest.browser_action &&
//       manifest.browser_action.default_popup &&
//       resolveEntry(
//         manifestPath,
//         manifest.browser_action.default_popup
//       )
//     ),
//     nao da mais pra correr
//     precisa fazer o parse igual os outrros fazem mas add o script _blabla
//     popupScript: (
//       manifest.browser_action &&
//       manifest.browser_action.default_popup &&
//       resolveDependencyEntry(
//         manifest.browser_action.default_popup,
//         file + '_popupscript'
//       )
//     ),
//     popupCss: (
//       manifest.browser_action &&
//       manifest.browser_action.default_popup &&
//       resolveDependencyEntry(
//         manifest.browser_action.default_popup,
//         file + '_popupcss'
//       )
//     ),
//     // Reload newtab page
//     newtabOverride: (
//       manifest.chrome_url_overrides &&
//       manifest.chrome_url_overrides.newtab &&
//       resolveEntry(manifestPath, manifest.chrome_url_overrides.newtab)
//     ),
//     newtabOverrideScript: (
//       manifest.chrome_url_overrides &&
//       manifest.chrome_url_overrides.newtab &&
//       resolveDependencyEntry(
//         manifest.chrome_url_overrides.newtab,
//         file + '_newtabscript'
//       )
//     ),
//     newtabOverrideCss: (
//       manifest.chrome_url_overrides &&
//       manifest.chrome_url_overrides.newtab &&
//       resolveDependencyEntry(
//         manifest.chrome_url_overrides.newtab,
//         file + '_newtabcss'
//       )
//     ),
//     // Reload history page tab
//     historyOverride: (
//       manifest.chrome_url_overrides &&
//       manifest.chrome_url_overrides.history &&
//       resolveEntry(manifestPath, manifest.chrome_url_overrides.history)
//     ),
//     historyOverrideScript: (
//       manifest.chrome_url_overrides &&
//       manifest.chrome_url_overrides.history &&
//       resolveDependencyEntry(
//         manifest.chrome_url_overrides.history,
//         file + '_historyscript'
//       )
//     ),
//     historyOverrideCss: (
//       manifest.chrome_url_overrides &&
//       manifest.chrome_url_overrides.history &&
//       resolveDependencyEntry(
//         manifest.chrome_url_overrides.history,
//         file + '_historycss'
//       )
//     ),
//     // Reload bookmarks page tab
//     bookmarksOverride: (
//       manifest.chrome_url_overrides &&
//       manifest.chrome_url_overrides.bookmarks &&
//       resolveEntry(manifestPath, manifest.chrome_url_overrides.bookmarks)
//     ),
//     bookmarksOverrideScript: (
//       manifest.chrome_url_overrides &&
//       manifest.chrome_url_overrides.bookmarks &&
//       resolveDependencyEntry(
//         manifest.chrome_url_overrides.bookmarks,
//         file + '_bookmarksscript'
//       )
//     ),
//     bookmarksOverrideCss: (
//       manifest.chrome_url_overrides &&
//       manifest.chrome_url_overrides.bookmarks &&
//       resolveDependencyEntry(
//         manifest.chrome_url_overrides.bookmarks,
//         file + '_bookmarkscss'
//       )
//     ),
//     // Reload all tabs
//     contentScript: (
//       manifest.content_scripts &&
//       manifest.content_scripts[0] &&
//       manifest.content_scripts[0].js &&
//       resolveArrayEntry(manifestPath, manifest.content_scripts[0].js) ||
//       []
//     ),
//     // Reload all tabs
//     contentCss: (
//       manifest.content_scripts &&
//       manifest.content_scripts[0] &&
//       manifest.content_scripts[0].css &&
//       resolveArrayEntry(manifestPath, manifest.content_scripts[0].css) ||
//       []
//     ),
//     // Reload extension
//     devtools: (
//       manifest.devtools_page &&
//       resolveEntry(manifestPath, manifest.devtools_page)
//     ),
//     devtoolsScript: (
//       manifest.devtools_page &&
//       resolveDependencyEntry(
//         manifest.devtools_page,
//         file + '_devtoolsscript'
//       )
//     ),
//     devtoolsCss: (
//       manifest.devtools_page &&
//       resolveDependencyEntry(
//         manifest.devtools_page,
//         file + '_devtoolscss'
//       )
//     ),
//     // Reload option tab
//     options: (
//       manifest.options_ui &&
//       manifest.options_ui.page &&
//       resolveEntry(manifestPath, manifest.options_ui.page)
//     ),
//     optionsScript: (
//       manifest.options_ui &&
//       manifest.options_ui.page &&
//       file.startsWith(path.dirname(manifest.options_ui.page)) &&
//       resolveDependencyEntry(
//         manifest.options_ui.page,
//         file + '_optionsscript'
//       )
//     ),
//     optionsCss: (
//       manifest.options_ui &&
//       manifest.options_ui.page &&
//       file.startsWith(path.dirname(manifest.options_ui.page)) &&
//       resolveDependencyEntry(
//         manifest.options_ui.page,
//         file + '_optionscss'
//       )
//     )
//   }
// }
