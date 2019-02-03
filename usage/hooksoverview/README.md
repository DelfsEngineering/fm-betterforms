# Script Hooks

## Overview

Hooks allow you to intercept various workflow processes right from within Filemaker. This gives you very powerful control over all aspects of the BetterForms workflow.

Hooks are organized in sets within a folder. **hookSets** are folders of hooks that concern a specific form\(s\).These hooks are passed data by a parent dispatch script.

All hooks have data that is passed into and out of them. By mutating this data you can control the user experience. Most hooks surface the same `$$BF_... vars`    but some hooks have additional vars.

![Script Hook life cycle](../../.gitbook/assets/productionflo-system%20%281%29.png)

### HookSets

Hooksets HookSets are folders of hooks that relate to the same use case. 

HookSets are broken down into two types: `CommonHookSets` and `ScopedHookSets`

### CommonHookSets

These hooks relate to call that are site wide and not page / form specific.

### ScopedHookSets

These hooks are associated with a specific page or pages. A form is bound to a specific hookset but a hookset is not bound to a specific page.. Meaning, the same one could be used for simular forms.

### Adding a HookSet to a new form

When you create a new form, you will probably need to also install a hookset to handle that forms business logic.

1. Duplicate the `default hookSet` folder. This folder of scripts will be used only for your new form.
2. Edit the script `HookSet Dispatch` by adding a new section. Name your hookSet.
3. In the form editor assign your form's hookSet parameter to your new hookSet name.

