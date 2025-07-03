# validate

Runs the page validation routine.

| Key            | Type       | Description                                             |
| -------------- | ---------- | ------------------------------------------------------- |
| action         | 'validate' | Action name                                             |
| action.options | object     | No supported options at this time                       |
| onFailed       | function   | add `_actions` to run actions when the validation fails |

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

## Running action Scripts when validation fails

Often you want to run actions when a validation fails. The `onFailed` key is perfect for this. Actions in the original script will stop and the `onFailed_actions` script will run. You can use this to do things like pre-save forms, show modals and more.

##

## See Also

Learn more about how to validate fields at this page:

{% content-ref url="../../form-settings/validationoverview/" %}
[validationoverview](../../form-settings/validationoverview/)
{% endcontent-ref %}
