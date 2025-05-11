# consoleError

The `consoleError` action logs a custom message to the browser's error console. This can be useful for debugging application logic or signaling specific error conditions during development.

| Key             | Type     | Description                           |
| :-------------- | :------- | :------------------------------------ |
| `action`        | `string` | `"consoleError"`                      |
| `options.message` | `string` | The message to log to the error console. |

## Example Action Object

```yaml
{
  "action": "consoleError",
  "options": {
    "message": "An unexpected condition occurred in my custom logic."
  }
}
```

This action is primarily intended for development and debugging purposes. 