# function

Run JavaScript in an action.

## Function Action Object

| Key | Description |
| :--- | :--- |
| action | `'function'` |
| function | `string` javascript to be run. This JS is converted into a function and executed |

**Note:** The `function` key can also be used in any other action that originates from the client. This means actions generated in a hook call do not get the function run when arriving at the server.

Javascript is placed on a single JSON value line, you must separate commands with a semicolon. Proper JSON escaping will always need to be applied.

## Async/Await Support

**Effective Version:** 3.2.31+

Function actions now support `async/await` syntax, allowing you to write asynchronous code that pauses the action sequence until completion. This means you can fetch data, wait for timers, or perform any async operation while keeping your action chain in the correct order.

### Basic Async Syntax

```javascript
// Wait 2 seconds before continuing to next action
await new Promise(resolve => setTimeout(resolve, 2000));
model.status = 'Done waiting!';
```

The next action in your chain won't execute until this code completes.


## Uses:

Functions are great for injecting small logic into any work flow.


**Contexts** `function` code executes with slightly different context to other Java Script in BetterForms.

| To Get | Reference This | Description |
| :--- | :--- | :--- |
| window | `window` | The Browser JS window object, good for environmental control |
| formSchema | `formSchema` | Containing other sub objects like ~~model~~ etc |
| model | `model` |  This is the uppermost model object regardless of sub objects like accordions etc. |
| app | `app` | This will access the global `app`  data model |
| action object | `action` | The whole `action` object that contains this function. eg: `action.options.path` Some BetterForms Elements will merge additional options into the`options` key.  |
| params | `params` | Global parameters from store |
| args | `args` | Arguments passed via `action.options.args` |
| EventBus | `EventBus` | Vue EventBus for component communication |

| as of ver 0.7.302 |  |
| :--- | :--- |
| Site app | app \(site app data model\) |

## Examples

### Basic Synchronous Example
```json
{
  "action": "function",
  "function": "formSchema.model.nameFirst = 'Jerome'"
}
```

### Async API Call Example
```javascript
model.status = 'Loading...';

try {
  const response = await fetch('/api/user/123');
  const userData = await response.json();
  
  model.userName = userData.name;
  model.status = 'Loaded';
} catch (error) {
  model.status = 'Error: ' + error.message;
}
```

### Complete Async Workflow Example
```javascript
// Initialize
model.progress = 'Starting...';
model.errors = [];

try {
  // Step 1: Validate input
  model.progress = 'Validating...';
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!model.email || !model.email.includes('@')) {
    model.errors.push('Valid email required');
    return;
  }
  
  // Step 2: Check if user exists
  model.progress = 'Checking user...';
  const checkResponse = await fetch('/api/user/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: model.email })
  });
  const checkData = await checkResponse.json();
  
  if (checkData.exists) {
    model.errors.push('User already exists');
    return;
  }
  
  // Step 3: Create user
  model.progress = 'Creating user...';
  const createResponse = await fetch('/api/user/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: model.email,
      name: model.name
    })
  });
  const userData = await createResponse.json();
  
  // Success!
  model.progress = 'Complete!';
  model.userId = userData.id;
  model.success = true;
  
} catch (error) {
  model.progress = 'Failed';
  model.errors.push(error.message);
  console.error('User creation failed:', error);
}
```

## Best Practices

### ✅ DO
- **Use try/catch** for error handling in async operations
- **Update model properties** to show progress to users
- **Use await** for operations that need to complete before continuing
- **Return early** on validation failures
- **Log errors** for debugging



## Error Handling & Debugging

**Effective Version:** 3.x.x+

When JavaScript inside a `function` action throws an error, BetterForms fires error code **`10501`** with detailed context to help you identify the failing action. The error includes:

| Field | Description |
| :--- | :--- |
| Error code | `10501` |
| Message | `executeFunction error in action "<name>": <original error message>` — where `<name>` is `action.name`, falling back to `action.action`, or `"unnamed"` |
| Info object | A structured object with the fields below |

**Info object fields:**

| Key | Description |
| :--- | :--- |
| `action` | The action type (e.g. `"function"`) |
| `name` | The action name, if set on the action object |
| `functionSnippet` | The first 200 characters of the JavaScript that was being executed |
| `stack` | The full JavaScript stack trace |
| `options` | The action's `options` object (includes `args` and any other keys) |

### Catching Function Errors with Custom Error Handlers

You can add a custom error handler in your site's `app.errorHandlers` array to react to function action errors:

```json
{
  "codes": ["10501"],
  "actions": {
    "action": "showAlert",
    "options": {
      "title": "Script Error",
      "text": "A function action encountered an error. Check the browser console for details.",
      "type": "error"
    }
  }
}
```

The error details (code, message, and info) are automatically injected into the action's `options.error` key, so your custom handler can access `options.error.description.functionSnippet`, `options.error.description.stack`, etc.

### Debugging Tips

- **Name your actions**: Add a `name` key to your function actions so the error message clearly identifies which action failed.
- **Check the browser console**: The full structured info object is logged, including the code snippet and stack trace.
- **Use try/catch inside your function**: For expected failure points, wrap your code in try/catch blocks to handle errors gracefully within the function itself rather than relying on the global error handler.

```json
{
  "action": "function",
  "name": "calculateTotals",
  "function": "model.total = model.items.reduce((sum, item) => sum + item.price, 0);"
}
```

If `model.items` is undefined, the error message will read:
`executeFunction error in action "calculateTotals": Cannot read properties of undefined (reading 'reduce')`

## Code Style

Function results returned with a `return` statement are ignored.

**Contexts** `function` code executes with the context of the currently active form, if you have a modal displayed, then code runs in that modal's context.

