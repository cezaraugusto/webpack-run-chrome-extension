const broadcastSocketMessage = require('../broadcastSocketMessage')
const generateWatchObject = require('./generateWatchObject')

module.exports = function (wss, extensionPath, file) {
  if (!file) return

  const watched = generateWatchObject(extensionPath, file)

  // For changes outside of the tab scope,
  // reload the whole extension
  if (
    file + '_backgroundscript' === watched.backgroundScript ||
    watched.backgroundScript.includes(file) ||
    file === watched.backgroundScriptPage
  ) {
    console.log('👀👀👀👀👀👀👀👀 RELOAD EXTENSION~!!!!', file)
    broadcastSocketMessage(wss, { status: 'fullExtensionReload' })
  }

  if (
    file + 'devtoolsscript' === watched.devtoolsScript ||
    file + 'devtoolscss' === watched.devtoolsCss ||
    file === watched.devtools
  ) {
    console.log('🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹 devtools', file)
    broadcastSocketMessage(wss, { status: 'inspectedWindowReload' })
  }

  // For within a given tab, reload the given tab
  if (
    file + '_bookmarksscript' === watched.bookmarksOverrideScript ||
    file + '_bookmarkscss' === watched.bookmarksOverrideCss ||
    file === watched.bookmarksOverride
  ) {
    console.log('🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹 bookmarks', file)
    broadcastSocketMessage(wss, {
      status: 'tabReload',
      where: 'bookmarks'
    })
  }

  if (
    file + '_historyscript' === watched.historyOverrideScript ||
    file + '_historycss' === watched.historyOverrideCss ||
    file === watched.historyOverride
  ) {
    console.log('🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹 history', file)
    broadcastSocketMessage(wss, {
      status: 'tabReload',
      where: 'history'
    })
  }

  if (
    file + '_newtabscript' === watched.newtabOverrideScript ||
    file + '_newtabcss' === watched.newtabOverrideCss ||
    file === watched.newtabOverride
  ) {
    console.log('🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹 ntp', file)
    broadcastSocketMessage(wss, {
      status: 'tabReload',
      where: 'newtab'
    })
  }

  if (
    file + '_popupscript' === watched.popupScript ||
    file + '_popupcss' === watched.popupCss ||
    file === watched.popup
  ) {
    console.log('🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹 POPUP', file)
    broadcastSocketMessage(wss, {
      status: 'tabReload',
      where: 'popup'
    })
  }

  // For changes within a webpage, reload all tabs
  if (
    file + '_popupscript' === watched.optionsScript ||
    file + '_popupcss' === watched.optionsCss ||
    file === watched.options ||
    watched.contentScript.includes(file) ||
    watched.contentCss.includes(file)
  ) {
    broadcastSocketMessage(wss, { status: 'fullExtensionReload' })
    broadcastSocketMessage(wss, { status: 'allTabsReload' })
  }
}
