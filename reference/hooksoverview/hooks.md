---
description: >-
  Scoped hooks are specific to the page on which they are initiated and contain
  relevant data about the page context
---

# Scoped Hooks

### onUtility

By far the most common type of scoped hook! This hook is called with the [**runUtilityHook** action](../actions-processor/actions_overview/runutilityhook.md) like so:

```yaml
{
  "action": "runUtilityHook",
  "options": {
    "type": "save"
  }
}
```

In BetterForms you can differentiate buttons by passing a different value in the `options.type` key. Then, in FileMaker parse out the options object from the $$BF\_Payload and branch the script accordingly.

```javascript
JSONGetElement ( $$BF_Payload ; "data.hookPackage.options.type" )
```

### onFieldValidationHook

This hook is called when a field has been assigned an `fmsHook` validator.

The `.validation` object is broken out for you in the var `$validation` You can make business logic decisions based on the data here. The rest of the other objects are also available including `$actions` so you can inject workflow changes too.

To pass back validation error messages set the `validation.error` element to your error message.

| .validation Object | Type | Description |
| :--- | :--- | :--- |
| validation.value | string | The value of the single field that is requesting validation. |
| validation.field | { object } | This is the formSchema field object, this can be used to identify what field is requesting validation. |
| validation.model | { object } | This is the data model for the object\(s\) requesting validation. This is not needed currently but present for future use. |
| _validation.error_ | { string or array } | This is passed back to the server and the contents are displayed as error messages. |

## Wizard Forms

The following hooks only apply the pages of the "wizard" type. The are called on special cases, but otherwise function just like the [onUtility](hooks.md#onutility) hook type.

### onTabChange

This hook is run if the **Run onTabChange Script Hook** is enabled for a wizard form.

### onComplete

This is run when the user clicks the **Complete** button for a wizard form.

