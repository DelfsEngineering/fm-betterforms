---
description: >-
  Dynamic library loading functionality for BetterForms - Load external JavaScript libraries, ESM modules, and CSS files from CDN dynamically within function actions.
---

# Dynamic Library Loading

**Version:** 3.3.1+  
**Feature:** `BF.libraryLoadOnce()`, `BF.libraryIsLoaded()`, `BF.libraryGetLoaded()`

## Overview

Load external JavaScript libraries, ESM modules, and CSS files from CDN dynamically within your function actions. Libraries are loaded once and cached automatically (idempotent), with built-in XSS protection and race condition prevention.

## Why Use This?

- **Reduce initial page load** - Only load libraries when needed
- **Self-contained components** - Components can load their own dependencies
- **Version flexibility** - Use different library versions per form
- **No rebuild required** - Add new libraries without webpack rebuild

## Quick Start

### Load a UMD Library

```javascript
// Load PapaParse from CDN
await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js');

// Use it immediately
const result = Papa.parse('Name,Age\nJohn,30', { header: true });
console.log(result.data); // [{Name: "John", Age: "30"}]
```

### Load an ESM Module

```javascript
// Load DayJS as ES module
const dayjs = await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/dayjs@1.11.10/+esm', {
  moduleType: 'module'
});

// Use module exports
console.log('Today:', dayjs.default().format('YYYY-MM-DD'));
console.log('Next week:', dayjs.default().add(7, 'day').format('MMMM D'));
```

{% hint style="info" %}
**ESM modules are scoped to the current function action.** See "ESM Module Scope" section below for multi-action usage patterns.
{% endhint %}

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
await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js', {
  attributes: {
    integrity: 'sha384-example-hash-here',
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

### Example 6: Multiple Libraries

```javascript
// Load multiple libraries in parallel
await Promise.all([
  BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js'),
  BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js'),
  BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js')
]);

console.log('All libraries loaded!');
```

### Example 7: Dynamic Library Selection

```javascript
// Load different library based on user preference
const chartLibrary = model.chartType === 'advanced' 
  ? 'https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js'
  : 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js';

await BF.libraryLoadOnce(chartLibrary);
```

---

## ESM Module Scope

{% hint style="warning" %}
**Important:** ESM modules are scoped to the function action where they're loaded. Unlike UMD libraries (which are automatically global), ESM modules return an object that only exists in the current function's scope.
{% endhint %}

### UMD vs ESM Behavior

**UMD Libraries (automatically global):**
```javascript
// Action 1
await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js');
Papa.parse(csv); // ✅ Works - Papa is global

// Action 2 (later)
Papa.parse(csv); // ✅ Still works - Papa is on window
```

**ESM Modules (function-scoped):**
```javascript
// Action 1
const dayjs = await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/dayjs@1.11.10/+esm', {
  moduleType: 'module'
});
dayjs.default().format('YYYY-MM-DD'); // ✅ Works

// Action 2 (later)
dayjs.default().format('YYYY-MM-DD'); // ❌ Error: dayjs is not defined
```

### Solution 1: Re-load in Each Action (Recommended)

The library is cached, so re-loading is < 1ms:

```javascript
// Action 1
const dayjs = await BF.libraryLoadOnce('url', { moduleType: 'module' });
dayjs.default().format('YYYY-MM-DD');

// Action 2 (later - different function action)
const dayjs = await BF.libraryLoadOnce('url', { moduleType: 'module' });
dayjs.default().format('YYYY-MM-DD'); // ✅ Works - returns cached module in < 1ms
```

**When to use:**
- ✅ Most common case
- ✅ Clean, simple code
- ✅ Nearly instant (cached)

### Solution 2: Bind to Window (If Needed Globally)

Manually store the module on window for global access:

```javascript
// Action 1 (first time setup)
if (!window._myDayjs) {
  window._myDayjs = await BF.libraryLoadOnce('url', { moduleType: 'module' });
}
window._myDayjs.default().format('YYYY-MM-DD');

// Action 2 (later)
window._myDayjs.default().format('YYYY-MM-DD'); // ✅ Works - uses cached reference
```

**When to use:**
- Used across many actions
- Need consistent reference
- Don't mind global namespace

### Do You Even Need It Again?

**In many cases, you won't need the module after initial setup:**

```javascript
// Load chart library, create chart, done
const Chart = await BF.libraryLoadOnce('chart.js', { moduleType: 'module' });
new Chart.default(ctx, config); // Chart is created
// Module reference no longer needed after this action
```

**Only need multi-action access if:**
- Calling library functions repeatedly
- Building complex multi-step workflows
- Library maintains state you need to access

---

## Best Practices

### ✅ DO:

- **Use version pinning:** Specify exact versions in CDN URLs
  ```javascript
  // Good - pinned version
  'https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js'
  
  // Avoid - unpinned, can break
  'https://cdn.jsdelivr.net/npm/papaparse/papaparse.min.js' // latest, unstable
  ```

- **Idempotent by design:** No need to check before loading
  ```javascript
  // Just load it - automatically idempotent
  await BF.libraryLoadOnce(url);
  // If already loaded, returns immediately (< 1ms)
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
- Examples: Chart.js, PapaParse, QRCode, Axios

```javascript
await BF.libraryLoadOnce('https://cdn.example.com/lib.umd.js');
window.LibraryName.method();
```

### ✅ ESM (ES Modules)
- **Modern format**
- Uses `import`/`export`
- Returns module object
- Examples: DayJS, D3.js, Lit (web components)

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

Finding the correct CDN URL can be tricky. Here's how:

### Step 1: Find the Package on npm

1. Go to `https://www.npmjs.com/package/package-name`
2. Check for version number and main file info

### Step 2: Browse the CDN

**jsDelivr (Recommended)**
- Browse: `https://cdn.jsdelivr.net/npm/package-name@version/`
- Example: `https://cdn.jsdelivr.net/npm/dayjs@1.11.10/`
- Look in: `dist/`, `build/`, or root folder
- ESM shortcut: Add `/+esm` to auto-find ESM entry

**Common file patterns:**
- `package.min.js` - Minified UMD (most common)
- `package.umd.js` - UMD build
- `dist/package.js` - Main distribution file
- `build/package.min.js` - Built file

**unpkg**
- Browse: `https://unpkg.com/package@version/?meta` (add `?meta`)
- Example: `https://unpkg.com/papaparse@5.4.1/?meta`

**cdnjs**
- Search: `https://cdnjs.com/libraries/package-name`
- Example: `https://cdnjs.com/libraries/Chart.js`

### Step 3: Verify the File Works

Test in browser console first:
```javascript
// Test UMD
await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/package@version/file.js');
console.log(window.PackageName); // Should exist

// Test ESM  
const pkg = await BF.libraryLoadOnce('url/+esm', { moduleType: 'module' });
console.log(pkg); // Should show module exports
```

### Troubleshooting 404 Errors

1. **Check version exists:** Verify on npmjs.com
2. **Try alternate paths:**
   - `package.min.js`
   - `dist/package.min.js`
   - `build/package.min.js`
   - `index.js`
3. **Check package.json:** `https://cdn.jsdelivr.net/npm/package@version/package.json`
   - Look for `"main"`, `"browser"`, or `"module"` fields

### Real Examples

**Chart.js:**
1. Browse: `https://cdn.jsdelivr.net/npm/chart.js@4.4.0/`
2. Find: `dist/chart.umd.js`
3. URL: `https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js`

**PapaParse:**
1. Browse: `https://cdn.jsdelivr.net/npm/papaparse@5.4.1/`
2. Find: `papaparse.min.js` (at root)
3. URL: `https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js`

**DayJS ESM:**
1. Use shortcut: `https://cdn.jsdelivr.net/npm/dayjs@1.11.10/+esm`
2. Done! (jsDelivr finds ESM automatically)

---

## Common Libraries

### Chart.js (Charting)
```javascript
await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js');
```

### PapaParse (CSV Parser)
```javascript
await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js');
```

### QRCode (QR Generator)
```javascript
await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js');
```

### Axios (HTTP Client)
```javascript
await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js');
```

### DayJS (ESM - Date Library)
```javascript
const dayjs = await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/dayjs@1.11.10/+esm', {
  moduleType: 'module'
});
```

### Sortable.js (Drag & Drop)
```javascript
await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js');
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

## See Also

- **[Creating Components with Third-Party Libraries](../guides/integrations/creating-components-with-third-party-libraries.md)** - Complete guide to building custom components with FullCalendar, Chart.js, Leaflet, and more
- **[Web Awesome Components](../guides/integrations/web-awesome-components.md)** - Modern web components integration example
- **[Named Actions](./actions-processor/actions_named.md)** - Understanding action scripts and lifecycle hooks

---

## Need Help?

- Check the [BetterForms documentation](https://docs.fmbetterforms.com)
- Visit the [BetterForms community forum](https://community.fmbetterforms.com)
- Review usage examples above
- Test in browser console first before using in function actions

---

**Happy coding! 🚀**
