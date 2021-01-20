const localesEntry = require('./locales')
const webAccessibleResources = require('./webAccessibleResources')

module.exports = async function (manifestPath) {
  return [
    localesEntry(manifestPath),
    ...await webAccessibleResources(manifestPath)
  ]
}
