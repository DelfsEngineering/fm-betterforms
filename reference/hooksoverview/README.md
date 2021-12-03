# Script Hooks

## Overview

Hooks allow you to intercept various workflow processes right from within FileMaker. This gives you very powerful control over all aspects of the BetterForms workflow.

Hooks are organized in sets within a folder. **hookSets** are folders of hooks that concern a specific form(s).These hooks are passed data by a parent dispatch script.

All hooks have data that is passed into and out of them. By mutating this data you can control the user experience. Most hooks surface the same `$$BF_...` vars    but some hooks have additional vars.

All hooks have a maximum time of 20 Seconds before they error. Make sure to get all server side processing performed well within this time.

![Script Hook life cycle](<../../.gitbook/assets/ProductionFlo System  (3).png>)

HookSets are broken down into two types: `CommonHookSets` and `ScopedHookSets`

### CommonHookSets

These hooks relate to operations that are site wide and not page / form specific. Eg. When a user logs into the application the onLogin hook is called.&#x20;

BetterForms allows for multiple common hook sets. This allows you to create multiple front end app's for a common back end database. An example would be a customer pointing front end portal and a separate staff portal that would have different functionality. The use of a separate common hook set allows different scripts to handle things like user registration and authorization.&#x20;

### ScopedHookSets

These hooks are associated with a specific page or pages. A form is bound to a specific hook set but a hook set is not bound to a specific form. Meaning, the same script handlers could be used for similar forms.

When naming common Hook Sets use a simple name that describes the entire application they control. \
Eg: `custoer` for customer application, `staff` for staff portal.

### Adding a Scoped HookSet folder for a new form

When you create a new form, you will probably need to also install a hook set to handle that form's business logic.

1. From the helper file integration tab, select 'Create New scoped hook set' and enter a name for the hook set. These scoped hook set names should be short and clearly describe what the form they are bound to does. \
   EG: `invoiceList` , `invoiceDetail`  , `dashboard`\

2. Paste this set of scripts and their folder into the BetterForms Folder under with your other scoped hooks.
3. (V16 FMS) If you are using \<V17 FMS then you will also need to add a script set in the dispatch script to include your new scoped hook set. V17+ does this automatically and is not required.

