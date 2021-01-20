module.exports = function () {

}
const fs = require('fs')
const path = require('path')
const os = require('os')
const readline = require('readline')

module.exports = async function (manifestPath) {
  const manifest = require(manifestPath)

  if (
    !manifest ||
    !manifest.devtools_page
  ) return []

  const devtools = path.resolve(
    path.dirname(manifestPath),
    manifest.devtools_page
  )

  const patternsArray = []
  const fileStream = fs.createReadStream(devtools)
  const lines = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })

  for await (const line of lines) {
    // Ensure line is a valid script element w/ a resource
    const input = line
      .match(/<link.*?\s+href=(?:'|")([^'">]+)(?:'|")/)

    if (input) {
      const [, source] = input

      // Link elements can point to other resources
      // but we only want CSS resources
      if (source.endsWith('.css')) {
        patternsArray.push({
          from: path.resolve(
            path.dirname(devtools),
            source
          ),
          to: path.join(os.tmpdir(), source)
        })
      }
    }
  }

  return patternsArray
}
