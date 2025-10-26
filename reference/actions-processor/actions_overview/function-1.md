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



## Code Style

Function results returned with a `return` statement are ignored.

**Contexts** `function` code executes with the context of the currently active form, if you have a modal displayed, then code runs in that modal's context.

