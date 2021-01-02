/* global chrome */

chrome.commands.onCommand.addListener((command) => {
  console.log('Command received on the background: ', command)
})
