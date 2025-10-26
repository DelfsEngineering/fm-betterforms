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

**Version:** 3.2.31+  
**Feature:** `BF.libraryLoadOnce()`, `BF.libraryIsLoaded()`, `BF.libraryGetLoaded()`

Load external JavaScript libraries, ESM modules, and CSS files from CDN dynamically within your function actions. Libraries are loaded once and cached automatically (idempotent).

### Why Use This?

- **Reduce initial page load** - Only load libraries when needed
- **Self-contained components** - Components can load their own dependencies
- **Version flexibility** - Use different library versions per form
- **No rebuild required** - Add new libraries without webpack rebuild

### Quick Start

**Load a UMD Library:**
```javascript
// Load jQuery from CDN
await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js');

// Use it immediately
$('#myElement').hide();
```

**Load an ESM Module:**
```javascript
// Load lodash-es as ES module
const _ = await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/+esm', {
  moduleType: 'module'
});

// Use module exports
console.log(_.chunk([1,2,3,4,5,6], 2));
// Output: [[1,2], [3,4], [5,6]]
```

**Load CSS:**
```javascript
// Load stylesheet
await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/animate.css@4.1.1/animate.min.css', {
  type: 'stylesheet'
});

// Styles are now available
```

### API Reference

#### `BF.libraryLoadOnce(url, options)`

Load a library from CDN. Returns immediately if already loaded (idempotent).

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `url` | String | *required* | CDN URL to JavaScript, ESM module, or CSS file |
| `options` | Object | `{}` | Optional configuration |
| `options.type` | String | `'script'` | `'script'` or `'stylesheet'` |
| `options.moduleType` | String | `'classic'` | `'classic'` for UMD or `'module'` for ESM |
| `options.timeout` | Number | `30000` | Timeout in milliseconds |
| `options.attributes` | Object | `{}` | Additional HTML attributes (e.g., integrity, crossorigin) |

**Returns:**
- **UMD/Script:** Promise resolving to `{ url, type, element, cached }`
- **ESM Module:** Promise resolving to the module object

**Throws:** Error if network failure, timeout, or invalid parameters

#### `BF.libraryIsLoaded(url)`

Check if a library is already loaded.

```javascript
if (BF.libraryIsLoaded('https://cdn.example.com/lib.js')) {
  console.log('Already loaded!');
}
```

**Returns:** Boolean

#### `BF.libraryGetLoaded()`

Get array of all loaded library URLs.

```javascript
const loaded = BF.libraryGetLoaded();
console.log('Loaded libraries:', loaded);
```

**Returns:** Array of URL strings

### Common Examples

**Chart.js:**
```javascript
// Load Chart.js
await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js');

// Create a chart
const ctx = document.getElementById('myChart').getContext('2d');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['January', 'February', 'March'],
    datasets: [{
      label: 'Sales',
      data: [12, 19, 3],
      backgroundColor: 'rgba(54, 162, 235, 0.5)'
    }]
  }
});
```

**Axios for API Calls:**
```javascript
// Load Axios
await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js');

// Make API call
const response = await axios.get('https://api.github.com/users/octocat');
console.log('User:', response.data.name);
```

**Error Handling:**
```javascript
try {
  await BF.libraryLoadOnce('https://cdn.example.com/library.js', {
    timeout: 5000  // 5 second timeout
  });
  console.log('Library loaded successfully!');
} catch (error) {
  console.error('Failed to load library:', error.message);
  BF.errorThrow(10500, 'Library load failed', error.message);
}
```

**Check Before Loading:**
```javascript
// Avoid loading if already loaded
if (!BF.libraryIsLoaded('https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js')) {
  await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js');
}

// Use lodash
console.log(_.chunk([1,2,3,4], 2));
```

### Best Practices

**✅ DO:**
- **Use version pinning:** Specify exact versions in CDN URLs
- **Check if loaded first:** Avoid unnecessary calls with `BF.libraryIsLoaded()`
- **Use error handling:** Always catch potential failures
- **Prefer UMD builds:** More compatible, simpler to use

**❌ DON'T:**
- **Don't load untrusted CDNs:** Security risk
- **Don't load without error handling:** Can break your form
- **Don't use latest/unstable versions:** Use pinned versions
- **Don't load duplicate libraries:** Check first with `BF.libraryIsLoaded()`

### Supported Library Formats

**UMD (Universal Module Definition)** - Most common format, exposes global variable
**ESM (ES Modules)** - Modern format, returns module object
**CSS Stylesheets** - Any CSS file for animations, themes, frameworks

### Recommended CDNs

- **jsDelivr:** `https://cdn.jsdelivr.net/npm/package@version/file`
- **unpkg:** `https://unpkg.com/package@version/file`
- **cdnjs:** `https://cdnjs.cloudflare.com/ajax/libs/package/version/file`
