const broadcastSocketMessage = require('./broadcastSocketMessage')
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

  if (
    bookmarksHtml.includes(changedFile) ||
    bookmarksCss.includes(changedFile) ||
    bookmarksScript.includes(changedFile)
  ) {
    broadcastSocketMessage(wss, {
      status: 'reloadEverything',
      where: 'bookmarks'
    })
  }

  if (
    contentCss.includes(changedFile) ||
    contentScript.includes(changedFile)
  ) {
    broadcastSocketMessage(wss, {
      status: 'reloadEverything',
      where: 'content'
    })
  }

  if (
    devtoolsHtml.includes(changedFile) ||
    devtoolsCss.includes(changedFile) ||
    devtoolsScript.includes(changedFile)
  ) {
    // TODO: this doesn't work
    broadcastSocketMessage(wss, { status: 'devtoolsReload' })
  }

  if (
    historyCss.includes(changedFile) ||
    historyHtml.includes(changedFile) ||
    historyScript.includes(changedFile)
  ) {
    broadcastSocketMessage(wss, {
      status: 'reloadEverything',
      where: 'history'
    })
  }

  if (
    newtabCss.includes(changedFile) ||
    newtabHtml.includes(changedFile) ||
    newtabScript.includes(changedFile)
  ) {
    broadcastSocketMessage(wss, {
      status: 'reloadEverything',
      where: 'newtab'
    })
  }

  if (
    optionsCss.includes(changedFile) ||
    optionsHtml.includes(changedFile) ||
    optionsScript.includes(changedFile)
  ) {
    broadcastSocketMessage(wss, {
      status: 'reloadEverything',
      where: 'options'
    })
  }

  if (
    backgroundScript.includes(changedFile) ||
    backgroundHtml.includes(changedFile) ||
    bgPageScript.includes(changedFile)
  ) {
    broadcastSocketMessage(wss, {
      status: 'extensionReload',
      where: 'background'
    })
  }

  if (
    popupCss.includes(changedFile) ||
    popupHtml.includes(changedFile) ||
    popupScript.includes(changedFile)
  ) {
    // TODO: this can be improved
    broadcastSocketMessage(wss, {
      status: 'reloadEverything',
      where: 'popup'
    })
  }
}
