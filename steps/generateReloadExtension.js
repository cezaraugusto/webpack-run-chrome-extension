const path = require('path')
const fs = require('fs')

process.on('unhandledRejection', (error) => { throw error })

module.exports = function (port) {
  const managerExtension = path
    .resolve(__dirname, '../manager-extension')

  const reloadService = path.join(managerExtension, '_reloadService.js')

  fs.readFile(reloadService, 'utf8', (error, data) => {
    if (error) console.log(error)

    const result = data.replace(/__PORT__/g, port)

    const backgroundPath = path.join(managerExtension, 'reloadService.js')

    fs.writeFile(backgroundPath, result, 'utf8', (error) => {
      if (error) return console.log(error)
    })
  })
}
