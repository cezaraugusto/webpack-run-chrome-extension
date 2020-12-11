/* global jest, describe, beforeEach, afterEach, it, expect */
const ChromeLauncher = require('chrome-launcher')
const webpack = require('webpack')

const serveExtension = require('./steps/serveExtension')
const RunChromeExtension = require('./module')
const webpackConfig = require('./fixtures/webpack.config')

// RunChromeExtension is now a mock constructor
jest.mock('./module')

describe('webpack-run-chrome-extension', () => {
  describe('webpack config', () => {
    it('calls plugin with correct args', (done) => {
      webpack(webpackConfig, (error, stats) => {
        if (error) console.error(error)
        if (stats.hasErrors()) console.log(stats.toString())

        // Webpack config calls plugin
        const configArgs = RunChromeExtension.mock.calls[0][0]

        expect(RunChromeExtension).toBeCalledTimes(1)
        expect(RunChromeExtension).toBeCalledWith(configArgs)
        done()
      })
    })

    describe('serveExtension', () => {
      it('`extensionPath` config sets respective browser flag', async () => {
        await serveExtension({
          autoReload: false,
          extensionPath: 'my/extension/path'
        })

        const { chromeFlags } = await ChromeLauncher.launch.mock.calls[0][0]
        const flag = chromeFlags.find(flag => flag.startsWith('--load-extension'))

        expect(flag.endsWith('my/extension/path')).toBe(true)
      })

      it(
        '`browserFlags` config sets respective user-specified browser flags',
        async () => {
          await serveExtension({
            browserFlags: ['--some-flag=flagvalue', '--another-flag=value2']
          })

          const { chromeFlags } = await ChromeLauncher.launch.mock.calls[0][0]
          const flag1 = chromeFlags.find(flag => flag.startsWith('--some-flag'))
          const flag2 = chromeFlags.find(flag => flag.startsWith('--another-flag'))

          expect(flag1.endsWith('value')).toBe(true)
          expect(flag2.endsWith('value2')).toBe(true)
        }
      )

      it('`userDataDir` config sets respective browser flag', async () => {
        await serveExtension({ userDataDir: 'my/profile/dir' })

        const { userDataDir } = await ChromeLauncher.launch.mock.calls[0][0]

        expect(userDataDir).toBe('my/profile/dir')
      })

      it('`startingUrl` config sets respective browser flag', async () => {
        await serveExtension({ startingUrl: 'my/starting/url' })

        const { startingUrl } = await ChromeLauncher.launch.mock.calls[0][0]

        expect(startingUrl).toBe('my/starting/url')
      })

      it('`autoReload` config loads reload extesion by default', async () => {
        await serveExtension()

        const { chromeFlags } = await ChromeLauncher.launch.mock.calls[0][0]
        const flag1 = chromeFlags.find(flag => flag.startsWith('--load-extension'))

        expect(flag1.endsWith('reload,')).toBe(true)
      })

      it(
        '`autoReload` config does not load reload extesion by default',
        async () => {
          await serveExtension({ autoReload: false })

          const { chromeFlags } = await ChromeLauncher.launch.mock.calls[0][0]
          const flag1 = chromeFlags.find(flag => flag.startsWith('--load-extension'))

          expect(flag1.endsWith('reload')).not.toBe(true)
        }
      )

      it(
        '`autoReload` config loads both user extension and reloader as expected',
        async () => {
          await serveExtension({ extensionPath: 'my/extension/path' })

          const { chromeFlags } = await ChromeLauncher.launch.mock.calls[0][0]
          const flags = chromeFlags.find(flag => flag.startsWith('--load-extension'))
          const [flag1, flag2] = flags.split(',')

          expect(flag1.endsWith('reload')).toBe(true)
          expect(flag2.endsWith('my/extension/path')).toBe(true)
        }
      )
    })
  })
})
