# function

Allows interaction with the clipboard

| Key | Description |
| :--- | :--- |
| function | `string` javascript to be run. This JS is converted into a function and executed |

**Note:**  The `function` key can also be used in any other action that originates from the client. This means actions generated in a hook call do not get the function run when arriving at the server.

**Contexts** `function` code executes with slightly different context to other Java Script in BetterForms.

| To Get | Reference this |
| :--- | :--- |
| window | `window.` |
| formSchema | `formSchema` |
| model | `formSchema.model` |

```text
**Example**
// This will hcange the nameFirst to Jerome
[
  {
    "action": "function",
    "function": "debugger; formSchema.model.nameFirst = 'Jerome' "
    "options": {
    }
  }
]
```

