---
description: >-
  Custom components are reusable UI blocks. Define them once, then drop them
  into pages as a `bfcomponent` field or a `<bfcomp>` tag.
---

# Custom Components

A custom component is a named definition stored on the site (`content.components` or the site-level `components` list). Each definition has a `name` used for lookup and a `comp` object with the actual UI (`html` and/or `fields`), plus optional `namedActions`.

The runtime lives in `bfcomponent.vue`. If `comp.html` is set, BetterForms renders that HTML. Otherwise it renders `comp.fields` through vue-form-generator.

{% hint style="info" %}
Alpha Features must be on to see the **Component** tab in the Klai editor. See [Components Editor](../../../guides/styling/custom-components/components-editor.md).
{% hint %}

## Component API (`comp`)

Both JSON schema and HTML use the same definition. Extra keys on the instance are merged onto `comp` and are available in templates as `schema.<key>` (for example `schema.title`).

| Key | Type | Description |
| --- | --- | --- |
| `html` | string | Vue template for the component. If this is set, BetterForms uses the HTML renderer. |
| `fields` | array | vue-form-generator fields. Used when `html` is empty. An instance can override this with its own `fields`. |
| `namedActions` | object | Lifecycle hooks and component actions. Keys listed below. |
| `divWrapper` | boolean | If `true`, wraps `html` in `<div class="bfcomp-wrapper" style="width: 100%;">`. Default `false`. The root element also has class `bf-comp`. |
| `modelDev` | object | Fallback model when the instance does not pass a model (used by the component editor preview). |

### Instance keys (schema field or `<bfcomp>` attributes)

| Key | Type | Description |
| --- | --- | --- |
| `name` | string | Component name to look up. Required unless you pass `source`. |
| `type` | string | In page schema, must be `"bfcomponent"`. |
| `source` | object | Inline component definition. Skips the name lookup (used by the editor preview). |
| `fields` | array | Replaces `comp.fields` for this instance. |
| `modelSource` | object | HTML attribute on `<bfcomp>` only. Replaces the page model for this instance. JSON schema fields use the surrounding field `model`; `schema.modelSource` is not read. |
| *(any other key)* | various | Merged into the schema passed to the template/actions (`schema.buttonLabel`, and so on). |

Lookup order for the definition: `source` on the instance, then `store.getters.components(name)` which searches `site.content.components` then `site.components` by `name`. If nothing matches, BetterForms shows a red “Component not found” placeholder.

## Use as a JSON schema field

```json
{
  "name": "MyComponent",
  "styleClasses": "",
  "type": "bfcomponent"
}
```

Pass instance props the same way as other fields. They merge over `comp` and show up as `schema.*` in HTML and in lifecycle function actions:

```json
{
  "name": "MyComponent",
  "type": "bfcomponent",
  "title": "Accounts",
  "buttonLabel": "Save"
}
```

## Use as an HTML Vue tag

`<bfcomp>` is a global alias of the same runtime component (`app.vue` registers it).

```html
<bfcomp name="MyComponent"></bfcomp>
```

Optional attributes:

```html
<bfcomp name="MyComponent" :modelSource="model"></bfcomp>
```

## Context

Inside component HTML, `model` and `app` behave like other BetterForms HTML fields. The merged instance schema is the `schema` prop, so templates can use `schema.title`, `BF.i18n('someKey')`, and `namedAction('myAction', { ... })`.

`namedAction` from a template is resolved by the page: `form.namedActions[name]` first, then site-level named actions, then a scan of component `namedActions` / `comp.namedActions`. Prefix component action names (for example `chart_refresh`) so they do not collide with page actions.

## Lifecycle `namedActions`

Define these on `comp.namedActions` (the wrapper object is also checked). `onBeforeMount` **blocks first render**. After it finishes (success or error), the template renders, then `onMount` runs. Each hook fires once per instance except `onUpdated`, which can fire again on later Vue updates.

| Key | Alias | When it runs |
| --- | --- | --- |
| `onBeforeMount` | `beforeMount` | Before first render. Await library loads and data fetches here. |
| `onMount` | `mount` (not `mounted`) | After first render (`$nextTick`), so DOM nodes exist. |
| `onUpdated` | `updated` | After Vue `updated`. |
| `onBeforeDestroy` | `beforeDestroy` | Vue `beforeDestroy`. |
| `onDestroyed` | `destroyed` | Vue `destroyed`. |

```json
{
  "html": "<div id=\"chartRoot\"></div>",
  "namedActions": {
    "onBeforeMount": [
      {
        "action": "function",
        "function": "await BF.libraryLoadOnce('https://cdn.jsdelivr.net/npm/chart.js');"
      }
    ],
    "onMount": [
      {
        "action": "function",
        "function": "const el = document.getElementById('chartRoot');\n/* initialize library */"
      }
    ],
    "onBeforeDestroy": [
      {
        "action": "function",
        "function": "/* destroy library instance */"
      }
    ]
  }
}
```

Lifecycle function actions receive the merged component schema as `schema` and as `action.options._componentSchema`. `this.$refs` is not available in those functions; use `document.getElementById` / `querySelector`.

Load CDNs with `BF.libraryLoadOnce(url, options)` (v3.2.31+). See [Dynamic Library Loading](../../bf-dynamic-library-loading.md).

Call a component action from HTML:

```html
<button @click="namedAction('comp_save', { source: 'cta' })">Save</button>
```

## See also

- [Components Editor](../../../guides/styling/custom-components/components-editor.md)
- [Component Best Practices](../../../guides/styling/custom-components/component-best-practices.md)
- [Creating Components with Third-Party Libraries](../../../guides/integrations/creating-components-with-third-party-libraries.md)
