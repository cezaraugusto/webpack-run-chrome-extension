/* global jest */
const ChromeLauncher = jest.genMockFromModule('chrome-launcher')

async function launchChrome (opts = {}) {
  const fsMock = {
    openSync: () => {},
    closeSync: () => {},
    writeFileSync: () => {}
  }

  const spawnStub = jest.fn().mockReturnValue({ pid: 'pid' })

  const moduleOverrides = { fs: fsMock, rimraf: jest.fn(), spawn: spawnStub }
  const chromeInstance = new ChromeLauncher.Launcher(opts, moduleOverrides)

  jest
    .spyOn(chromeInstance, 'waitUntilReady')
    .mockReturnValue(Promise.resolve({}))

  chromeInstance.prepare()

  try {
    await chromeInstance.launch()
    return Promise.resolve(spawnStub)
  } catch (err) {
    return Promise.reject(err)
  }
}

ChromeLauncher.Launcher.defaultFlags = jest.fn().mockReturnValue([
  '--disable-features=TranslateUI',
  '--disable-extensions',
  '--disable-component-extensions-with-background-pages',
  '--disable-background-networking',
  '--disable-sync',
  '--metrics-recording-only',
  '--disable-default-apps',
  '--mute-audio',
  '--no-default-browser-check',
  '--no-first-run',
  '--disable-backgrounding-occluded-windows',
  '--disable-renderer-backgrounding',
  '--disable-background-timer-throttling',
  '--force-fieldtrials=*BackgroundTracing/default/'
])
ChromeLauncher.killAll = jest.fn()
ChromeLauncher.launch = async (opts) => await launchChrome(opts)

module.exports = ChromeLauncher
