# Data Model

The **Data Model** tab contains all data that can be seen by the current page in JSON format.

## Default vs Development Data

The **Production data** field is the JSON object that loads into the page model when the page first renders. This is the baseline model used for normal runtime behavior and server hooks such as `onFormRequest`.

**Development data** is IDE-only. BetterForms merges it into the production data while previewing or working in editor tools such as the HTML editor.

This lets you work with realistic sample data in the editor without changing the page's real default runtime model.

## What The Page Model Is Used For

The page model is the browser-side state for the current page.

It is commonly used for:

- field binding through `model` paths
- HTML / Vue template rendering
- page-level named actions and client workflows
- scoped and utility hook payloads

## Utility Hook Payloads

When `runUtilityHook` sends data to FileMaker, BetterForms can reduce or reshape the outgoing payload.

See:

{% content-ref url="../hooksoverview/env_vars.md" %}
[env_vars.md](../hooksoverview/env_vars.md)
{% endcontent-ref %}

That page covers:

- reduced payload mode when full schema sending is off
- `modelFilterKeys`
- `options.model`
- merge vs replace behavior for returned `result.model`

## Key Caching

Page-model keys can be cached individually through `modelCaches`.

Each cache entry is configured per model key path and can enable:

- `localStorage`
- `sessionStorage`
- `appSync`

At load time, BetterForms checks session storage first, then local storage for configured keys, and applies any stored values back into the page model.

As values change, BetterForms writes them back to the configured browser storage automatically.

## Sync With App

If a model-cache entry enables `appSync`, BetterForms keeps that page-model key aligned with the app model key of the same path.

This is useful when a value should behave like page state in some places but still remain available app-wide.

For broader app-level behavior, see:

- [App Model](../site-settings/app-model.md)

## Merge Behavior After Utility Hooks

When FileMaker returns `result.model` from a utility hook, BetterForms now defaults to **merge** behavior unless the response explicitly sets `state.modelUpdateMode = "replace"`.

That means:

- returned keys update the current page model
- client-only reactive keys can be preserved
- explicit `null`, empty strings, or empty arrays from FileMaker still clear values when returned

If a key is configured with `appSync` and the same key is returned in both the page model and app model, the app-model value wins for the final synced value.
