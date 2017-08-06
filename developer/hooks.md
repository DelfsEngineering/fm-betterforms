# Hooks

## Overview

Hooks allow you to intercept various workflow processes right from within Filemaker. This give you very powerful control over all aspects of BetterForms workflow.

onLogin

onLogout

Some hooks are organized in sets. **hookSets **are folders of hooks that concern a specific form.These hooks are passed data by a parent dispatch script.

## Customization

All hooks have data that is passed into and out of them. By mutating this data you can control the user experience.  Each hook script has its own documentation relating to what data $vars are passed in.

Familiarize yourself with the various object types that could be passed in and out.

#### Adding a HookSet for a new form

1. Duplicate the `default hookSet` folder. This folder of scripts will be used only for your new form.
2. Edit the script `HookSet Dispatch` by adding a new section. Name your hookSet. 
3. In the form editor assign your form's hookSet parameter to your new hookSet name.



---

### onLogin

---

### onCallback

---

### Forms Specific Hooks

All forms functions call the formsService Script and are then passed down to the applicable sub-service.

---

### onFieldValidationHook



###  nonTabChange

---

### onComplete











