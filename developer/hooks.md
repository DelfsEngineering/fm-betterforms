# Hooks

## Overview

Hooks allow you to intercept various workflow processes right from within Filemaker. This gives you very powerful control over all aspects of the BetterForms workflow.

Some hooks are organized in sets within a folder. **hookSets **are folders of hooks that concern a specific form\(s\).These hooks are passed data by a parent dispatch script.

## Customization

All hooks have data that is passed into and out of them. By mutating this data you can control the user experience.  Each hook script has its own documentation relating to what data $vars are passed in.

Tip: Familiarize yourself with the various object types that could be passed in and out.

#### Adding a HookSet for a new form

1. Duplicate the `default hookSet` folder. This folder of scripts will be used only for your new form.
2. Edit the script `HookSet Dispatch` by adding a new section. Name your hookSet. 
3. In the form editor assign your form's hookSet parameter to your new hookSet name.

## General Hooks

---

#### onLogin

---

#### onCallback

## Form Specific Hooks

---

#### onFieldValidationHook

This hook is called when a field has been assigned an `fmsHook` validator.

  payload.validation= {

                    value : value,

                    field : field,

                    model : model

                }



| .validation Object | Type | Description |
| :--- | :--- | :--- |
| validation.value | string | The value of the single field that is requesting validation. |
| validation.field | { object } | This is the formSchema field object, this can be used to identify what field is requesting validation.  |
| validation.model | { object } | This is the data model for the object\(s\) requesting validation. This is not needed currently but present for future use. |
|  |  |  |
|  |  |  |

#### 

#### onTabChange

---

#### onComplete



