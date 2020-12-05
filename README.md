[action-image]: https://github.com/cezaraugusto/webpack-open-chrome-extension/workflows/CI/badge.svg
[action-url]: https://github.com/cezaraugusto/webpack-open-chrome-extension/actions
[npm-image]: https://img.shields.io/npm/v/webpack-open-chrome-extension.svg
[npm-url]: https://npmjs.org/package/webpack-open-chrome-extension

# This one works™

# webpack-open-chrome-extension [![workflow][action-image]][action-url] [![npm][npm-image]][npm-url]

<img src="./logo.png" align=right height=180>

> Loads up a WebExtension on a new Chrome intance with built-in live-reload.

Opens up a new Chrome instance with an extension loaded. The Chrome browser instance accepts all flags Chrome does (see [chromeFlags](#chromeFlags)) and loads on a clean profile by default. The extension loaded has default live-reload support.

## Highlights

* Zero-config WebExtension live-reload. Reloads background pages, content scripts, options pages. Everything. (customizable)
* Loads the extension in a clean state by default by providing a fresh profile for every run (customizable).
* No executable downloads. Locates and uses the system installed binary.
* No extra step to open/close Chrome. Killing the webpack dev server instance also kills the browser process.
* Allows additional Chrome flags via options config. Full support to [virtually all Chrome flags](https://peter.sh/experiments/chromium-command-line-switches/).

```bash
yarn add webpack-chrome-extension-launcher -D
```

## Usage

See [webpack.config.js example](./fixtures/webpack.config.js).

```js
new WebpackOpenChromeExtension({
  extensionPath: 'path/to/extension',
  chromeFlags: [
    '--enable-experimental-extension-apis',
    '--embedded-extension-options'
  ],
  userDataDir: 'path/to/user/data/dir',
  startingUrl: 'https://example.com'
})
```

```diff
+ const WebpackOpenChromeExtension = require('webpack-open-chrome-extension')

module.exports {
  plugins: [
+   new WebpackOpenChromeExtension({
+     extensionPath: 'path/to/extension',
+     chromeFlags: [
+       '--enable-experimental-extension-apis',
+       '--embedded-extension-options'
+     ],
+     userDataDir: 'path/to/user/data/dir',
+     startingUrl: 'https://example.com'
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
