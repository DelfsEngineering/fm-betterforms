---
description: Triggers the stored PWA install prompt and runs callbacks for accept or dismiss outcomes.
---

# pwaPromptInstall

`pwaPromptInstall` triggers the install prompt previously captured by `pwaCustomInstall`.

## Action Object

| Key | Type | Description |
| --- | --- | --- |
| `action` | `string` | Must be `"pwaPromptInstall"` |
| `options.onAccepted` | `function` | Optional callback after the user accepts installation |
| `options.onDismissed` | `function` | Optional callback after the user dismisses installation |

## Example

```json
{
  "action": "pwaPromptInstall"
}
```

## Behavior Notes

- This action uses `window.deferredPrompt`, so it should normally be paired with `pwaCustomInstall`.
- If the user accepts the install prompt, BetterForms calls `options.onAccepted()` when provided.
- If the user dismisses the install prompt, BetterForms calls `options.onDismissed()` when provided.
- After the prompt is handled, BetterForms clears `window.deferredPrompt`.

## Related Pages

- [pwaCustomInstall](./pwacustominstall.md)
- [Creating a PWA](../../../guides/integrations/creating-a-pwa.md)
