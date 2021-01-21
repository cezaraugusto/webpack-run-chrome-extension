const fs = require('fs')
const path = require('path')
const readline = require('readline')

module.exports = async function (manifestPath) {
  const manifest = require(manifestPath)

  if (
    !manifest ||
    !manifest.background ||
    !manifest.background.page
  ) return []

  const backgroundPageScript = path.resolve(
    path.dirname(manifestPath),
    manifest.background.page
  )

  const patternsArray = []
  const fileStream = fs.createReadStream(backgroundPageScript)
  const lines = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })

  for await (const line of lines) {
    // Ensure line is a valid script element w/ a resource
    const input = line
      .match(/<script.*?\s+src=(?:'|")([^'">]+)(?:'|")/)

    if (input) {
      const [, source] = input
      patternsArray.push(source)
    }
  }

  // Do nothing for empty results
  if (patternsArray.length == 0) return []

  return patternsArray
    .map(script => path.resolve(path.dirname(backgroundPageScript), script))
}
