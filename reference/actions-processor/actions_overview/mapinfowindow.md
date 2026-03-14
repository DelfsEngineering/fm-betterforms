---
description: Emits a map info-window event to components listening for map interactions.
---

# mapInfoWindow

`mapInfoWindow` is a component-oriented action that emits an event using the action name itself.

## Action Object

| Key | Type | Description |
| --- | --- | --- |
| `action` | `string` | Must be `"mapInfoWindow"` |
| `options` | `object` | Data consumed by the listening map component |

## Example

```json
{
  "action": "mapInfoWindow",
  "options": {
    "id": "marker-1"
  }
}
```

## Notes

- This action is meant for components that listen for the `mapInfoWindow` event.
- BetterForms emits the entire action object on the internal event bus.
- The exact option shape depends on the map component you are targeting.
- Use this only when your component implementation explicitly supports it.
