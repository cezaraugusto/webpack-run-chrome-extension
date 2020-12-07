/* global chrome */
const ws = new window.WebSocket('ws://localhost:3148')

ws.onopen = () => {
  ws.send(JSON.stringify({ status: 'clientReady' }))
  console.log(
    '[Reload Service] Extension ready. Watching changes...'
  )
}

ws.onmessage = async (event) => {
  const message = JSON.parse(event.data)

  if (message.status === 'reloadRequested') {
    await reloadAllExtensions()
    ws.send(JSON.stringify({ status: 'reloaded' }))
  }

  if (message.status === 'reloaded') {
    console.log(
      '[Reload Service] Extension reloaded. Watching changes...'
    )
  }
}

async function getDevExtensions () {
  const allExtensions = await new Promise((resolve) => {
    return chrome.management.getAll(resolve)
  })

  return allExtensions.filter((extension) => {
    return (
      // Do not include itself
      extension.id !== chrome.runtime.id &&
      // Show only unpackaged extensions
      extension.installType === 'development'
    )
  })
}

async function reloadExtension (extensionId) {
  await setEnabled(extensionId, false)
  await setEnabled(extensionId, true)
}

async function setEnabled (extensionId, value) {
  if (extensionId === chrome.runtime.id) {
    Promise.resolve()
  }

  await new Promise((resolve) => {
    chrome.management.setEnabled(extensionId, value, resolve)
  })
}

async function reloadAllExtensions () {
  const devExtensions = await getDevExtensions()
  const reloadAll = devExtensions
    .map(extension => reloadExtension(extension.id))

  await Promise.all(reloadAll)
}
