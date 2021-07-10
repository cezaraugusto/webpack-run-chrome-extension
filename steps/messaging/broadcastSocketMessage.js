const WebSocket = require('ws')

process.on('unhandledRejection', (error) => { throw error })

module.exports = function (server, message) {
  server.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message))
    }
  })
}
