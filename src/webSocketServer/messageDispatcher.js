const WebSocket = require('ws')
const resolveManifest = require('../resolvers/resolveManifest')
const extensionManifestAssets = require('extension-manifest-assets')

process.on('unhandledRejection', (error) => { throw error })

function dispatchMessage (server, message) {
  server.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message))
    }
  })
}

module.exports = async function (server, extensionPath, changedFile) {
  if (!changedFile) return

  const manifestPath = resolveManifest(extensionPath)
  const {features} = await extensionManifestAssets(manifestPath)

  if (
    features.bookmarks.html === changedFile ||
    features.bookmarks.css.includes(changedFile) ||
    features.bookmarks.js.includes(changedFile)
  ) {
    dispatchMessage(server, {
      status: 'reloadEverything',
      where: 'bookmarks'
    })
  }

  if (
    features.content.css.includes(changedFile) ||
    features.content.scripts.includes(changedFile)
  ) {
    dispatchMessage(server, {
      status: 'reloadEverything',
      where: 'content'
    })
  }

  if (
    features.devtools.html === changedFile ||
    features.devtools.css.includes(changedFile) ||
    features.devtools.js.includes(changedFile)
  ) {
    // TODO: this doesn't work
    dispatchMessage(server, { status: 'devtoolsReload' })
  }

  if (
    features.history.html === changedFile ||
    features.history.css.includes(changedFile) ||
    features.history.js.includes(changedFile)
  ) {
    dispatchMessage(server, {
      status: 'reloadEverything',
      where: 'history'
    })
  }

  if (
    features.newtab.html === changedFile ||
    features.newtab.css.includes(changedFile) ||
    features.newtab.js.includes(changedFile)
  ) {
    dispatchMessage(server, {
      status: 'reloadEverything',
      where: 'newtab'
    })
  }

  if (
    features.options.html === changedFile ||
    features.options.css.includes(changedFile) ||
    features.options.js.includes(changedFile)
  ) {
    dispatchMessage(server, {
      status: 'reloadEverything',
      where: 'options'
    })
  }

  if (
    features.background.page.html === changedFile ||
    features.background.scripts.includes(changedFile) ||
    features.background.page.js.includes(changedFile)
  ) {
    dispatchMessage(server, {
      status: 'extensionReload',
      where: 'background'
    })
  }

  if (
    features.popup.html === changedFile ||
    features.popup.css.includes(changedFile) ||
    features.popup.js.includes(changedFile)
  ) {
    // TODO: this can be improved
    dispatchMessage(server, {
      status: 'reloadEverything',
      where: 'popup'
    })
  }
}
