# Form Validation Overview

## Validation Types
- Serverside Validation
- state.allowTabChange
- state.tabChangeError

## Client Side Validation
Client side validation is controlled by the `validator` key in all form elements.

```
// Example
{
  "inputType": "text",
  "label": "Last Name",
  "model": "nameLast",
  "required": true,
  "styleClasses": "col-md-3",
  "type": "input",
  "validator": "string"
}
```

**The validator key can be set to the following:**

**number**
Checks that the value is numeric - and that it's within the fields min & max range, if these are defined in the schema.
