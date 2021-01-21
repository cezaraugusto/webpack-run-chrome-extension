const path = require('path')

function resolveEntry (manifestPath, file) {
  if (!file) return null
  return path.resolve(path.dirname(manifestPath), file)
}

function resolveArrayEntry (manifestPath, files) {
  if (!files || files.length === 0) return []
  if (!Array.isArray(files)) return [files]

  return files
    .map(file => path.resolve(path.dirname(manifestPath), file))
}

function resolveDependencyArrayEntry (manifestPath, files) {
  if (!files || files.length === 0) return []
  if (!Array.isArray(files)) return [files]

  return files
    .map(file => path.resolve(path.dirname(manifestPath), file + '$'))
}

module.exports = {
  resolveEntry,
  resolveArrayEntry,
  resolveDependencyArrayEntry
}