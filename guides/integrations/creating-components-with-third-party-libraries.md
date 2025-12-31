# Creating Custom Components with Third-Party Libraries

Learn how to create self-contained, reusable custom components that integrate third-party JavaScript libraries like FullCalendar, Leaflet maps, Chart.js, and more.

---

## Overview

BetterForms custom components can integrate any JavaScript library using lifecycle hooks. This guide shows you how to:

- ✅ Load external libraries on-demand
- ✅ Initialize libraries with DOM elements
- ✅ Properly clean up when components are removed
- ✅ Create fully self-contained, shareable components

---

## Prerequisites

- Basic understanding of JSON
- Familiarity with the BetterForms Component Editor
- Knowledge of the third-party library you want to integrate

---

## Component Lifecycle Hooks

Custom components support lifecycle hooks for managing loading, initialization, and cleanup:

### Available Hooks

| Hook | When it Fires | Use For |
|------|---------------|---------|
| `onBeforeMount` | Before component renders (blocks rendering) | Loading external libraries, fetching data |
| `onMount` | After component renders to DOM | Initializing libraries, accessing DOM elements |
| `onUpdated` | After component data changes | Updating library instances |
| `onBeforeDestroy` | Before component is removed | Cleanup, destroying library instances |
| `onDestroyed` | After component is removed | Final cleanup |

### Execution Order

```
[onBeforeMount] ← Component waits here
    ↓
Component Renders to DOM
    ↓
[onMount] ← DOM elements are now available
    ↓
Component is Interactive
    ↓ (when data changes)
[onUpdated]
    ↓ (when removing)
[onBeforeDestroy]
    ↓
Component Removed
    ↓
[onDestroyed]
```

---

## Complete Example: FullCalendar Component

This example demonstrates all key patterns for integrating a third-party library.

### Step 1: Component Structure

```json
{
  "name": "FullCalendar",
  "description": "Interactive event calendar with month/week/day views",
  "comp": {
    "BFName": "FullCalendar",
    "html": "<div id=\"calendarRoot\" style=\"min-height: 500px; background: white;\"></div>",
    "namedActions": {
      "onBeforeMount": [...],
      "onMount": [...],
      "onBeforeDestroy": [...],
      "today": [...]
    },
    "styleClasses": "w-full max-w-5xl"
  }
}
```

### Step 2: Load the Library (onBeforeMount)

```json
"onBeforeMount": [{
  "action": "function",
  "function": "await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/fullcalendar@6.1.20/index.global.min.js');"
}]
```

**Why `onBeforeMount`?**
- Component waits for library to load before rendering
- Prevents "FullCalendar is not defined" errors
- `BF.libraryLoadOnce()` deduplicates - safe to use in multiple components

### Step 3: Initialize the Library (onMount)

```json
"onMount": [{
  "action": "function",
  "function": "const el = document.getElementById('calendarRoot');\nif (!el) { console.error('Calendar element not found'); return; }\n\nconst calendar = new FullCalendar.Calendar(el, {\n  initialView: 'dayGridMonth',\n  headerToolbar: {\n    left: 'prev,next today',\n    center: 'title',\n    right: 'dayGridMonth,timeGridWeek,timeGridDay'\n  },\n  events: model.calendarEvents || [],\n  editable: true,\n  selectable: true,\n  eventClick: function(info) {\n    alert('Event: ' + info.event.title);\n  }\n});\n\ncalendar.render();\nwindow._calendarApi = calendar;\nconsole.log('✅ Calendar initialized');"
}]
```

**Key Patterns:**

1. **Access DOM with `document.getElementById()`**
   ```javascript
   const el = document.getElementById('calendarRoot'); // ✅ Works
   const el = this.$refs.calendarRoot; // ❌ Doesn't work in namedActions!
   ```

2. **Always check if element exists**
   ```javascript
   if (!el) { 
     console.error('Element not found'); 
     return; 
   }
   ```

3. **Store API reference globally**
   ```javascript
   window._calendarApi = calendar; // For use in other actions
   ```

4. **Access model data**
   ```javascript
   events: model.calendarEvents || [] // Falls back to empty array
   ```

### Step 4: Add Cleanup (onBeforeDestroy)

```json
"onBeforeDestroy": [{
  "action": "function",
  "function": "if (window._calendarApi) {\n  window._calendarApi.destroy();\n  window._calendarApi = null;\n  console.log('Calendar destroyed');\n}"
}]
```

**Why cleanup is important:**
- Prevents memory leaks
- Stops event listeners
- Clears intervals/timeouts
- Frees resources

### Step 5: Add Custom Actions (Optional)

```json
"today": [{
  "action": "function",
  "function": "if (window._calendarApi) { window._calendarApi.today(); }"
}]
```

This action can be called from buttons or other components:
```html
<button @click="namedAction('today')">Go to Today</button>
```

---

## Complete Working Component

Here's the full JSON you can copy and use:

```json
{
  "name": "FullCalendar",
  "description": "Interactive event calendar with month/week/day views",
  "comp": {
    "BFName": "FullCalendar",
    "html": "<div id=\"calendarRoot\" style=\"min-height: 500px; background: white;\"></div>",
    "namedActions": {
      "onBeforeMount": [{
        "action": "function",
        "function": "await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/fullcalendar@6.1.20/index.global.min.js');"
      }],
      "onMount": [{
        "action": "function",
        "function": "const el = document.getElementById('calendarRoot');\nif (!el) { console.error('Calendar element not found'); return; }\n\nconst calendar = new FullCalendar.Calendar(el, {\n  initialView: 'dayGridMonth',\n  headerToolbar: { left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' },\n  events: model.calendarEvents || [],\n  editable: true,\n  selectable: true,\n  eventClick: function(info) { alert('Event: ' + info.event.title); }\n});\n\ncalendar.render();\nwindow._calendarApi = calendar;"
      }],
      "onBeforeDestroy": [{
        "action": "function",
        "function": "if (window._calendarApi) { window._calendarApi.destroy(); window._calendarApi = null; }"
      }],
      "today": [{
        "action": "function",
        "function": "if (window._calendarApi) { window._calendarApi.today(); }"
      }],
      "nextMonth": [{
        "action": "function",
        "function": "if (window._calendarApi) { window._calendarApi.next(); }"
      }],
      "prevMonth": [{
        "action": "function",
        "function": "if (window._calendarApi) { window._calendarApi.prev(); }"
      }]
    },
    "styleClasses": "w-full max-w-5xl mx-auto"
  }
}
```

---

## Using the Component on a Page

Add to your page schema:

```json
{
  "type": "bfcomponent",
  "model": "calendar",
  "name": "FullCalendar"
}
```

### Providing Event Data

Set `model.calendarEvents` in your page data model:

```json
{
  "calendarEvents": [
    {
      "title": "Team Meeting",
      "start": "2025-01-15",
      "backgroundColor": "#3b82f6"
    },
    {
      "title": "Project Deadline",
      "start": "2025-01-20",
      "end": "2025-01-21",
      "backgroundColor": "#ef4444"
    }
  ]
}
```

### Adding Navigation Buttons

```json
{
  "type": "button",
  "label": "Today",
  "buttonClickActions": [{
    "action": "namedAction",
    "options": { "namedAction": "today" }
  }]
},
{
  "type": "button",
  "label": "Next Month",
  "buttonClickActions": [{
    "action": "namedAction",
    "options": { "namedAction": "nextMonth" }
  }]
}
```

---

## Common Patterns

### Pattern 1: Simple Library (No DOM Access)

For libraries that don't need DOM elements (like Lodash, Moment.js):

```json
{
  "namedActions": {
    "onBeforeMount": [{
      "action": "function",
      "function": "await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/moment@2.29.4/moment.min.js');"
    }],
    "onMount": [{
      "action": "function",
      "function": "const now = moment().format('MMMM Do YYYY, h:mm:ss a');\nconsole.log('Current time:', now);"
    }]
  }
}
```

### Pattern 2: Library Needing DOM Access

For libraries that render to a DOM element (FullCalendar, Chart.js, Leaflet):

```json
{
  "html": "<div id=\"myLibraryContainer\"></div>",
  "namedActions": {
    "onBeforeMount": [{
      "action": "function",
      "function": "await BF.libraryLoadOnce('https://cdn.example.com/library.js');"
    }],
    "onMount": [{
      "action": "function",
      "function": "const el = document.getElementById('myLibraryContainer');\nif (!el) return;\n\nconst instance = new Library(el, options);\nwindow._myLibraryInstance = instance;"
    }],
    "onBeforeDestroy": [{
      "action": "function",
      "function": "if (window._myLibraryInstance) { window._myLibraryInstance.destroy(); }"
    }]
  }
}
```

### Pattern 3: Singleton Initialization

When registering Vue components or global objects (only initialize once):

```json
{
  "namedActions": {
    "onBeforeMount": [{
      "action": "function",
      "function": "await BF.libraryLoadOnce('https://cdn.example.com/vue-plugin.js');\n\nwindow.__bfSingletons = window.__bfSingletons || {};\nif (!window.__bfSingletons.myPlugin) {\n  window.__bfSingletons.myPlugin = true;\n  Vue.component('my-plugin', VuePlugin);\n}"
    }]
  }
}
```

---

## Important: DOM Access in namedActions

### ❌ What DOESN'T Work

```javascript
// ❌ WRONG - this.$refs is NOT available in namedAction functions
const element = this.$refs.myElement;

// ❌ WRONG - schema is NOT directly accessible
const config = schema.calendarConfig;

// ❌ WRONG - component instance properties
const value = this.myProperty;
```

### ✅ What DOES Work

```javascript
// ✅ Standard DOM queries
const element = document.getElementById('myElement');
const element = document.querySelector('#myElement');

// ✅ Model data
const events = model.calendarEvents;
const config = model.chartConfig;

// ✅ App state
const user = app.currentUser;

// ✅ Global storage
window._myLibraryInstance = instance;

// ✅ BetterForms utilities
await BF.libraryLoadOnce('...');
```

### Best Practice: Use `id` Attributes

Always add `id` attributes to elements you need to access in lifecycle hooks:

```html
<!-- ✅ Good -->
<div id="chartContainer"></div>
<div id="mapRoot"></div>
<div id="editorElement"></div>

<!-- ❌ Avoid - ref won't work in namedActions -->
<div ref="myElement"></div>
```

---

## Another Example: Chart.js Component

```json
{
  "name": "ChartJS",
  "description": "Responsive charts using Chart.js",
  "comp": {
    "BFName": "ChartJS",
    "html": "<canvas id=\"chartCanvas\" style=\"max-height: 400px;\"></canvas>",
    "namedActions": {
      "onBeforeMount": [{
        "action": "function",
        "function": "await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js');"
      }],
      "onMount": [{
        "action": "function",
        "function": "const ctx = document.getElementById('chartCanvas');\nif (!ctx) return;\n\nconst chart = new Chart(ctx, {\n  type: 'bar',\n  data: {\n    labels: model.chartLabels || ['Jan', 'Feb', 'Mar'],\n    datasets: [{\n      label: 'Sales',\n      data: model.chartData || [12, 19, 3],\n      backgroundColor: 'rgba(54, 162, 235, 0.5)'\n    }]\n  },\n  options: {\n    responsive: true,\n    maintainAspectRatio: true\n  }\n});\n\nwindow._chartInstance = chart;"
      }],
      "onBeforeDestroy": [{
        "action": "function",
        "function": "if (window._chartInstance) { window._chartInstance.destroy(); window._chartInstance = null; }"
      }],
      "updateData": [{
        "action": "function",
        "function": "if (window._chartInstance && model.chartData) {\n  window._chartInstance.data.datasets[0].data = model.chartData;\n  window._chartInstance.update();\n}"
      }]
    }
  }
}
```

---

## Finding CDN URLs for Libraries

Most JavaScript libraries provide CDN links. Here are common sources:

### Option 1: jsDelivr (Recommended)
[https://www.jsdelivr.com/](https://www.jsdelivr.com/)

Search for your library and get the CDN URL:
```
https://cdn.jsdelivr.net/npm/fullcalendar@6.1.20/index.global.min.js
https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js
https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.min.js
```

### Option 2: Library's Official Docs

Most libraries document their CDN links:
- FullCalendar: [https://fullcalendar.io/docs/initialize-globals](https://fullcalendar.io/docs/initialize-globals)
- Chart.js: [https://www.chartjs.org/docs/latest/getting-started/](https://www.chartjs.org/docs/latest/getting-started/)
- Leaflet: [https://leafletjs.com/download.html](https://leafletjs.com/download.html)

### Loading CSS Stylesheets

Some libraries require CSS files:

```javascript
await BF.libraryLoadOnce(
  'https://cdn.jsdelivr.net/npm/fullcalendar@6.1.20/main.min.css',
  { type: 'stylesheet' }
);
```

---

## Troubleshooting

### Issue: "Element not found" in onMount

**Symptoms:**
- Console error: "Element not found"
- Library fails to initialize
- Blank component

**Solutions:**
1. Verify the `id` in HTML matches the `getElementById()` call
2. Check console for JavaScript errors
3. Ensure the element has content/dimensions (add `style="min-height: 500px;"`)

### Issue: Library is not defined

**Symptoms:**
- "ReferenceError: FullCalendar is not defined"

**Solutions:**
1. Verify CDN URL is correct
2. Check that `onBeforeMount` is loading the library
3. Check browser Network tab - is the script loading?
4. Try a different CDN or version

### Issue: Component works but memory leak

**Symptoms:**
- Multiple instances stack up
- Performance degrades over time

**Solutions:**
1. Add `onBeforeDestroy` cleanup
2. Call library's destroy/remove method
3. Clear global references (`window._api = null`)

### Issue: "this.$refs is not a function"

**Symptoms:**
- TypeError about $refs

**Solution:**
- You cannot use `this.$refs` in namedAction functions
- Use `document.getElementById()` instead

### Issue: "schema is not defined"

**Symptoms:**
- ReferenceError: schema is not defined

**Solution:**
- `schema` is not accessible in namedAction functions
- Store configuration in `model` or hardcode in the function
- Access via `model.myConfig` instead

---

## Best Practices

### ✅ DO:
- Use `id` attributes for elements you need to access
- Check if elements exist before using them
- Store library instances in `window` for global access
- Add cleanup in `onBeforeDestroy`
- Use `model` for dynamic data
- Log to console for debugging
- Test with mock data first

### ❌ DON'T:
- Use `this.$refs` in namedActions (not available)
- Access `schema` directly in functions (not available)
- Forget to destroy library instances
- Load libraries globally if components are self-contained
- Use synchronous operations that block rendering

---

## More Examples

### Leaflet Maps

```json
{
  "name": "LeafletMap",
  "comp": {
    "html": "<div id=\"mapContainer\" style=\"height: 400px; width: 100%;\"></div>",
    "namedActions": {
      "onBeforeMount": [{
        "action": "function",
        "function": "await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.min.js');\nawait BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.min.css', { type: 'stylesheet' });"
      }],
      "onMount": [{
        "action": "function",
        "function": "const el = document.getElementById('mapContainer');\nif (!el) return;\n\nconst map = L.map('mapContainer').setView([51.505, -0.09], 13);\nL.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);\nwindow._mapInstance = map;"
      }],
      "onBeforeDestroy": [{
        "action": "function",
        "function": "if (window._mapInstance) { window._mapInstance.remove(); window._mapInstance = null; }"
      }]
    }
  }
}
```

### CodeMirror Editor

```json
{
  "name": "CodeEditor",
  "comp": {
    "html": "<div id=\"editorContainer\" style=\"height: 300px; border: 1px solid #ddd;\"></div>",
    "namedActions": {
      "onBeforeMount": [{
        "action": "function",
        "function": "await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/codemirror@5.65.2/lib/codemirror.min.js');\nawait BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/codemirror@5.65.2/lib/codemirror.min.css', { type: 'stylesheet' });\nawait BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/codemirror@5.65.2/mode/javascript/javascript.min.js');"
      }],
      "onMount": [{
        "action": "function",
        "function": "const el = document.getElementById('editorContainer');\nif (!el) return;\n\nconst editor = CodeMirror(el, {\n  value: model.code || '// Your code here',\n  mode: 'javascript',\n  lineNumbers: true,\n  theme: 'default'\n});\n\neditor.on('change', (cm) => {\n  model.code = cm.getValue();\n});\n\nwindow._editorInstance = editor;"
      }],
      "onBeforeDestroy": [{
        "action": "function",
        "function": "if (window._editorInstance) { window._editorInstance.toTextArea(); window._editorInstance = null; }"
      }]
    }
  }
}
```

---

## Quick Reference Checklist

When creating a component with a third-party library:

- [ ] Add `id` attribute to your HTML container element
- [ ] Use `onBeforeMount` to load the library with `BF.libraryLoadOnce()`
- [ ] Use `onMount` to initialize the library
- [ ] Access DOM with `document.getElementById()` (NOT `this.$refs`)
- [ ] Check if element exists before using
- [ ] Store API reference in `window._yourApiName`
- [ ] Add `onBeforeDestroy` cleanup
- [ ] Test with mock data in the component editor
- [ ] Add custom actions for common operations

---

## See Also

- [Web Awesome Components](./web-awesome-components.md) - Modern web components integration
- [BF.libraryLoadOnce() Reference](../../reference/bf-dynamic-library-loading.md) - Library loading utility
- [Named Actions](../../reference/actions-processor/actions_named.md) - Understanding named actions
- [Component Editor](../styling/custom-components/components-editor.md) - Using the component editor UI

---

## Next Steps

1. Copy one of the complete examples above
2. Modify the HTML, configuration, and actions for your needs
3. Test in the component editor with mock data
4. Add to your component library
5. Use on pages across your app

You now have everything needed to integrate any JavaScript library into BetterForms! 🎉

