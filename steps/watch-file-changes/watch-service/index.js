
const broadcastSocketMessage = require('../broadcastSocketMessage')
const generateWatchObject = require('./generateWatchObject')

module.exports = function (wss, extensionPath, file) {
  if (!file) return

  const watched = generateWatchObject(extensionPath, file)

  // For changes outside of the tab scope,
  // reload the whole extension
  if (
    watched.backgroundScript.includes(file) ||
    watched.htmlScript.includes(file + '$') ||
    watched.htmlCss.includes(file + '$')
    ) {
      console.log('👀👀👀👀👀👀👀👀 RELOAD EXTENSION~!!!!', file)
      broadcastSocketMessage(wss, { status: 'fullExtensionReload' })
    }

  if (
    file === watched.devtoolsPage ||
    file.startsWith(watched.devtoolsPage)
  ) {
    console.log('🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹 devtools', file)
    broadcastSocketMessage(wss, { status: 'inspectedWindowReload' })
  }

  // For within a given tab, reload the given tab
  if (file === watched.bookmarksOverride) {
    console.log('🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹 bookmarks', file)
    broadcastSocketMessage(wss, {
      status: 'tabReload',
      where: 'bookmarks'
    })
  }

  if (file === watched.historyOverride) {
    console.log('🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹 history', file)
    broadcastSocketMessage(wss, {
      status: 'tabReload',
      where: 'history'
    })
  }

  if (file === watched.backgroundPage) {
    console.log('🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹 bg', file)
    broadcastSocketMessage(wss, {
      status: 'tabReload',
      where: 'backgroundPage'
    })
  }

  if (file === watched.newtabOverride) {
    console.log('🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹 ntp', file)
    broadcastSocketMessage(wss, {
      status: 'tabReload',
      where: 'newtab'
    })
  }

  if (file === watched.optionsPage) {
    console.log('🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹 OPTIONS', file)
    broadcastSocketMessage(wss, { status: 'allTabsReload' })
  }

  if (file === watched.popupPage) {
    console.log('🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹 POPUP', file)
    broadcastSocketMessage(wss, {
      status: 'tabReload',
      where: 'popup'
    })
  }

  // For changes within a webpage, reload all tabs
  if (
    watched.contentScript.includes(file) ||
    watched.contentCss.includes(file)
  ) {
    broadcastSocketMessage(wss, { status: 'fullExtensionReload' })
    broadcastSocketMessage(wss, { status: 'allTabsReload' })
    console.log('🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆 reload all tabsssssss', file)
  }
}
