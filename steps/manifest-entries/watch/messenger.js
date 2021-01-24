const resolveManifest = require('../resolveManifest')
const bookmarksOverrideCssEntry =
  require('../generate/cssFromHtml/bookmarksOverrideCss')
const contentCssEntry =
  require('../generate/cssFromHtml/contentCss')
const devtoolsCssEntry =
  require('../generate/cssFromHtml/devtoolsCss')
const historyOverrideCssEntry =
  require('../generate/cssFromHtml/historyOverrideCss')
const newtabOverrideCssEntry =
  require('../generate/cssFromHtml/newtabOverrideCss')
const optionsCssEntry = require('../generate/cssFromHtml/optionsCss')
const popupCssEntry = require('../generate/cssFromHtml/popupCss')
const backgroundPageHtmlEntry =
  require('../generate/htmlFromManifest/backgroundPage')
const bookmarksOverridePageHtmlEntry =
  require('../generate/htmlFromManifest/bookmarksOverridePage')
const devtoolsPageHtmlEntry =
  require('../generate/htmlFromManifest/devtoolsPage')
const historyOverridePageHtmlEntry =
  require('../generate/htmlFromManifest/historyOverridePage')
const newtabOverridePageHtmlEntry =
  require('../generate/htmlFromManifest/newtabOverridePage')
const optionsPageHtmlEntry =
  require('../generate/htmlFromManifest/optionsPage')
const popupPageHtmlEntry =
  require('../generate/htmlFromManifest/popupPage')

const backgroundPageScriptEntry = require('../generate/scriptFromHtml/backgroundPageScript')
const bookmarksOverrideScriptEntry = require('../generate/scriptFromHtml/bookmarksOverrideScript')
const devtoolsScriptEntry = require('../generate/scriptFromHtml/devtoolsScript')
const historyOverrideScriptEntry = require('../generate/scriptFromHtml/historyOverrideScript')
const newtabOverrideScriptEntry = require('../generate/scriptFromHtml/newtabOverrideScript')
const optionsScriptEntry = require('../generate/scriptFromHtml/optionsScript')
const popupScriptEntry = require('../generate/scriptFromHtml/popupScript')
const backgroundScriptEntry =
  require('../generate/scriptFromManifest/backgroundScript')
const contentScriptEntry =
  require('../generate/scriptFromManifest/contentScript')

// Const broadcastSocketMessage = require('../broadcastSocketMessage')

module.exports = async function (wss, extensionPath, changedFile) {
  if (!changedFile) return

  const manifestPath = resolveManifest(extensionPath)
  // CSS defined in HTML files from manifest.json
  const bookmarksOverrideCss = await bookmarksOverrideCssEntry(manifestPath)
  const contentCss = await contentCssEntry(manifestPath)
  const devtoolsCss = await devtoolsCssEntry(manifestPath)
  const historyOverrideCss = await historyOverrideCssEntry(manifestPath)
  const newtabOverrideCss = await newtabOverrideCssEntry(manifestPath)
  const optionsCss = await optionsCssEntry(manifestPath)
  const popupCss = await popupCssEntry(manifestPath)
  // HTML defined in manifest.json
  const backgroundPageHtml = backgroundPageHtmlEntry(manifestPath)
  const bookmarksOverridePageHtml = bookmarksOverridePageHtmlEntry(manifestPath)
  const devtoolsPageHtml = devtoolsPageHtmlEntry(manifestPath)
  const historyOverridePageHtml = historyOverridePageHtmlEntry(manifestPath)
  const newtabOverridePageHtml = newtabOverridePageHtmlEntry(manifestPath)
  const optionsPageHtml = optionsPageHtmlEntry(manifestPath)
  const popupPageHtml = popupPageHtmlEntry(manifestPath)
  // Script defined in HTML files from manifest.json
  const backgroundPageScript = await backgroundPageScriptEntry(manifestPath)
  const bookmarksOverrideScript = await bookmarksOverrideScriptEntry(manifestPath)
  const devtoolsScript = await devtoolsScriptEntry(manifestPath)
  const historyOverrideScript = await historyOverrideScriptEntry(manifestPath)
  const newtabOverrideScript = await newtabOverrideScriptEntry(manifestPath)
  const optionsScript = await optionsScriptEntry(manifestPath)
  const popupScript = await popupScriptEntry(manifestPath)
  // Scripts defined in manifest.json
  const backgroundScript = backgroundScriptEntry(manifestPath)
  const contentScript = contentScriptEntry(manifestPath)

  if (bookmarksOverrideCss.includes(changedFile)) {
    console.log('bookmarks css 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
    // BroadcastSocketMessage(wss, { status: 'fullExtensionReload' })
  }

  if (contentCss.includes(changedFile)) {
    console.log('content css 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
    // BroadcastSocketMessage(wss, { status: 'fullExtensionReload' })
  }

  if (devtoolsCss.includes(changedFile)) {
    console.log('devtools css 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
    // BroadcastSocketMessage(wss, { status: 'fullExtensionReload' })
  }

  if (historyOverrideCss.includes(changedFile)) {
    console.log('history css 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
    // BroadcastSocketMessage(wss, { status: 'fullExtensionReload' })
  }

  if (newtabOverrideCss.includes(changedFile)) {
    console.log('newtab css 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
    // BroadcastSocketMessage(wss, { status: 'fullExtensionReload' })
  }

  if (optionsCss.includes(changedFile)) {
    console.log('options css 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
    // BroadcastSocketMessage(wss, { status: 'fullExtensionReload' })
  }

  if (popupCss.includes(changedFile)) {
    console.log('popup css 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
    // BroadcastSocketMessage(wss, { status: 'fullExtensionReload' })
  }

  if (backgroundPageHtml.includes(changedFile)) {
    console.log('background page 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
  }

  if (bookmarksOverridePageHtml.includes(changedFile)) {
    console.log('bookmarks page 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
  }

  if (devtoolsPageHtml.includes(changedFile)) {
    console.log('devtools page 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
  }

  if (historyOverridePageHtml.includes(changedFile)) {
    console.log('history page 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
  }

  if (newtabOverridePageHtml.includes(changedFile)) {
    console.log('mewtab page 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
  }

  if (optionsPageHtml.includes(changedFile)) {
    console.log('options page 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
  }

  if (popupPageHtml.includes(changedFile)) {
    console.log('popup page 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
  }

  // Script defined in HTML files from manifest.json
  if (backgroundPageScript.includes(changedFile)) {
    console.log('background (from page) js 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
  }

  if (bookmarksOverrideScript.includes(changedFile)) {
    console.log('bookmarks js 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
  }

  if (devtoolsScript.includes(changedFile)) {
    console.log('devtools js 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
  }

  if (historyOverrideScript.includes(changedFile)) {
    console.log('history js 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
  }

  if (newtabOverrideScript.includes(changedFile)) {
    console.log('newtab js 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
  }

  if (optionsScript.includes(changedFile)) {
    console.log('options js 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
  }

  if (popupScript.includes(changedFile)) {
    console.log('popup js 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
  }

  if (backgroundScript.includes(changedFile)) {
    console.log('background js 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
    // BroadcastSocketMessage(wss, { status: 'fullExtensionReload' })
  }

  if (contentScript.includes(changedFile)) {
    console.log('content js 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
    // BroadcastSocketMessage(wss, { status: 'fullExtensionReload' })
  }

  // If (
  //   file + 'devtoolsscript' === watched.devtoolsScript ||
  //   file + 'devtoolscss' === watched.devtoolsCss ||
  //   file === watched.devtools
  // ) {
  //   console.log('🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹 devtools', file)
  //   // broadcastSocketMessage(wss, { status: 'inspectedWindowReload' })
  // }

  // // For within a given tab, reload the given tab
  // if (
  //   file + '_bookmarksscript' === watched.bookmarksOverrideScript ||
  //   file + '_bookmarkscss' === watched.bookmarksOverrideCss ||
  //   file === watched.bookmarksOverride
  // ) {
  //   // tentar window.location.href
  //   console.log('🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹 BOOKMARKS', file)
  //   // broadcastSocketMessage(wss, { status: 'fullExtensionReload' })
  //   // broadcastSocketMessage(wss, {
  //   //   status: 'tabReload',
  //   //   where: 'bookmarks'
  //   // })
  // }

  // if (
  //   file + '_historyscript' === watched.historyOverrideScript ||
  //   file + '_historycss' === watched.historyOverrideCss ||
  //   file === watched.historyOverride
  // ) {
  //   console.log('🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹 HISTORY', file)
  //   // broadcastSocketMessage(wss, {
  //   //   status: 'tabReload',
  //   //   where: 'history'
  //   // })
  // }

  // if (
  //   file + '_newtabscript' === watched.newtabOverrideScript ||
  //   file + '_newtabcss' === watched.newtabOverrideCss ||
  //   file === watched.newtabOverride
  // ) {
  //   console.log('🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹 NTP', file)
  //   // broadcastSocketMessage(wss, {
  //   //   status: 'tabReload',
  //   //   where: 'newtab'
  //   // })
  // }

  // if (
  //   file + '_popupscript' === watched.popupScript ||
  //   file + '_popupcss' === watched.popupCss ||
  //   file === watched.popup
  // ) {
  //   console.log('🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹 POPUP', file)
  //   console.log('🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹 POPUP', watched.popup)
  //   console.log('🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹 POPUP', watched.popupScript)
  //   console.log('🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹 POPUP', watched.popupCss)
  //   // broadcastSocketMessage(wss, {
  //   //   status: 'tabReload',
  //   //   where: 'popup'
  //   // })
  // }

  // // For changes within a webpage or special tab,
  // // reload both the extension and tabs

  // console.log('11111', file)
  // // console.log('22222', watched.contentCss.includes(file))
  // // console.log('33333', file + '_optionsscript' === watched.optionsScript)
  // // console.log('44444', file + '_optionscss' === watched.optionsCss)
  // // console.log('55555', file === watched.options)
  // if (
  //   watched.contentScript.includes(file) ||
  //   watched.contentCss.includes(file) ||
  //   file + '_optionsscript' === watched.optionsScript ||
  //   file + '_optionscss' === watched.optionsCss ||
  //   file === watched.options
  // ) {
  //   console.log('CONTENT OU OPTION')
  //   // broadcastSocketMessage(wss, { status: 'fullExtensionReload' })
  //   // broadcastSocketMessage(wss, { status: 'allTabsReload' })
  // }
}
