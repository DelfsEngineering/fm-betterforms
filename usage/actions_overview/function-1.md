# function

Run JavaScript in an action.

#### Function Action Object

| Key | Description |
| :--- | :--- |
| action | `'function'` |
| function | `string` javascript to be run. This JS is converted into a function and executed |

**Note:**  The `function` key can also be used in any other action that originates from the client. This means actions generated in a hook call do not get the function run when arriving at the server.

Javascript is placed on a sign JSON value line, as sucj you must separate commands with a semicolon. Proper JSON escaping will alwasy need to be applied.

#### Uses:

Functions are great for injecting small logic into any work flow.

* build a custom string and edit the `url` value for a `path` action



**Contexts** `function` code executes with slightly different context to other Java Script in BetterForms.

| To Get | Reference This | Description |
| :--- | :--- | :--- |
| window | `window` | The Browser JS window object, good for enviornmental control |
| formSchema | `formSchema` | Containing other sub objects like ~~model~~ etc |
| model | `formSchema.model` |  This is the uppermost model object regardless of sub objects like accordions etc. |
| action object | `action` | The whole `action` object that contains this function. eg: `action.options.path` Some BetterForms Elements will merge additional options into the`options` key.  |



```text
**Example**
// This will change the nameFirst to Jerome
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

