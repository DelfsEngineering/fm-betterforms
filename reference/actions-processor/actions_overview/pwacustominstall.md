---
description: Captures the browser install prompt so your app can trigger installation later with custom UI.
---

# pwaCustomInstall

`pwaCustomInstall` listens for the browser's `beforeinstallprompt` event, prevents the browser from auto-showing the install prompt, and stores the deferred prompt so your app can trigger it later.

## Action Object

| Key | Type | Description |
| --- | --- | --- |
| `action` | `string` | Must be `"pwaCustomInstall"` |
| `options.beforeinstallprompt` | `function` | Optional callback to run when the browser fires the install prompt event |

## Example

```json
{
  "action": "pwaCustomInstall",
  "options": {
    "beforeinstallprompt": "function or callback setup"
  }
}
```

## Behavior Notes

- BetterForms prevents the default browser install prompt.
- The deferred prompt is stored on `window.deferredPrompt`.
- This action is usually paired with `pwaPromptInstall`, which triggers the saved prompt later.
- Use this when you want a custom install button or install banner instead of the browser's default timing.

## Related Pages

- [pwaPromptInstall](./pwapromptinstall.md)
- [Creating a PWA](../../guides/integrations/creating-a-pwa.md)
