# function

Run JavaScript in an action.

## Function Action Object

| Key | Description |
| :--- | :--- |
| action | `'function'` |
| function | `string` javascript to be run. This JS is converted into a function and executed |

**Note:** The `function` key can also be used in any other action that originates from the client. This means actions generated in a hook call do not get the function run when arriving at the server.

Javascript is placed on a single JSON value line, you must separate commands with a semicolon. Proper JSON escaping will always need to be applied.

## Uses:

Functions are great for injecting small logic into any work flow.

* build a custom string and edit the `url` value for a `path` action

**Contexts** `function` code executes with slightly different context to other Java Script in BetterForms.

| To Get | Reference This | Description |
| :--- | :--- | :--- |
| window | `window` | The Browser JS window object, good for environmental control |
| formSchema | `formSchema` | Containing other sub objects like ~~model~~ etc |
| model | `model` |  This is the uppermost model object regardless of sub objects like accordions etc. |
| app | `app` | This will access the global `app`  data model |
| action object | `action` | The whole `action` object that contains this function. eg: `action.options.path` Some BetterForms Elements will merge additional options into the`options` key.  |

| as of ver 0.7.302 |  |
| :--- | :--- |
| Site app | app \(site app data model\) |

```text
**Example**
// This will change the nameFirst value to Jerome
[
  {
    "action": "function",
    "function": "debugger; formSchema.model.nameFirst = 'Jerome' "
    "options": {
      // ... additional params etc you may want.
    }
  }
]
```

Code Style

Function results returned with a `return` statement are ignored.

**Contexts** `function` code executes with the context of the currently active form, if you have a modal displayed, then code runs in that modal's context.

