# validate

Runs the current page validation routine.

## Action Object

| Key | Type | Description |
| --- | --- | --- |
| `action` | `string` | Must be `"validate"` |
| `options` | `object` | No supported options at this time |
| `onFailed` | `function` | Optional callback that runs if validation fails |

## Example

```json
{
  "actions": [
    {
      "action": "validate"
    },
    {
      "action": "runUtilityHook",
      "options": {
        "type": "save"
      }
    }
  ],
  "text": "Save This Form",
  "type": "button"
}
```

## Behavior Notes

- BetterForms emits the page validation event and waits for the form validation result.
- If validation succeeds, the action queue continues to the next action.
- If validation fails, BetterForms clears the pending action queue for that action run.
- If `onFailed` is supplied as a function, BetterForms calls it after validation fails.
- `validate` does not define any runtime `options` keys in the current implementation.

## Related Pages

- [Validation Overview](../../form-settings/validationoverview/)
- [runUtilityHook](./runutilityhook.md)
