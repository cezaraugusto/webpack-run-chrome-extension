const resolveManifest = require('../resolveManifest')

const backgroundScript = require('../generate/scriptFromManifest/backgroundScript')
const contentScript = require('../generate/scriptFromManifest/contentScript')

// const broadcastSocketMessage = require('../broadcastSocketMessage')

module.exports = function (wss, extensionPath, file) {
  if (!file) return
  const manifestPath = resolveManifest(extensionPath)
  const backgroundScriptChanges = backgroundScript(manifestPath).includes(file)
  const contentScriptChanges = contentScript(manifestPath).includes(file)

  // For changes outside of the tab scope,
  // reload the whole extension
  if (backgroundScriptChanges) {
    console.log('background js 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
    // broadcastSocketMessage(wss, { status: 'fullExtensionReload' })
  }

  if (contentScriptChanges) {
    console.log('content js 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹')
    // broadcastSocketMessage(wss, { status: 'fullExtensionReload' })
  }


  // if (
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
