---
description: Runs the form completion hook and waits for it to finish before continuing the action queue.
---

# runOnCompleteHook

`runOnCompleteHook` triggers the form-completion hook flow and does not continue the action queue until that hook finishes.

## Action Object

| Key | Type | Description |
| --- | --- | --- |
| `action` | `string` | Must be `"runOnCompleteHook"` |
| `options` | `object` | Optional payload passed through the action object |

## Example

```json
{
  "action": "runOnCompleteHook"
}
```

## Behavior Notes

- BetterForms emits `runOnCompleteHook` on the client event bus.
- The action waits for the callback before moving to the next queued action.
- If the hook errors, BetterForms still continues the queue after the error is handled.
- Use this when a client-side workflow needs to wait for completion logic before continuing.

## Related Pages

- [Scoped Hooks](../../hooksoverview/hooks.md)
- [runUtilityHook](./runutilityhook.md)
