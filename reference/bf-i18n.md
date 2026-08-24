---
description: >-
  Set up multi-language apps with app.i18n, BF.i18n(), schema *_calc fields, and
  a language picker. Includes IDE placement, persistence, and limits of the
  runtime helper.
---

# Localization (i18n)

BetterForms i18n is a **dictionary on the App Model** plus a **lookup helper**. There is no separate translation service, plural engine, or ICU formatter.

`BF.i18n(key)` (in `BF.js`) reads `app.i18n.dict[key][langSelected]`, then `app.i18n.dict[key][langDefault]`. An empty or missing `key` returns `''`. If both languages are missing, the helper returns `No default lang value or invalid key`.

Use this page to add languages to an app, wire UI strings, and persist the user’s choice.

## What this is not

| Feature | Supported? |
| --- | --- |
| Dictionary lookup by key + language id | Yes |
| Fallback to `langDefault` | Yes |
| Interpolation (`Hello, {name}`), plurals, nested JSON paths | No. The key is a single `dict` property name, even if it contains dots. |
| `BF_i18n` | No. Some internal notes mention it; `BF.js` only defines `BF.i18n`. |
| Automatic `<html lang>` | No. That is SEO `language` / `language_calc` on the page. See [SEO Meta Tags](form-settings/seo-meta-tags.md). |
| Caching `app.i18n.langSelected` directly | No. App Model Caching watches **top-level** keys only (`app[path]`). Use a sibling key such as `currentLang`. |

## Where it lives in the IDE

1. Open **Site settings → Environment → App Model** (JSON).
2. Look for a top-level `i18n` object. If it is missing, add the example below (do not delete other App Model keys).
3. Global scripts such as `onAppLoad` and `selectLanguage` go in **site-level named actions** (`site.content.namedActions`). See [Named Actions](actions-processor/actions_named.md).

`BF.i18n()` always reads `store.state.site.content.app`. If `app.i18n` is missing, the **browser helper throws** when it reads `langSelected`. SSR / safe-calc stubs return `''` instead. Create the object before calling the helper in page HTML.

## App Model shape

```json
{
  "i18n": {
    "dict": {
      "heading1": {
        "en": "Hello English World",
        "de": "Hallo Deutsche Welt"
      },
      "button1": {
        "en": "Submit",
        "de": "Einreichen"
      }
    },
    "langDefault": "en",
    "langSelected": "en",
    "languages": [
      { "id": "en", "name": "English" },
      { "id": "de", "name": "German" }
    ]
  },
  "currentLang": "en"
}
```

| Key | Role |
| --- | --- |
| `dict` | Map of string keys → `{ "<langId>": "text" }`. |
| `languages` | Picker list. `id` must match keys inside each `dict` entry. |
| `langSelected` | Language used first. Change this to switch UI copy. |
| `langDefault` | Fallback when the selected language has no value for a key. |
| `currentLang` | **Recommended** top-level cache key. Not part of `i18n`. |

`languages` is only for your picker UI. `BF.i18n()` does not read it.

## Add i18n to pages (practical workflow)

Work **one page at a time**. Keep existing App Model data; only add keys.

1. Confirm `app.i18n` exists (previous section).
2. Decide which languages you need (`en`, `de`, …). Add them to `languages` and to each `dict` entry.
3. Open a page. In HTML and in the page JSON schema, list every user-visible string you want translated (headings, buttons, `label`, help text, empty states).
4. Replace those strings with `BF.i18n('yourKey')` (next section).
5. Add the same keys under `app.i18n.dict` with a value per language. Prefer a value for **every** listed language plus `langDefault`.
6. Repeat for each page, then for [slots](site-settings/slots-code-injection.md) and [navigation](site-settings/navigationoverview.md) HTML that shows copy.
7. Add a language picker (below) and persist `currentLang`.

Schema calculations: any `*_calc` field is compiled as an expression (`bfUtils.js`). For field labels use:

```json
{
  "label_calc": "BF.i18n('firstName')"
}
```

Static `"label": "First name"` does **not** go through `BF.i18n` unless you change it to `label_calc`.

## Use `BF.i18n()` in HTML

```html
<h1>{{ BF.i18n('heading1') }}</h1>
<button>{{ BF.i18n('button1') }}</button>
```

The HTML renderer exposes `BF` on the template, so `BF.i18n('heading1')` is the call that matches `BF.js`.

Changing `app.i18n.langSelected` re-runs lookups on the next Vue render. Templates that call `BF.i18n()` during render typically update immediately. A string you copied into a plain variable will not.

## Restore language on app load

App Model Caching (`site.content.appCaching`) watches `app[path]` — a **top-level** property. Cache `currentLang`, not `i18n.langSelected`.

In **Site settings → App Model**, enable caching for `currentLang` (localStorage to keep the choice across visits). See [App Model](site-settings/app-model.md#app-model-caching-bf-v0104).

In the global `onAppLoad` named action:

```javascript
if (app.currentLang) {
  app.i18n.langSelected = app.currentLang
}
```

`onAppLoad` runs after the site loads in the browser. It can be skipped with `?_onAppLoad=0`.

## Language picker

Global named action `selectLanguage` (function action):

```javascript
app.i18n.langSelected = action.options.lang
app.currentLang = action.options.lang
```

HTML (site named actions are callable from any page):

```html
<div
  v-for="lang in app.i18n.languages"
  :key="lang.id"
  @click="namedAction('selectLanguage', { lang: lang.id })"
  :class="[
    'block px-4 py-2 text-sm cursor-pointer',
    app.i18n.langSelected === lang.id ? 'bg-purple-700 text-white' : 'hover:bg-purple-400'
  ]"
>
  {{ lang.name }}
</div>
```

Or a select (still write the cache key so App Model Caching persists it):

```html
<select
  v-model="app.i18n.langSelected"
  @change="app.currentLang = app.i18n.langSelected"
>
  <option
    v-for="language in app.i18n.languages"
    :key="language.id"
    :value="language.id"
  >
    {{ language.name }}
  </option>
</select>
```

Optional: keep `<html lang>` in sync with the same code via page `language_calc` (SEO), for example `"app.i18n.langSelected || 'en'"`. That attribute is independent of `BF.i18n()`.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Red error / `Cannot read property 'langSelected'` | `app.i18n` is missing in the App Model. |
| `No default lang value or invalid key` | Key missing, or no string for `langSelected` **and** `langDefault`. |
| SSR HTML blank, browser shows the fallback string | Empty `key`, or SSR stub returned `''` because `app.i18n.dict` was missing at render. |
| Picker does nothing | `selectLanguage` is not a **site** named action, or `options.lang` does not match a `dict` language id. |
| Choice lost on refresh | `currentLang` is not in App Model Caching, or you cached a nested path (not supported). |
| Label still English | Field still uses static `label` instead of `label_calc`. |

## See also

- [Klai Utility Functions](bf-utility-function-ver-0.9.20+.md) — `BF.i18n(key)` row
- [App Model](site-settings/app-model.md) — caching and `app.*`
- [Named Actions](actions-processor/actions_named.md) — `onAppLoad`, `namedAction`
- [SEO Meta Tags](form-settings/seo-meta-tags.md) — `<html lang>`
