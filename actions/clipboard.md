# Action: clipboard

Allows interaction with the clipboard

| Key | Description |
| :--- | :--- |
| action | clipboard |
| options.set | `string` that you want to be placed on the clipboard |

```
// action  object for 'cllipboard'
[
  {
    "action": "clipboard",
    "options": {
      "set": "This is some sample copy I want to copy."
    }
  }
]
```

# Action: setFocus [\#setFocus](#setFocus) {#setfocus}

Allows pragmatic element focusing \(set cursor to a field\)

| Key | Description |
| :--- | :--- |
| action | setFocus |
| elementId | TheDOM  element that you want the focus to direct to. |

```
// action  object for 'cllipboard'
[
  {
    "action": "setFocus",
    "options": {
      "elementId": "name-first"
    }
  }
]
```

The `elementId` can be found by searching the HTML source  code in the browser with an inspector tool. If you are setting focus to a BetterForms Element, the id is often set to the same as the `label`  text but with lower case and hyphens for spaces.

