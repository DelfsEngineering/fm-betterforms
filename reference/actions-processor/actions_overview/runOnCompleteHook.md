# runOnCompleteHook

The `runOnCompleteHook` action explicitly triggers the `onComplete` script hook. This is useful when you need to execute the `onComplete` hook's logic at a specific point in an action sequence, rather than relying on its automatic execution at the end of a standard hook lifecycle.

| Key      | Type     | Description                                       |
| :------- | :------- | :------------------------------------------------ |
| `action` | `string` | `"runOnCompleteHook"`                             |
| `options`| `object` | {optional} Any options or data to pass to the `onComplete` hook. This will be available in the `$$BF_ActionOptions` variable within the `onComplete` hook script. |

## Example Action Object

```yaml
{
  "action": "runOnCompleteHook",
  "options": {
    "customData": "This data will be available in the onComplete hook.",
    "anotherValue": 123
  }
}
```

When this action is executed, the `onComplete` script hook for the current context (e.g., page) will be triggered. The content of the `options` object from the action will be passed to the hook and can be accessed via the `$$BF_ActionOptions` JSON object in your FileMaker script.

For more general information about the `onComplete` hook and other script hooks, please refer to the [Script Hooks documentation](../../hooksoverview/README.md). 