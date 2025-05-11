# scrollTo

The `scrollTo` action scrolls the viewport to a specific element on the page.

| Key             | Type     | Description                                                                 |
| :-------------- | :------- | :-------------------------------------------------------------------------- |
| `action`        | `string` | `"scrollTo"`                                                                |
| `options`       | `object` | Contains parameters for the scroll action.                                  |
| `options.target`| `string` | A CSS selector (e.g., `#myElement`, `.my-class`) for the element to scroll to. |
| `options.offset`| `number` | {optional} An offset in pixels from the target element. A positive value scrolls further down, a negative value further up. Defaults to 0. |
| `options.behavior`| `string` | {optional} Defines the transition animation. Can be `auto` or `smooth`. Defaults to `auto`. |

## Example Action Object

```yaml
{
  "action": "scrollTo",
  "options": {
    "target": "#section-3",
    "offset": -50, // Scroll to 50px above the top of #section-3
    "behavior": "smooth"
  }
}
```

This action is useful for navigating the user to a particular part of a long page or after revealing a new section of content. 