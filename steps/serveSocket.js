const WebSocket = require('ws')

function webSocketServer (host, port) {
  const webSocketServer = new WebSocket.Server({ host, port })

  webSocketServer.on('connection', (ws) => {
    ws.send(JSON.stringify({ status: 'serverReady' }))
    console.log(
      '[Reload Service] Watch mode ready. Waiting for extension...'
    )

    ws.on('error', (error) => {
      console.log('[Reload Service] Error', error)
    })

    // We're only ready when the extension says so
    ws.on('message', (msg) => {
      const message = JSON.parse(msg)

      if (message.status === 'clientReady') {
        console.log(
          '[Reload Service] Extension ready. Watching changes...'
        )
      }

      if (message.status === 'reloaded') {
        console.log(
          '[Reload Service] Extension reloaded. Watching changes...'
        )
      }
    })
  })

  return webSocketServer
}

function webSocketServerBroadcast (server, message) {
  server.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ status: 'reloadRequested' }))
    }
  })
}

module.exports = {
  webSocketServer,
  webSocketServerBroadcast
}
