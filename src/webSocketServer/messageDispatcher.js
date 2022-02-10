const path = require('path')
const WebSocket = require('ws')
const resolveManifest = require('../resolvers/resolveManifest')
const extensionManifestAssets = require('extension-manifest-assets')

function getChangedFilePath (extensionPath, fileName) {
  const extensionName = path.basename(extensionPath)
  const index = fileName
    .split('/')
    .findIndex((data) => data === extensionName)

  return fileName.split('/').slice(index).join('/')
}

function dispatchMessage (server, message) {
  server.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message))
    }
  })
}

module.exports = async function (server, extensionPath, updatedFile) {
  if (!updatedFile) return

  const manifestPath = resolveManifest(extensionPath)
  const updatedHtmlFile = (htmlFile) => getChangedFilePath(extensionPath, htmlFile)
  const {features} = await extensionManifestAssets(manifestPath)

  if (
    updatedHtmlFile(updatedFile).includes(features.bookmarks.html) ||
    features.bookmarks.css.includes(updatedFile) ||
    features.bookmarks.js.includes(updatedFile)
  ) {
    dispatchMessage(server, {
      status: 'reloadEverything',
      where: 'bookmarks'
    })
  }

  if (
    features.content.css.includes(updatedFile) ||
    features.content.scripts.includes(updatedFile)
  ) {
    dispatchMessage(server, {
      status: 'reloadEverything',
      where: 'content'
    })
  }

  if (
    updatedHtmlFile(updatedFile).includes(features.devtools.html) ||
    features.devtools.css.includes(updatedFile) ||
    features.devtools.js.includes(updatedFile)
  ) {
    // TODO: this doesn't work
    dispatchMessage(server, { status: 'devtoolsReload' })
  }

  if (
    updatedHtmlFile(updatedFile).includes(features.history.html) ||
    features.history.css.includes(updatedFile) ||
    features.history.js.includes(updatedFile)
  ) {
    dispatchMessage(server, {
      status: 'reloadEverything',
      where: 'history'
    })
  }

  if (
    updatedHtmlFile(updatedFile).includes(features.newtab.html) ||
    features.newtab.css.includes(updatedFile) ||
    features.newtab.js.includes(updatedFile)
  ) {
    dispatchMessage(server, {
      status: 'reloadEverything',
      where: 'newtab'
    })
  }

  if (
    updatedHtmlFile(updatedFile).includes(features.options.html) ||
    features.options.css.includes(updatedFile) ||
    features.options.js.includes(updatedFile)
  ) {
    dispatchMessage(server, {
      status: 'reloadEverything',
      where: 'options'
    })
  }

  if (
    updatedHtmlFile(updatedFile).includes(features.background.page.html) ||
    features.background.scripts.includes(updatedFile) ||
    features.background.page.js.includes(updatedFile)
  ) {
    dispatchMessage(server, {
      status: 'extensionReload',
      where: 'background'
    })
  }

  if (
    updatedHtmlFile(updatedFile).includes(features.popup.html) ||
    features.popup.css.includes(updatedFile) ||
    features.popup.js.includes(updatedFile)
  ) {
    // TODO: this can be improved
    dispatchMessage(server, {
      status: 'reloadEverything',
      where: 'popup'
    })
  }
}
