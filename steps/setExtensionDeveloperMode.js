const os = require('os')
const path = require('path')

const fs = require('fs-extra')

async function createTempUserDataDir () {
  const userDataDir = path
    .resolve(os.tmpdir(), 'webpack-run-chrome-extension')

  await fs.mkdir(userDataDir)

  return userDataDir
}

module.exports = async function () {
  const userDataDir = await createTempUserDataDir()
  const userProfilePath = path.resolve(userDataDir, 'Default', 'Preferences')

  const userProfile = await fs.readFile(userProfilePath, 'utf8')

  await fs.writeFile(JSON.parse(userProfilePath), userProfile, 'utf8')
}
