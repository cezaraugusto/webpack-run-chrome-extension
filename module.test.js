/* global jest, describe, beforeEach, it, webpack, expect */
// const webpack = require('webpack')
const OpenChromeExtension = require('./module')
const { extensionPathOptionConfig } = require('./fixtures/webpack.config')

// OpenChromeExtension is now a mock constructor
jest.mock('./module')

describe('webpack-open-chrome-extension', () => {
  beforeEach(() => {
    OpenChromeExtension.mockClear()
  })

  describe('config', () => {
    it('calls plugin with correct args', (cb) => {
      const extensionPathConfig = extensionPathOptionConfig()

      webpack(extensionPathConfig, (error, stats) => {
        if (error) console.error(error)
        if (stats.hasErrors()) console.error(stats.toString())

        // Webpack config calls plugin
        const configArgs = OpenChromeExtension.mock.calls[0][0]
        expect(OpenChromeExtension).toBeCalledTimes(1)
        expect(OpenChromeExtension).toBeCalledWith(configArgs)
        cb()
      })
    })
  })
})
