const path = require('path')
const fs = require('fs')

process.on('unhandledRejection', (error) => { throw error })

module.exports = function (port) {
  const reloadExtension = path
    .resolve(__dirname, '../extensions/reload')

  const contentsSamplePath = path.join(reloadExtension, 'backgroundSample.js')

  fs.readFile(contentsSamplePath, 'utf8', (error, data) => {
    if (error) console.log(error)

    const result = data.replace(/__PORT__/g, port)

    const backgroundPath = path.join(reloadExtension, 'background.js')
    fs.writeFile(backgroundPath, result, 'utf8', (error) => {
      if (error) return console.log(error)
    })
  })
}
