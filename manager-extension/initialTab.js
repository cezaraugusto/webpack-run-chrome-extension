function setBackgroundTab (extensionsTab) {
  // Get current chrome://extensions tab and move it left
  chrome.tabs.move(extensionsTab.id, {index: 0}, () => {
    // Get user-selected initial page tab and re-activate
    chrome.tabs.update(initialTab.id, {active: true})
  })
}

chrome.tabs.query({active: true}, ([initialTab]) => {
	if (initialTab.url === 'about:blank') {
    chrome.tabs.update({url: 'chrome://extensions/'})
    return
  }

  // Create a new tab and set it to background.
  // We want the user-selected page to be active,
  // not chrome://extensions.
  chrome.tabs.create(
    {url: 'chrome://extensions/', active: false},
    setBackgroundTab
  )
})
