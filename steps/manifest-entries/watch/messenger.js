const resolveManifest = require('../resolveManifest')
// CSS sources coming from HTML pages defined in manifest.json
const bookmarksCssEntry = require('../generate/cssFromHtml/bookmarks')
const contentCssEntry = require('../generate/cssFromHtml/content')
const devtoolsCssEntry = require('../generate/cssFromHtml/devtools')
const historyCssEntry = require('../generate/cssFromHtml/history')
const newtabCssEntry = require('../generate/cssFromHtml/newtab')
const optionsCssEntry = require('../generate/cssFromHtml/options')
const popupCssEntry = require('../generate/cssFromHtml/popup')
// HTML pages defined in manifest.json
const backgroundEntry = require('../generate/htmlFromManifest/backgroundPage')
const bookmarksEntry = require('../generate/htmlFromManifest/bookmarks')
const devtoolsEntry = require('../generate/htmlFromManifest/devtools')
const historyEntry = require('../generate/htmlFromManifest/history')
const newtabEntry = require('../generate/htmlFromManifest/newtab')
const optionsEntry = require('../generate/htmlFromManifest/options')
const popupEntry = require('../generate/htmlFromManifest/popup')
// Script sources coming from HTML pages defined in manifest.json
const bgPageScriptEntry = require('../generate/scriptFromHtml/backgroundPage')
const bookmarksScriptEntry = require('../generate/scriptFromHtml/bookmarks')
const devtoolsScriptEntry = require('../generate/scriptFromHtml/devtools')
const historyScriptEntry = require('../generate/scriptFromHtml/history')
const newtabScriptEntry = require('../generate/scriptFromHtml/newtab')
const optionsScriptEntry = require('../generate/scriptFromHtml/options')
const popupScriptEntry = require('../generate/scriptFromHtml/popup')
// Script sources defined in manifest.json
const bgScriptEntry = require('../generate/scriptFromManifest/background')
const contentScriptEntry = require('../generate/scriptFromManifest/content')

// Const broadcastSocketMessage = require('../broadcastSocketMessage')

module.exports = async function (wss, extensionPath, changedFile) {
  if (!changedFile) return

  const manifestPath = resolveManifest(extensionPath)
  // CSS defined in HTML files from manifest.json
  const bookmarksCss = await bookmarksCssEntry(manifestPath)
  const contentCss = await contentCssEntry(manifestPath)
  const devtoolsCss = await devtoolsCssEntry(manifestPath)
  const historyCss = await historyCssEntry(manifestPath)
  const newtabCss = await newtabCssEntry(manifestPath)
  const optionsCss = await optionsCssEntry(manifestPath)
  const popupCss = await popupCssEntry(manifestPath)
  // HTML defined in manifest.json
  const backgroundHtml = backgroundEntry(manifestPath)
  const bookmarksHtml = bookmarksEntry(manifestPath)
  const devtoolsHtml = devtoolsEntry(manifestPath)
  const historyHtml = historyEntry(manifestPath)
  const newtabHtml = newtabEntry(manifestPath)
  const optionsHtml = optionsEntry(manifestPath)
  const popupHtml = popupEntry(manifestPath)
  // Script defined in HTML files from manifest.json
  const bgPageScript = await bgPageScriptEntry(manifestPath)
  const bookmarksScript = await bookmarksScriptEntry(manifestPath)
  const devtoolsScript = await devtoolsScriptEntry(manifestPath)
  const historyScript = await historyScriptEntry(manifestPath)
  const newtabScript = await newtabScriptEntry(manifestPath)
  const optionsScript = await optionsScriptEntry(manifestPath)
  const popupScript = await popupScriptEntry(manifestPath)
  // Scripts defined in manifest.json
  const backgroundScript = bgScriptEntry(manifestPath)
  const contentScript = contentScriptEntry(manifestPath)

  if (bookmarksCss.includes(changedFile)) {
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

  if (historyCss.includes(changedFile)) {
    console.log('history css 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
    // BroadcastSocketMessage(wss, { status: 'fullExtensionReload' })
  }

  if (newtabCss.includes(changedFile)) {
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

  if (backgroundHtml.includes(changedFile)) {
    console.log('background page 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
  }

  if (bookmarksHtml.includes(changedFile)) {
    console.log('bookmarks page 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
  }

  if (devtoolsHtml.includes(changedFile)) {
    console.log('devtools page 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
  }

  if (historyHtml.includes(changedFile)) {
    console.log('history page 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
  }

  if (newtabHtml.includes(changedFile)) {
    console.log('mewtab page 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
  }

  if (optionsHtml.includes(changedFile)) {
    console.log('options page 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
  }

  if (popupHtml.includes(changedFile)) {
    console.log('popup page 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
  }

  // Script defined in HTML files from manifest.json
  if (bgPageScript.includes(changedFile)) {
    console.log('background (from page) js 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
  }

  if (bookmarksScript.includes(changedFile)) {
    console.log('bookmarks js 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
  }

  if (devtoolsScript.includes(changedFile)) {
    console.log('devtools js 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
  }

  if (historyScript.includes(changedFile)) {
    console.log('history js 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
  }

  if (newtabScript.includes(changedFile)) {
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
  //   file + '_bookmarksscript' === watched.bookmarksScript ||
  //   file + '_bookmarkscss' === watched.bookmarksCss ||
  //   file === watched.bookmarks
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
  //   file + '_historyscript' === watched.historyScript ||
  //   file + '_historycss' === watched.historyCss ||
  //   file === watched.history
  // ) {
  //   console.log('🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹 HISTORY', file)
  //   // broadcastSocketMessage(wss, {
  //   //   status: 'tabReload',
  //   //   where: 'history'
  //   // })
  // }

  // if (
  //   file + '_newtabscript' === watched.newtabScript ||
  //   file + '_newtabcss' === watched.newtabCss ||
  //   file === watched.newtab
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
