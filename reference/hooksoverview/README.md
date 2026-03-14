# Script Hooks

## Overview

For FileMaker developers, BetterForms uses the word "hook" for two related but different ideas:

- **Server hooks**: FileMaker/server calls that BetterForms dispatches into your hook scripts
- **Lifecycle hooks**: client-side workflow entry points such as `onAppLoad`, `onFormLoad`, and component lifecycle actions

This section now documents those separately so server-side FileMaker hooks are not confused with browser-side workflow triggers.

## Server Hooks

Server hooks let you intercept BetterForms workflow processes from FileMaker.

- These hooks are organized into hook sets in your FileMaker integration.
- They receive data from BetterForms and can return updated data or actions.
- Most of them surface the usual `$$BF_...` variables.
- Server hooks have a maximum time of 20 seconds before BetterForms treats them as failed.

Server hooks are split into two groups:

- **Common hook sets** for app-wide server logic such as authentication, notifications, or API callbacks
- **Scoped hook sets** for page-specific server logic such as `onUtility`, wizard completion, or validation

See:

- [Common Hooks](./commonoverview.md)
- [Scoped Hooks](./hooks.md)

## Lifecycle Hooks

Lifecycle hooks are **not** FileMaker server calls.

They are client-side named-action entry points that BetterForms runs at specific moments in the browser, for example:

- `onAppLoad`
- `onFormLoad`
- component lifecycle hooks such as `onBeforeMount` and `onMount`

Use these when you want browser-side workflows to run automatically at the right moment.

See:

- [Lifecycle Hooks](./lifecycle-hooks.md)

## Hook Set Naming

When naming common hook sets, use a short name that describes the application they control.

Examples:

- `customer`
- `staff`
- `portal`

When naming scoped hook sets, use a short name that describes the page or form workflow.

Examples:

- `invoiceList`
- `invoiceDetail`
- `dashboard`

## Adding a Scoped Hook Set

When you create a new form, you will often need to install a scoped hook set to handle that form's server-side business logic.

1. From the helper-file integration tab, create a new scoped hook set.
2. Use a short descriptive name for the form workflow it handles.
3. Paste the hook scripts and their folder into your BetterForms hook area.
4. If you are using older FileMaker Server versions, you may also need to update the dispatch script manually. Newer setups handle this automatically.
