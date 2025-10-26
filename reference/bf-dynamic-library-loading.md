---
description: >-
  Dynamic library loading functionality for BetterForms - Load external JavaScript libraries, ESM modules, and CSS files from CDN dynamically within function actions.
---

# Dynamic Library Loading

**Version:** 3.2.31+  
**Feature:** `BF.libraryLoadOnce()`, `BF.libraryIsLoaded()`, `BF.libraryGetLoaded()`

## Overview

Load external JavaScript libraries, ESM modules, and CSS files from CDN dynamically within your function actions. Libraries are loaded once and cached automatically (idempotent).

## Why Use This?

- **Reduce initial page load** - Only load libraries when needed
- **Self-contained components** - Components can load their own dependencies
- **Version flexibility** - Use different library versions per form
- **No rebuild required** - Add new libraries without webpack rebuild

## Quick Start

### Load a UMD Library

```javascript
// Load jQuery from CDN
await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js');

// Use it immediately
$('#myElement').hide();
```

### Load an ESM Module

```javascript
// Load lodash-es as ES module
const _ = await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/+esm', {
  moduleType: 'module'
});

// Use module exports
console.log(_.chunk([1,2,3,4,5,6], 2));
// Output: [[1,2], [3,4], [5,6]]
```

### Load CSS

```javascript
// Load stylesheet
await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/animate.css@4.1.1/animate.min.css', {
  type: 'stylesheet'
});

// Styles are now available
```

---

## API Reference

### `BF.libraryLoadOnce(url, options)`

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

---

### `BF.libraryIsLoaded(url)`

Check if a library is already loaded.

```javascript
if (BF.libraryIsLoaded('https://cdn.example.com/lib.js')) {
  console.log('Already loaded!');
}
```

**Returns:** Boolean

---

### `BF.libraryGetLoaded()`

Get array of all loaded library URLs.

```javascript
const loaded = BF.libraryGetLoaded();
console.log('Loaded libraries:', loaded);
```

**Returns:** Array of URL strings

---

## Usage Examples

### Example 1: Chart.js

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

### Example 2: DayJS (ESM)

```javascript
// Load DayJS as ESM module
const dayjs = await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/dayjs@1.11.10/+esm', {
  moduleType: 'module'
});

// Format dates
console.log('Today:', dayjs.default().format('YYYY-MM-DD'));
console.log('Next week:', dayjs.default().add(7, 'day').format('MMMM D, YYYY'));
```

### Example 3: Axios for API Calls

```javascript
// Load Axios
await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js');

// Make API call
const response = await axios.get('https://api.github.com/users/octocat');
console.log('User:', response.data.name);
console.log('Followers:', response.data.followers);
```

### Example 4: Load with Security (SRI)

```javascript
// Load with Subresource Integrity
await BF.libraryLoadOnce('https://code.jquery.com/jquery-3.6.0.min.js', {
  attributes: {
    integrity: 'sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=',
    crossorigin: 'anonymous'
  }
});
```

### Example 5: Error Handling

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

### Example 6: Check Before Loading

```javascript
// Avoid loading if already loaded
if (!BF.libraryIsLoaded('https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js')) {
  await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js');
}

// Use lodash
console.log(_.chunk([1,2,3,4], 2));
```

### Example 7: Multiple Libraries

```javascript
// Load multiple libraries in parallel
await Promise.all([
  BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js'),
  BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/moment@2.29.4/moment.min.js'),
  BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js')
]);

console.log('All libraries loaded!');
```

### Example 8: Dynamic Library Selection

```javascript
// Load different library based on user preference
const chartLibrary = model.chartType === 'advanced' 
  ? 'https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js'
  : 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js';

await BF.libraryLoadOnce(chartLibrary);
```

---

## Best Practices

### ✅ DO:

- **Use version pinning:** Specify exact versions in CDN URLs
  ```javascript
  // Good
  'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js'
  
  // Avoid
  'https://cdn.jsdelivr.net/npm/lodash/lodash.min.js' // latest, unstable
  ```

- **Check if loaded first:** Avoid unnecessary calls
  ```javascript
  if (!BF.libraryIsLoaded(url)) {
    await BF.libraryLoadOnce(url);
  }
  ```

- **Use error handling:** Always catch potential failures
  ```javascript
  try {
    await BF.libraryLoadOnce(url);
  } catch (error) {
    // Handle gracefully
  }
  ```

- **Prefer UMD builds:** More compatible, simpler to use
  ```javascript
  // UMD (preferred)
  await BF.libraryLoadOnce('lib.umd.js');
  window.LibraryName.doSomething();
  
  // ESM (if needed)
  const lib = await BF.libraryLoadOnce('lib.esm.js', { moduleType: 'module' });
  lib.default.doSomething();
  ```

### ❌ DON'T:

- **Don't load untrusted CDNs:** Security risk
- **Don't load without error handling:** Can break your form
- **Don't use latest/unstable versions:** Use pinned versions
- **Don't load duplicate libraries:** Check first with `BF.libraryIsLoaded()`

---

## Supported Library Formats

### ✅ UMD (Universal Module Definition)
- **Most common format**
- Exposes global variable
- Works everywhere
- Examples: jQuery, Lodash, Moment, Chart.js

```javascript
await BF.libraryLoadOnce('https://cdn.example.com/lib.umd.js');
window.LibraryName.method();
```

### ✅ ESM (ES Modules)
- **Modern format**
- Uses `import`/`export`
- Returns module object
- Examples: Lodash-ES, DayJS ESM builds

```javascript
const lib = await BF.libraryLoadOnce('https://cdn.example.com/lib.esm.js', {
  moduleType: 'module'
});
lib.default.method();
```

### ✅ CSS Stylesheets
- **Any CSS file**
- Animations, themes, frameworks
- Examples: Animate.css, Font Awesome

```javascript
await BF.libraryLoadOnce('https://cdn.example.com/styles.css', {
  type: 'stylesheet'
});
```

---

## Finding CDN URLs

### Recommended CDNs:

**jsDelivr** (Recommended)
- URL: `https://cdn.jsdelivr.net/npm/package@version/file`
- Example: `https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js`
- Supports npm packages, GitHub repos
- ESM support: Add `/+esm` suffix

**unpkg**
- URL: `https://unpkg.com/package@version/file`
- Example: `https://unpkg.com/lodash@4.17.21/lodash.min.js`
- Simple, fast

**cdnjs**
- URL: `https://cdnjs.cloudflare.com/ajax/libs/package/version/file`
- Example: `https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js`
- Large library

### How to Find Files:

1. Visit `https://cdn.jsdelivr.net/npm/package-name@version/`
2. Browse to find the right file:
   - `dist/package.umd.js` - UMD build
   - `dist/package.esm.js` - ESM build  
   - `dist/package.min.js` - Minified (usually UMD)

---

## Common Libraries

### Chart.js
```javascript
await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js');
```

### Lodash
```javascript
await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js');
```

### Moment.js
```javascript
await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/moment@2.29.4/moment.min.js');
```

### jQuery
```javascript
await BF.libraryLoadOnce('https://code.jquery.com/jquery-3.7.1.min.js');
```

### Axios
```javascript
await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js');
```

### DayJS (ESM)
```javascript
const dayjs = await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/dayjs@1.11.10/+esm', {
  moduleType: 'module'
});
```

---

## Troubleshooting

### Library Not Available After Loading

**Problem:** Library loads but `window.LibraryName` is undefined

**Solution:** You might have loaded an ESM module as UMD
```javascript
// Try as ESM instead
const lib = await BF.libraryLoadOnce(url, { moduleType: 'module' });
console.log(lib); // Check what's in the module
```

### Timeout Error

**Problem:** Library takes too long to load

**Solution:** Increase timeout or check network
```javascript
await BF.libraryLoadOnce(url, { timeout: 60000 }); // 60 seconds
```

### CORS Error

**Problem:** "blocked by CORS policy"

**Solution:** Use a reputable CDN that supports CORS (jsDelivr, unpkg, cdnjs)

### Version Conflicts

**Problem:** Library already loaded but different version

**Solution:** Check what's loaded first
```javascript
const loaded = BF.libraryGetLoaded();
console.log('Already loaded:', loaded);
```

---

## Need Help?

- Check the [BetterForms documentation](https://docs.fmbetterforms.com)
- Visit the [BetterForms community forum](https://community.fmbetterforms.com)
- Review usage examples above
- Test in browser console first before using in function actions

---

**Happy coding! 🚀**
