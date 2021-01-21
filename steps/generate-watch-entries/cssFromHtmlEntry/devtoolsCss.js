const fs = require('fs')
const path = require('path')
const readline = require('readline')

module.exports = async function (manifestPath) {
  const manifest = require(manifestPath)

  if (
    !manifest ||
    !manifest.devtools_page
  ) return []

  const devtoolsPage = path.resolve(
    path.dirname(manifestPath),
    manifest.devtools_page
  )

  const patternsArray = []
  const fileStream = fs.createReadStream(devtoolsPage)
  const lines = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })

  for await (const line of lines) {
    // Ensure line is a valid link element w/ a resource
    const input = line
      .match(/<link.*?\s+href=(?:'|")([^'">]+)(?:'|")/)

    if (input) {
      const [, source] = input
      patternsArray.push(source)
    }
  }

  // Do nothing for empty results
  if (patternsArray.length == 0) return []

  return patternsArray
    .map(css => path.resolve(path.dirname(devtoolsPage), css))
}
