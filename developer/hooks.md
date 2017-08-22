# Hooks

## Overview

Hooks allow you to intercept various workflow processes right from within Filemaker. This gives you very powerful control over all aspects of the BetterForms workflow.

Some hooks are organized in sets within a folder. **hookSets **are folders of hooks that concern a specific form\(s\).These hooks are passed data by a parent dispatch script.

## Customization

All hooks have data that is passed into and out of them. By mutating this data you can control the user experience.  Each hook script has its own documentation relating to what data $vars are passed in.

Tip: Familiarize yourself with the various object types that could be passed in and out.

### HookSets

Hooksets HookSets are folders of hooks that relate

Adding a HookSet for a new form

1. Duplicate the `default hookSet` folder. This folder of scripts will be used only for your new form.
2. Edit the script `HookSet Dispatch` by adding a new section. Name your hookSet. 
3. In the form editor assign your form's hookSet parameter to your new hookSet name.

## Common Hooks

---

#### onLogin

This hook is called when a user logs in successfully.You can inject actions abd and have full access to the user object .

#### onRegistration

Called when a user registers. You can inject actions and have acces to the user model.

---

#### onCallback

This hook gives the developer access to a universal API endpoint. This can be used for any external callbacks callbacks or as an endpoint serving data.

The hooks is passed header, query and body data  as well as the request type.

## Form Specific Hooks

---

#### onFieldValidationHook {#onfieldvalidationhook}

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

#### 

#### onTabChange

---

#### onComplete



