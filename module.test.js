/* global jest, describe, beforeEach, afterEach, it, expect */
const ChromeLauncher = require('chrome-launcher')

const {launchChrome} = require('./steps/serveExtension')

jest.mock('./steps/messaging/createUserDataDir')

describe('webpack-run-chrome-extension', () => {
  describe('webpack config', () => {
    describe('serveExtension', () => {
      let spy

      beforeEach(() => {
        spy = jest.spyOn(ChromeLauncher, 'launch')
      })
      afterEach(() => {
        spy.mockRestore()
      })

      it('`extensionPath` config sets respective browser flag', async () => {
        await launchChrome({
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
          await launchChrome({
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
        await launchChrome({ userDataDir: 'my/profile/dir' })

        const { userDataDir } = await ChromeLauncher.launch.mock.calls[0][0]

        expect(userDataDir).toBe('my/profile/dir')
      })

      it('`startingUrl` config sets respective browser flag', async () => {
        await launchChrome({ startingUrl: 'my/starting/url' })

        const { startingUrl } = await ChromeLauncher.launch.mock.calls[0][0]

        expect(startingUrl).toBe('my/starting/url')
      })

      it('`autoReload` config loads reload extesion by default', async () => {
        await launchChrome()

        const { chromeFlags } = await ChromeLauncher.launch.mock.calls[0][0]
        const flag1 = chromeFlags.find(flag => flag.startsWith('--load-extension'))

        expect(flag1.endsWith('extension,')).toBe(true)
      })

      it(
        '`autoReload` config does not load reload extesion by default',
        async () => {
          await launchChrome({ autoReload: false })

          const { chromeFlags } = await ChromeLauncher.launch.mock.calls[0][0]
          const flag1 = chromeFlags.find(flag => flag.startsWith('--load-extension'))

          expect(flag1.endsWith('extension')).not.toBe(true)
        }
      )

      it(
        '`autoReload` config loads both user extension and reloader as expected',
        async () => {
          await launchChrome({ extensionPath: 'my/extension/path' })

          const { chromeFlags } = await ChromeLauncher.launch.mock.calls[0][0]
          const flags = chromeFlags.find(flag => flag.startsWith('--load-extension'))
          const [flag1, flag2] = flags.split(',')

          expect(flag1.endsWith('extension')).toBe(true)
          expect(flag2.endsWith('my/extension/path')).toBe(true)
        }
      )
    })
  })
})
