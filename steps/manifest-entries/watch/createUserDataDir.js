// Ideas here are adapted from
// https://github.com/jeremyben/webpack-chrome-extension-launcher
// Released under MIT license.

const path = require('path')
const os = require('os')

const fs = require('fs-extra')

process.on('unhandledRejection', (error) => { throw error })

async function createTempDirectory () {
  const userDataDir = path
    .resolve(os.tmpdir(), 'webpack-run-chrome-extension')

  try {
    await fs.mkdir(userDataDir)

    return userDataDir
  } catch (error) {
    // That's ok if file exists as we'll just override it anyway
    if (error.code === 'EEXIST') {
      return userDataDir
    }

    throw new Error(error)
  }
}

module.exports = async function () {
  const userDataDir = await createTempDirectory()

  const userProfile = JSON.stringify({
    extensions: {
      ui: {
        developer_mode: true
      }
    }
  })

  const preferences = path
    .join(userDataDir, 'Default')

  await fs.ensureDir(preferences)

  const preferencesPath = path.join(preferences, 'Preferences')

  // Actually write the user preferences
  await fs.writeFile(preferencesPath, userProfile, 'utf8')

  return userDataDir
}
