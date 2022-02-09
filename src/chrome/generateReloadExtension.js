const path = require('path')
const fs = require('fs')

module.exports = function (port) {
  const managerExtension = path
    .resolve(__dirname, './manager-extension')

  const reloadInputFile = path.join(managerExtension, '_reloadService.js')

  fs.readFile(reloadInputFile, 'utf8', (error, data) => {
    if (error) console.log(error)

    const result = data.replace(/__PORT__/g, port)

    const reloadOutputFile = path.join(managerExtension, 'reloadService.js')

    fs.writeFile(reloadOutputFile, result, 'utf8', (error) => {
      if (error) return console.log(error)
    })
  })
}
