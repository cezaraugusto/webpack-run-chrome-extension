const { log } = require('log-md')

function manifestNotFound () {
  log(`
    # Error! Can't find the project's manifest file.

    By default, the browser runner scans the root folder and the paths to
    \`src/\`, and \`public/\` looking for a manifest file, but none was found.

    Check your extension \`manifest.json\` file and ensure its path points to
    one of the options above, and try again.
  `)
}

module.exports = {
  manifestNotFound
}
