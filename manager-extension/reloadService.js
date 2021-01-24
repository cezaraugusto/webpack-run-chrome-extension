/* global chrome */
const ws = new window.WebSocket('ws://localhost:8081')

// Gracefully close websocket connection before unloading app
window.onbeforeunload = () => {
  ws.onclose = () => {
    ws.close()
  }
}

ws.onopen = () => {
  ws.send(JSON.stringify({ status: 'clientReady' }))
  console.log(
    '[Reload Service] Extension ready. Watching changes...'
  )
}

ws.onmessage = async (event) => {
  const message = JSON.parse(event.data)

  if (message.status === 'fullExtensionReload') {
    await reloadAllExtensions()
    ws.send(JSON.stringify({ status: 'extensionReloaded' }))
  }

  if (message.status === 'tabReload') {
    // Await reloadTab()
    // reloadPage()
    ws.send(JSON.stringify({ status: 'tabReloaded' }))
  }

  if (message.status === 'allTabsReload') {
    await reloadAllTabs()
    ws.send(JSON.stringify({ status: 'allTabsReloaded' }))
  }

  if (message.status === 'inspectedWindowReload') {
    await reloadInspectedWindow()
    ws.send(JSON.stringify({ status: 'inspectedWindowReloaded' }))
  }

  // Response status
  if (message.status === 'extensionReloaded') {
    console.log(
      '[Reload Service] Extension reloaded. Watching changes...'
    )
  }

  if (message.status === 'tabReloaded') {
    console.log(
      '[Reload Service] Current tab reloaded. Watching changes...'
    )
  }

  if (message.status === 'allTabsReloaded') {
    console.log(
      '[Reload Service] All tabs reloaded. Watching changes...'
    )
  }

  // If (message.status === 'inspectedWindowReload') {
  //   console.log(
  //     '[Reload Service] Inspected window reloaded. Watching changes...'
  //   )
  // }
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
    return Promise.resolve()
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

function reloadPage () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (arrayOfTabs) {
    const code = 'window.location.reload();'

    chrome.tabs.executeScript(arrayOfTabs[0].id, { code })
  })
}

async function reloadTab () {
  await new Promise((resolve) => {
    return chrome.tabs.getCurrent(tab => {
      chrome.tabs.reload(tab.id)
    }, resolve)
  })
}

async function reloadAllTabs () {
  await new Promise((resolve) => {
    return chrome.tabs.query({}, tabs => {
      tabs.forEach(tab => chrome.tabs.reload(tab.id), resolve)
    })
  })
}

// Async function reloadInspectedWindow () {
//   await new Promise((resolve) => {
//     return chrome.devtools.inspectedWindow.reload(resolve)
//   })
// }
