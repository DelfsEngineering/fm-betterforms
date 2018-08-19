# Hooks

## Common Hooks

### onLogin

This hook is called when a user logs in successfully.You can inject actions abd and have full access to the user object .

### onRegistration

Called when a user registers. You can inject actions and have acces to the user model.

## Form Specific Hooks

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
|  |  |  |

### onTabChange

### onComplete

