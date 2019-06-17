# setFocus

Allows element focusing \(set cursor to a field\). The contents of the field can also be selected.

| Key |  | Description |
| :--- | :--- | :--- |
| action | string | setFocus |
| elementId | string | The DOM element that you want the focus to direct to. |
| select | boolean | Field contents are selected when true |

## Example action object

```yaml
// action object for 'setFocus'
[
  {
    "action": "setFocus",
    "options": {
        "elementId": "name-first",
        "select": true
    }
  }
]
```

The `elementId` can be found by searching the HTML source code in the browser with an inspector tool. If you are setting focus to a BetterForms Element, the id is often set to the same as the `label` text but with lower case and hyphens for spaces.

Note:

The form must be rendered prior to this action being called. You may have to use a `wait` action to give the form a chance to render.

