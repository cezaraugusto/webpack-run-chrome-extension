[action-image]: https://github.com/cezaraugusto/webpack-open-chrome-extension/workflows/CI/badge.svg
[action-url]: https://github.com/cezaraugusto/webpack-open-chrome-extension/actions
[npm-image]: https://img.shields.io/npm/v/webpack-open-chrome-extension.svg
[npm-url]: https://npmjs.org/package/webpack-open-chrome-extension
# webpack-open-chrome-extension [![workflow][action-image]][action-url] [![npm][npm-image]][npm-url]

<img src="./logo.png" align=right height=180>

> Build your extension on Chrome with auto-reload support

Opens up a new Chrome instance with an extension loaded. The browser instance accepts all flags Chrome does (see [chromeFlags](#chromeFlags)) and loads on a clean profile by default. The extension loaded includes default live-reload support.

## Highlights

* Zero-config live-reload. The plugin reloads background pages, content scripts, options pages. Everything. (customizable)
* Fresh profile on every run. Preserve your main profile by using discardable profiles for development (customizable).
* No need to download Chrome. Uses the system installed Chrome binary (accepts Canary builds).
* No hanging processes or extra steps to open/close Chrome. Killing the dev server instance kills all opened plugin processes.
* Supports [virtually all Chrome flags](https://peter.sh/experiments/chromium-command-line-switches/).

```bash
yarn add webpack-chrome-extension-launcher -D
```

## Usage

See [webpack.config.js example](./fixtures/webpack.config.js).

```
yarn add WebpackOpenChromeExtension
```

```js
const WebpackOpenChromeExtension = require('webpack-open-chrome-extension')

new WebpackOpenChromeExtension({
  extensionPath: 'path/to/extension/dir', // Only required field
  chromeFlags: [
    '--enable-experimental-extension-apis',
    '--embedded-extension-options'
  ],
  userDataDir: 'path/to/user/data/dir',
  startingUrl: 'https://example.com',
  autoReload: false
})
```

```diff
+ const WebpackOpenChromeExtension = require('webpack-open-chrome-extension')

module.exports {
  plugins: [
+   new WebpackOpenChromeExtension({
+     extensionPath: 'path/to/extension'
+   })
  ]
}

```

## API

### new WebpackOpenChromeExtension(options)

#### Options

##### extensionPath (required)

Type: `string`

Path to your extension. Must point to the same directory as the manifest file.

##### chromeFlags (optional)

Type: `Array<string>`

Additional flags to pass to Chrome. Defaults to [these flags](https://github.com/GoogleChrome/chrome-launcher/blob/master/src/flags.ts).

For a full list of available flags, see https://peter.sh/experiments/chromium-command-line-switches/.

##### userDataDir (optional)

Type: `string` | `boolean`

What Chrome profile path to use. A boolean value of `false` sets the profile to the default user profile. Defaults to a fresh Chrome profile.

##### startingUrl (optional)

Type: `string`

What URL to start the browser with. Defaults to `about:blank`

##### autoReload (optional)

Type: `boolean`

Whether to enable auto-reload on save. Defaults to `true`

## License

MIT (c) Cezar Augusto.
