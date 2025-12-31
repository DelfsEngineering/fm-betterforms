---
description: >-
  Use Web Awesome components inside BetterForms with self-contained bfcomponents that lazy-load the library and styles.
---

# Web Awesome Components in BetterForms (v3+)

Web Awesome has launched a modern set of web components that you can use directly in BetterForms. This guide shows a minimal, self-contained component you can share so developers can drag-and-drop onto a page without extra setup.

References: [Web Awesome Docs](https://webawesome.com/docs/) · [Usage & bundling](https://webawesome.com/docs/usage)

## Approach

- Self-contained bfcomponent that:
  - Loads Web Awesome once (loader + default theme CSS) using `BF.libraryLoadOnce()`
  - Renders a Web Awesome button (`<wa-button>`) with configurable label/variant
  - Exposes a component-scoped `onClick` named action that forms can override
- Default theme (no special theme class required)

This avoids global setup and works even if a page hasn’t preloaded Web Awesome.

## Component Definition: `wa_button`

Copy this JSON into your components library (site-level is recommended), name it `wa_button`.

```json
{
  "name": "wa_button",
  "schema": {
    "label": "Button",
    "variant": "brand",
    "size": "medium"
  },
  "html": "<wa-button :variant=\"schema.variant || 'brand'\" :size=\"schema.size || 'medium'\" @click=\"namedAction('onClick')\">{{ schema.label || 'Button' }}</wa-button>",
  "namedActions": {
    "onBeforeMount": [{
      "action": "function",
      "function": "try {\n  // Load Web Awesome loader (dist-cdn) and default theme CSS once per app session\n  await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist-cdn/webawesome.loader.js');\n  await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/styles/themes/default.css', { type: 'stylesheet' });\n} catch (error) {\n  console.error('Web Awesome load failed:', error);\n  BF.errorThrow(10500, 'Web Awesome load failed', (error && error.message) || String(error));\n}"
    }],
    "onClick": [{
      "action": "showAlert",
      "options": { "text": "wa_button clicked", "type": "information" }
    }]
  }
}
```

Notes:
- Uses BetterForms lifecycle `onBeforeMount` so the component waits for the library/style before rendering.
- `BF.libraryLoadOnce()` deduplicates loads, so multiple instances/pages remain fast.
- Forms can override `onClick` at form scope with their own named action.

## Usage on a Page

Add a bfcomponent element that references `wa_button`.

```json
{
  "type": "bfcomponent",
  "name": "wa_button",
  "attributes": {
    "label": "Save",
    "variant": "brand",
    "size": "medium"
  }
}
```

Optionally, override the click behavior at form scope by defining an `onClick` named action on the page:

```json
{
  "form": {
    "namedActions": {
      "onClick": [
        { "action": "showAlert", "options": { "text": "Saving...", "type": "information" } },
        { "action": "runUtilityHook", "options": { "type": "save" } }
      ]
    }
  }
}
```

## Alternative: Global Project Script (CDN Kit)

Web Awesome “Projects” are like Font Awesome kits: a single script you place in the site’s `<head>` that brings in the library, styles, and assets automatically and updates centrally.

- Place the Project script in BetterForms: Site Settings → DOM Header Insertions
- Then your components can skip the `onBeforeMount` loader step

Docs: [Getting Started – Using a Project](https://webawesome.com/docs/)

## Troubleshooting

- Button renders unstyled: Ensure default theme CSS is loaded. This component loads `default.css` automatically via `onBeforeMount`.
- Component flashes before styles arrive: We use `onBeforeMount` (blocking) to avoid FOUC.
- Conflicts with custom theme: Switch the CSS URL in the loader step to your theme, or load `webawesome.css` if you want the full styles bundle.

## Next Steps

- Wrap additional elements (e.g., `wa-input`) using the same pattern: load once in `onBeforeMount`, then render the element.
- Provide a small component pack for your team (buttons, inputs, badges, cards).
- If you later choose a different theme, swap the CSS URL in one place inside the component.

## See Also

- [Creating Components with Third-Party Libraries](./creating-components-with-third-party-libraries.md) - Complete guide with FullCalendar, Chart.js, Leaflet, and more examples
- [BF.libraryLoadOnce() Reference](../../reference/bf-dynamic-library-loading.md) - Library loading utility documentation
- [Component Best Practices](../styling/custom-components/component-best-practices.md) - General guidelines for component development
