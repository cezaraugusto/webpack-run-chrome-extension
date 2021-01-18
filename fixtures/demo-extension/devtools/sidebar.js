/* global chrome */

chrome
  .devtools
  .panels
  .elements
  .createSidebarPane('DOM Sidebar', sidebar => {
    chrome.devtools.panels.elements.onSelectionChanged.addListener(() => {
      sidebar.setExpression('$0')
    })
  })
