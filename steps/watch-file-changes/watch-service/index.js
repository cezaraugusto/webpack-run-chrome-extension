
const broadcastSocketMessage = require('../broadcastSocketMessage')
const generateWatchObject = require('./generateWatchObject')

module.exports = function (wss, extensionPath, file) {
  if (!file) return

  const watched = generateWatchObject(extensionPath)

  // For changes outside of the tab scope,
  // reload the whole extension
  if (
    watched.backgroundScript.includes(file) ||
    watched.htmlScript.includes(file + '$') ||
    watched.htmlCss.includes(file + '$') ||
    file === watched.devtoolsPage
  ) {
    console.log('👀👀👀👀👀👀👀👀 RELOAD EXTENSION~!!!!', file)
  }

  // For within a given tab, reload the given tab
  if (file === watched.bookmarksOverride) {
    console.log('🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹 bookmarks', file)
  }

  if (file === watched.historyOverride) {
    console.log('🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹 history', file)
  }

  if (file === watched.backgroundPage) {
    console.log('🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹 bg', file)
  }

  if (file === watched.newtabOverride) {
    console.log('🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹 ntp', file)
  }

  if (file === watched.popupPage) {
    console.log('🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹 POPUP', file)
  }

  // For changes within a webpage, reload all tabs
  if (
    watched.contentScript.includes(file) ||
    watched.contentCss.includes(file)
  ) {
    broadcastSocketMessage(wss, { status: 'extensionReloadRequested' })
    console.log('🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆 reload all tabsssssss', file)
  }
}
