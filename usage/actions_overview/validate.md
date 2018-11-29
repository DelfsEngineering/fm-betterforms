# validate

Runs the page validation routine. 

To remove a cookie simply set the  `daysOrOptions` value to `0`

\`\`

| Key | Type | Description |
| :--- | :--- | :--- |
| action | 'validate' | Action name |
| action.options | object | No supported options at this time |

**Example**

```text
// This Button will validate and the run a hook
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

**Custom Function** There is no CF avail at this time.

