const WebSocket = require('ws')

process.on('unhandledRejection', (error) => { throw error })

module.exports = function (port) {
  const webSocketServer = new WebSocket.Server({ host: 'localhost', port })

  webSocketServer.on('connection', (ws) => {
    ws.send(JSON.stringify({ status: 'serverReady' }))
    console.log(
      '[Reload Service] Watch mode ready. Waiting for extension...'
    )

    ws.on('error', (error) => {
      console.log('[Reload Service] Error', error)
    })

    ws.on('close', (reason) => {
      console.log('[Reload Service] Service closed.', reason)
      webSocketServer.close()
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
