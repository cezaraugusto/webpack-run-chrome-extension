const fs = require('fs')
const path = require('path')
const readline = require('readline')

module.exports = async function (manifestPath) {
  const manifest = require(manifestPath)

  if (
    !manifest ||
    !manifest.chrome_url_overrides ||
    !manifest.chrome_url_overrides.newtab
  ) return []

  const newtabOverride = path.resolve(
    path.dirname(manifestPath),
    manifest.chrome_url_overrides.newtab
  )

  const patternsArray = []
  const fileStream = fs.createReadStream(newtabOverride)
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
  if (patternsArray.length === 0) return []

  return patternsArray
    .map(css => path
      .resolve(path.dirname(newtabOverride), css))
}
