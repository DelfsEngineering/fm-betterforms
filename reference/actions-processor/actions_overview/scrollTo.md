# scrollTo

Smoothly scrolls to a target within the document or a scrollable container.

- Purpose: user-friendly scrolling to bring elements into view
- Dependency: `vue-scrollto` (registered app-wide)
- Sequencing: non-blocking; the next action is queued on the next tick after scroll starts

## Payload Schema

| Key                  | Type                         | Description |
| :------------------- | :--------------------------: | :---------- |
| `action`             | `string`                     | Must be `"scrollTo"` |
| `options`            | `object`                     | Parameters forwarded to `vue-scrollto` |
| `options.element`    | `string | Element | number`  | Required. CSS selector, DOM Element, or absolute Y position (in px) |
| `options.duration`   | `number` (ms)                | Optional. If omitted, `vue-scrollto` default is used (typically 500ms) |
| `options.container`  | `string | Element`           | Optional. Scroll container; defaults to `body` |
| `options.easing`     | `string | [number,number,number,number]` | Optional. Easing name or cubic-bezier array |
| `options.offset`     | `number`                     | Optional. Pixel offset added to target. Negative scrolls above |
| `options.cancelable` | `boolean`                    | Optional. Whether user input can cancel the scroll |
| `options.onDone`     | `function`                   | Optional. Called when scrolling finishes |
| `options.onCancel`   | `function`                   | Optional. Called if scrolling is canceled |
| `options.x`          | `boolean`                    | Optional. Enable horizontal scrolling |
| `options.y`          | `boolean`                    | Optional. Enable vertical scrolling |

Behavior
- Calls `VueScrollTo.scrollTo(element, duration, options)` under the hood.
- Does not await completion. If you need to chain work after the scroll ends, either:
  - Use `options.onDone` to trigger follow-up behavior, or
  - Insert a `wait` action approximately equal to `duration` before subsequent actions that depend on the final position.

Error Handling
- Invalid selectors or missing targets generally result in a no‑op; no error is thrown by this action.

## Examples

Basic page scroll (smooth, with offset)
```json
{
  "action": "scrollTo",
  "options": {
    "element": "#section-3",
    "duration": 500,
    "offset": -50,
    "easing": "ease-in-out",
    "y": true
  }
}
```

Scroll within a container with offset and custom easing
```json
{
  "action": "scrollTo",
  "options": {
    "element": ".field-error",
    "container": "#form-wrapper",
    "duration": 600,
    "offset": -20,
    "easing": [0.25, 0.1, 0.25, 1],
    "y": true
  }
}
```

Horizontal scroll (x only)
```json
{
  "action": "scrollTo",
  "options": {
    "element": 400,
    "duration": 400,
    "x": true,
    "y": false
  }
}
```

Approximate sequencing with `wait`
```json
[
  { "action": "scrollTo", "options": { "element": "#details", "duration": 500, "behavior": "smooth" } },
  { "action": "wait", "options": { "ms": 500 } },
  { "action": "showAlert", "options": { "type": "success", "title": "Arrived", "text": "Scroll complete." } }
]
```

Notes
- Form or tab changes may also auto‑scroll when the server response includes configuration that requests scrolling. This is independent of the `scrollTo` action.