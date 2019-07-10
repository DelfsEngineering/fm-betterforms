# validate

Runs the page validation routine. 

| Key | Type | Description |
| :--- | :--- | :--- |
| action | 'validate' | Action name |
| action.options | object | No supported options at this time |

**Example**

```yaml
// This Button will validate and the run a hook
// if the validation fails on the page, the UtilityHook will NOT run
{
  "actions": [
    {
      "action": "validate"
    },
    {
      "action": "runUtilityHook",
      "options": {
        "someKey": "myButtonParameter"
      }
    }
  ],
  "buttonClasses": "btn btn-info",
  "label": "",
  "styleClasses": "col-md-2",
  "text": "Save This Form",
  "type": "button"
}
```

## See Also

Learn more about how to validate fields at this page:

{% page-ref page="../../form-settings/validationoverview/" %}

