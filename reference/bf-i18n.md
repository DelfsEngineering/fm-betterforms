---
description: >-
  Set up multi-language apps with BF.i18n(), an app-model dictionary, and a
  language picker.
---

# Localization (i18n)

Use `BF.i18n(key)` to display translated strings from the app model's `i18n` dictionary. `i18n` is short for internationalization.

`BF.i18n(key)` looks up `app.i18n.dict[key][langSelected]`, then falls back to `app.i18n.dict[key][langDefault]`. If the key is empty it returns an empty string. If neither language has a value, the client helper returns `No default lang value or invalid key`.

## Step 1: Define languages in the App Model

In the App Model, add an `i18n` object with a dictionary, language list, and selected/default locale:

```json
{
  "i18n": {
    "dict": {
      "buttonExplore": {
        "en": "Explore Features",
        "zh": "探索功能"
      },
      "buttonJoin": {
        "en": "Join Community",
        "zh": "加入社区"
      }
    },
    "langDefault": "en",
    "langSelected": "en",
    "languages": [
      {
        "id": "en",
        "name": "English"
      },
      {
        "id": "zh",
        "name": "简体中文"
      }
    ]
  }
}
```

| Key | Purpose |
| --- | --- |
| `langDefault` | Fallback language when the selected language has no translation for a key |
| `langSelected` | Active language. Change this from UI or from `onAppLoad` |
| `dict` | Translation strings, keyed first by your label id, then by language id |
| `languages` | List of available languages for a picker (`id` + `name`) |

To remember the user's choice across reloads, store it on the app model (for example `currentLang`) and enable caching for that key in the IDE:

```json
{
  "currentLang": "en"
}
```

`currentLang` is a recommended custom app-model key. It is not part of the built-in `i18n` object.

## Step 2: Add translatable text in HTML and calculations

Use `BF.i18n()` in HTML and in schema calculations such as `label_calc`.

```html
<button>{{ BF.i18n('buttonExplore') }}</button>
<button>{{ BF.i18n('buttonJoin') }}</button>
```

```json
{
  "label_calc": "BF.i18n('someKey')"
}
```

## Step 3: Restore the language on app load

In the global `onAppLoad` named action, copy the cached value into `langSelected`:

```javascript
app.i18n.langSelected = app.currentLang
```

## Step 4: Let the user change language

In a global named action such as `selectLanguage`, update both the active locale and the cached value:

```javascript
app.i18n.langSelected = action.options.lang
app.currentLang = action.options.lang
```

In page HTML, call that named action and highlight the current selection:

```html
<div
  v-for="lang in app.i18n.languages"
  :key="lang.id"
  @click="namedAction('selectLanguage', { lang: lang.id })"
  :class="[
    'block px-4 py-2 text-sm leading-5 focus:outline-none cursor-pointer',
    app.currentLang === lang.id ? 'bg-purple-700 text-white' : 'text-white hover:bg-purple-400 hover:text-gray-900'
  ]"
>
  {{ lang.name }}
</div>
```

Or bind a select directly to `langSelected` and keep the cache in sync:

```html
<select
  v-model="app.i18n.langSelected"
  @change="app.currentLang = app.i18n.langSelected"
  class="border p-2"
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

This setup lets the app show content in the user's preferred language.
