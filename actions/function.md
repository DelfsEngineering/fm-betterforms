# Action: function

Allows interaction with the clipboard

| Key | Description |
| :--- | :--- |
| action | clipboard |
| function | `string` javascript to be run. This JS is converted into a function and executed |

**Note: **
The `function` key can also be used in any other action that originates from the client. This means actions generated in a hook call do not get the function run when arriving at the server.

**Contexts**
`function` code executes with slightly different context to other Java Script in BetterForms.

| To Get |Reference this |
| :--- | :--- |
| this |  |
| window |  |
| formGen | |
| model |  |

```
**Example**
// action  object for 'cllipboard'
[
  {
    "action": "clipboard",
    "function": "debugger; model.showSomething = true;"
    "options": {
    }
  }
]
```

