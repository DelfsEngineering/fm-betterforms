# showAlert

Displays a non‑blocking toaster/notification alert.

| Key | Description |
| :--- | :--- |
| action | `showAlert` |
| options.text | Body text for alert |
| options.title | Title text |
| options.type | `info` \| `warn` \| `error` \| `success` |
| options.position | Position (e.g. `top center`, `bottom left`, …) |
| options.options | object - additional options to the parent options |

showAlert is powered by vue-notification.  
See: [vue-notification README](https://github.com/euvl/vue-notification/blob/master/README.md)

---

## Slot‑based custom HTML (Basecode 3.2.xx+)

Starting in basecode 3.2.xx+, `showAlert` supports providing a custom HTML template that fully replaces the default notification body. Use either the `html` or `template` key in `options`.

Notes:
- Your HTML is rendered via the BetterForms `html-renderer-old` component.
- When you need access to the vue‑notification slot context, reference it as `props.item` and `props.close()` inside your template (not `item`/`close` directly).
- If you don’t need slot props, you can omit them entirely.

### Example A – Simple custom body (no slot props)

```json
{
  "action": "showAlert",
  "options": {
    "type": "success",
    "position": "bottom left",
    "html": "<div style=\"padding:12px 14px; border:1px solid #c1ecd5; background:#eaf9f1; border-radius:6px; color:#1f2d3d;\">Operation complete.</div>"
  }
}
```

### Example B – Advanced body using slot props (`props.item`, `props.close`)

```json
{
  "action": "showAlert",
  "options": {
    "title": "TEST NOTIFICATION #2",
    "text": "This is notification text!",
    "position" : "bottom left",
    "type": "success",
    "html": "\n<div class=\"flex items-start gap-3 p-4 border border-green-200 bg-green-50 rounded-md relative w-full\">\n  <i class=\"fas fa-check-circle text-green-500 text-2xl flex-shrink-0\"></i>\n  <div class=\"flex-1 text-green-900\">\n    <div class=\"font-bold uppercase tracking-wide mb-1 opacity-90 text-green-900\">{{ props.item.title }}</div>\n    <div class=\"text-3xl leading-snug text-green-900\">{{ props.item.text }}</div>\n    <div class=\"mt-1 text-sm text-green-700\">Date: {{ new Date().toString() }}</div>\n  </div>\n  <button @click=\"props.close()\" aria-label=\"Close\" class=\"absolute top-2 right-2 bg-transparent border-none text-green-400 text-lg cursor-pointer p-0 leading-none\">\n    &times;\n  </button>\n</div>\n"
  }
}
```

Tip: Font Awesome classes (e.g., `fas fa-check-circle`) assume FA is loaded in your app/theme.

---

## FileMaker Custom Function

This CF allows for super easy implementation. Pass additional options in the options object if needed.

```text
// V1
BF_SetAction_showAlert( title ; type ; text ; options ) 
or 
// V2
BF_SetAction_showAlert_g
```

