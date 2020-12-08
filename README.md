[action-image]: https://github.com/cezaraugusto/webpack-run-chrome-extension/workflows/CI/badge.svg
[action-url]: https://github.com/cezaraugusto/webpack-run-chrome-extension/actions
[npm-image]: https://img.shields.io/npm/v/webpack-run-chrome-extension.svg
[npm-url]: https://npmjs.org/package/webpack-run-chrome-extension
# webpack-run-chrome-extension [![workflow][action-image]][action-url] [![npm][npm-image]][npm-url]

<img src="./logo.png" align=right height=180>

> Build your extension on Chrome with auto-reload support

Opens up a new Chrome instance with an extension loaded. The browser instance accepts all flags Chrome does (see [browserFlags](#browserFlags)) and loads on a clean profile by default. The extension loaded includes default live-reload support.

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

```
yarn add webpack-run-chrome-extension -D
```

If you want to watch for file changes in your extension, `watch` mode must be enabled.

```diff
// webpack config file
+ const WebpackRunChromeExtension = require('webpack-run-chrome-extension')

module.exports {
+  watch: true,
  plugins: [
+   new WebpackRunChromeExtension({
+     extensionPath: 'path/to/extension'
+   })
  ]
}
```

**Lazy sample**

```js
const WebpackRunChromeExtension = require('webpack-run-chrome-extension')

new WebpackRunChromeExtension({
  extensionPath: 'path/to/extension/dir', // Only required field
  browserFlags: [
    '--enable-experimental-extension-apis',
    '--embedded-extension-options'
  ],
  userDataDir: 'path/to/user/data/dir',
  startingUrl: 'https://example.com',
  autoReload: true,
  port: 8081
})
```


## API

### new WebpackRunChromeExtension(options)

#### Options

##### extensionPath (required)

Type: `string`

Path to your extension. Must point to the same directory as the manifest file.

##### browserFlags (optional)

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

##### port (optional)

Type: `number`

What port should run the extension reloader. Defaults to `8080`

## License

MIT (c) Cezar Augusto.
