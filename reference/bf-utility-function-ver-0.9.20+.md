---
description: >-
  BetterForm has a collection of helper Java Script functions that are used
  within JavaScript to allow  easy access to common complex code.
---

# BF Utility Functions

| Function | Description |
|----------|-------------|
| **Actions** | |
| `BF.actionsClear()` | Clears the action script buffer halting all subsequent actions (current action completes) |
| | |
| **Errors** | |
| `BF.errorClearAll()` | Clears the error cache |
| `BF.errorGetAll()` | Returns all current errors |
| `BF.errorThrow(errorCode, errorDescription, info)` | Creates an error |
| | |
| **Actions** | |
| `BF.namedAction(name, options)` | Runs a named action, options are propagated to all actions within the named action. |
| | |
| **Misc** | |
| `BF.getPaths(object, JPquery)` | Returns JSONPath query on passed object |
| `BF.getQueryParam(key)` | Returns the URL query key value |
| `BF.i18n(key)` | Internationalization translations. Returns the key's value in its correct language. |
| `BF.getUUID()` | Returns a UUID |
| `BF.pwaSetManifest(manifest)` | Sets the manifest for PWA apps. `manifest` is a JSON object that confirms to a standard PWA manifest object. |
| **`BF.getVersion()`** | Returns an object with version info: `{ basecode, app }`.<br>**basecode** is the BF operating system version. **app** is the published app version (from the evironments card if present, otherwise falls back to `site.hash`).<br>*Available in basecode v3.2.19+*. |
| `BF.rebuildReactivity(object)` | This function is normally run upon the completion of a `function` internally by the BF actions processor.<br>It recursively scans the object passed and adds new reactive keys to keys that are new or do not have reactivity. You will not need to use this within a function unless that function has a callback that later mutates a reactive object. Eg: setTimeout() which takes a callback. |
| `BF.socketConnect()` | Connects the client to the BF server via a socket |
| `BF.socketDisconnect()` | Disconnects the client from the BF servers (Goes off line) |
| | |
| **Dynamic Library Loading** | |
| `BF.libraryLoadOnce(url, options)` | Load external JavaScript libraries, ESM modules, and CSS files from CDN dynamically. Libraries are loaded once and cached automatically (idempotent).<br>*Available in basecode v3.2.31+*. |
| `BF.libraryIsLoaded(url)` | Check if a library is already loaded. Returns boolean.<br>*Available in basecode v3.2.31+*. |
| `BF.libraryGetLoaded()` | Get array of all loaded library URLs.<br>*Available in basecode v3.2.31+*. |

## Dynamic Library Loading

For detailed documentation on the dynamic library loading functions (`BF.libraryLoadOnce`, `BF.libraryIsLoaded`, `BF.libraryGetLoaded`), see:

[Dynamic Library Loading](bf-dynamic-library-loading.md)
