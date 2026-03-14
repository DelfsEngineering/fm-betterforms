# Lifecycle Hooks

Lifecycle hooks are **client-side workflow entry points**, not FileMaker server hooks.

Use them when you want BetterForms to run named actions automatically at specific moments in the browser lifecycle.

For FileMaker developers, the key rule is:

- if BetterForms is calling your FileMaker script, that is a **server hook**
- if BetterForms is automatically running a named action in the browser, that is a **lifecycle hook**

## At A Glance

| Lifecycle Hook | Scope | When it runs |
| --- | --- | --- |
| `onAppLoad` | App-wide | After the app/site loads in the browser |
| `onFormLoad` | Page-specific | After a page/form has loaded in the browser |
| `onBeforeMount` | Component | Before a custom component renders |
| `onMount` | Component | After a custom component renders to the DOM |
| `onUpdated` | Component | After a custom component updates |
| `onBeforeDestroy` | Component | Before a custom component is removed |
| `onDestroyed` | Component | After a custom component is removed |

## onAppLoad

`onAppLoad` is a global named action that runs after the app/site has loaded.

Typical uses:

- initialize app-wide browser-side state
- set up PWA behavior
- load UI libraries or feature flags
- run startup actions after a refresh

Notes:

- This is a client-side workflow, not a FileMaker server call.
- It is typically defined in app-level named actions.
- If needed, an `onAppLoad` workflow can still call the server by including `runUtilityHook`.

## onFormLoad

`onFormLoad` is a page-level named action that runs after a form/page loads.

Typical uses:

- trigger browser-side setup for a page
- consume a token from the URL and run an auth flow
- kick off a page-specific action sequence after load
- run a `runUtilityHook` as part of the load sequence when the page needs server data

Notes:

- If actions are returned from `onFormRequest`, those are queued before `onFormLoad`.
- `onFormLoad` is a very common place to run auth-related actions like `authVerify` or token-based `authLogin`.

## Component Lifecycle Hooks

Custom components support their own lifecycle hooks through component named actions.

### onBeforeMount

Runs before the component renders and is useful for blocking setup work such as:

- loading external libraries
- preparing configuration
- doing work that must finish before the component displays

### onMount

Runs after the component is rendered to the DOM.

Use it for:

- DOM-dependent initialization
- third-party library startup
- attaching behavior to rendered elements

### onUpdated

Runs after component data changes and the component updates.

Use it for:

- syncing a library instance with new data
- updating UI integrations after state changes

### onBeforeDestroy

Runs before the component is removed.

Use it for:

- cleanup work
- stopping listeners
- tearing down library instances

### onDestroyed

Runs after the component is removed.

Use it for any final cleanup that should happen after teardown.

## About onError

You may also see `onError` mentioned in some specialized frontend-tool or integration contexts.

For this docs section, treat it carefully:

- `onError` is **not** documented here as a general app-wide lifecycle hook in the same way as `onAppLoad` or `onFormLoad`
- when a specific feature provides its own `onError` callback or handler, document it with that feature

This avoids mixing generic lifecycle hooks with feature-specific error callbacks.

If your goal is app-level error behavior rather than a lifecycle trigger, see the existing error-handling references:

- [BetterForms Error Pages API](../../apis-and-services/error-pages-api.md) for app-level `errorHandlers` and custom `/error` page behavior
- [function](../actions-processor/actions_overview/function-1.md) for function-action error handling and code `10501`

## Relationship To Server Hooks

Lifecycle hooks do not replace server hooks.

Instead, they often work together:

1. a lifecycle hook starts a browser-side workflow
2. that workflow may call `runUtilityHook`
3. the server hook runs in FileMaker
4. BetterForms resumes the client-side action flow

## Related Pages

- [Script Hooks](./README.md)
- [Common Hooks](./commonoverview.md)
- [Scoped Hooks](./hooks.md)
- [BetterForms Error Pages API](../../apis-and-services/error-pages-api.md)
- [Named Actions (Action Scripts)](../actions-processor/actions_named.md)
- [Creating Components with Third-Party Libraries](../../guides/integrations/creating-components-with-third-party-libraries.md)
