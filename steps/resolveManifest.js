const path = require('path')
const fs = require('fs')

const messages = require('../messages')

module.exports = function (workingDir) {
  let manifestFilePath

  // Iterate over common paths looking for the manifest file.
  try {
    // Start from usual suspects, check src/
    fs.accessSync(path.join(workingDir, 'src', 'manifest.json'))

    return manifestFilePath
  } catch (error) {
    try {
      // Check in public/
      manifestFilePath = path.join(workingDir, 'public', 'manifest.json')
      fs.accessSync(manifestFilePath)

      return manifestFilePath
    } catch (error) {
      try {
        // Check the root directory
        manifestFilePath = path.join(workingDir, 'manifest.json')
        fs.accessSync(manifestFilePath)

        return manifestFilePath
      } catch (error) {
        // Nothing found. Manifests are required so we exit.
        // This prevent us from loading Chrome with a bad config.
        messages.manifestNotFound()
        process.exit(1)
      }
    }
  }
}
