# Misc Page Settings

This page covers the page-level form keys that affect layout, shell behavior, routing, and wizard behavior.

## Core Page Keys

The runtime reads these keys from `form`.

| Key | Purpose |
| --- | --- |
| `formType` | Selects which page renderer BetterForms mounts |
| `styleClassesPage` | CSS classes applied to the outer page wrapper |
| `styleClassesBody` | CSS classes applied to the page body / form body |
| `hideHeader` | Hides the page header block that normally renders `form.title` and `form.text` |
| `isForm` | Renders the page body as an actual HTML `<form>` instead of a `<div>` |
| `requestHook` | Affects form-fetch behavior and disables the local cached-form shortcut |
| `authLevel` | Affects whether an authenticated form can be served from cache while online |

## `formType`

The current runtime supports these page renderers:

- `formblank`
- `formwidget`
- `formwizard`
- `formplain`

`formblank` is the default single-page renderer.

`formwizard` mounts the wizard layout and enables wizard-specific keys such as button labels, transitions, and tab validation behavior.

`formplain` is still present in the runtime as a legacy renderer.

## `isForm`

If `form.isForm` is true, BetterForms renders the page body as a real HTML `<form>`.

This is most useful for flows like [Custom Login Pages](../authentication/custom-login-pages.md), where pressing **Enter** should submit the page-level form naturally.

In practice, pair `isForm` with a [button](../components-overview/common/button.md) that is configured to submit in the same form context.

## Header And Page Styling

- `styleClassesPage` controls classes on the outer page wrapper.
- `styleClassesBody` controls classes on the page body area used by the mounted form renderer.
- `hideHeader` removes the default page header block that would otherwise show the page title/text for non-blank form types.

## Fetch / Cache Related Keys

Two page keys influence how BetterForms fetches and reuses page definitions:

- `requestHook`: if true, BetterForms does not reuse the cached form definition shortcut for that page
- `authLevel`: when `authLevel === 1`, BetterForms requires authentication before reusing that cached page while online

These keys matter most for pages that rely on dynamic server-side page setup or authentication-gated access.

## Wizard Keys

When `formType` is `formwizard`, the runtime reads these additional keys from `form`:

| Key | Purpose |
| --- | --- |
| `title` / `subtitle` | Standard wizard header text passed to the wizard component |
| `wizardTitle` | Custom slot title rendered above the tabs |
| `color` / `errorColor` | Wizard accent and error colors |
| `shape` | Wizard step shape |
| `stepSize` | Wizard step sizing |
| `validateOnBack` | Controls validation when moving backward |
| `nextButtonText` | Next button label |
| `backButtonText` | Back button label |
| `finishButtonText` | Finish button label |
| `transition` | Transition name passed to the wizard |
| `wizardEnableAllTabs` | Marks all tabs as available on mount |
| `wizardAllowInvalidTabChange` | Allows tab changes even when the current tab is invalid |
| `state.startIndex` | Starting tab index when loading the wizard |

## Related Pages

- [Form Types](../form-types.md)
- [Custom Login Pages](../authentication/custom-login-pages.md)
- [Button](../components-overview/common/button.md)
