# Navigation

You can define the site navigation object in site settings to build menu sections, links, action items, dropdowns, and custom HTML items.

## Navigation Shape

The navigation is defined in the **Appearance > Navigation** tab of your [site settings](./).

It should be an array of section objects. Most apps use one or more sections, each with a `subs` array of menu items.

### Section Keys

| Key | Type | Description |
| --- | --- | --- |
| `sectionLabel` | `string` | Optional heading shown above the section |
| `styleClassesSection` | `string` | CSS classes applied to the wrapping section `<nav>` |
| `styleClasses` | `string` | CSS classes passed to the rendered item list |
| `visible` | `boolean` or function result | Controls whether the section renders |
| `subs` | `array` | Menu items for the section |

## Item Keys

Each object in `subs` can be one of several supported item types.

| Key | Type | Description |
| --- | --- | --- |
| `label` | `string` | Display label for links, action items, and dropdown labels |
| `icon` | `string` | Optional icon classes |
| `styleClasses` | `string` | CSS classes applied to the item |
| `visible` | `boolean` or function result | Controls whether the item renders |
| `path` | `string` | Internal BetterForms route |
| `exact` | `boolean` | Passed to the router link for exact active matching |
| `actions` | `array` or named-action object | Action payload to run when the item is clicked |
| `subs` | `array` | Nested submenu items |
| `html` | `string` | Raw HTML item content |

## How Items Resolve

The runtime supports these common patterns:

- If an item has `actions`, clicking it emits either:
  - `processActions` when `actions` is an action array
  - `processNamedAction` when the value is a named-action object with a `name`
- If an item has `path`, BetterForms renders it as a router link.
- If an item has `subs`, BetterForms renders it as a dropdown container for nested items.
- If an item has `html`, BetterForms renders that HTML directly.

Submenus automatically open when the current route matches a descendant item's `path`.

## Examples

```json
[
  {
    "sectionLabel": "Menu",
    "subs": [
      {
        "label": "Home",
        "icon": "fa fa-home",
        "path": "/dash"
      },
      {
        "label": "Some Form",
        "icon": "fa fa-check-square-o",
        "path": "/form/123-12-312-3123"
      },
      {
        "label": "A Dropdown Menu",
        "icon": "fa fa-car",
        "subs": [
          {
            "icon": "fa fa-car",
            "label": "Some Form",
            "path": "/dash"
          },
          {
            "icon": "fa fa-fw fa-play",
            "label": "Show Alert",
            "actions": [
              {
                "action": "showAlert",
                "options": {
                  "title": "Hello World!",
                  "text": "This item runs an action instead of routing directly.",
                  "type": "success"
                }
              }
            ]
          },
          {
            "icon": "fa fa-fw fa-list-ol",
            "label": "Show Modal",
            "actions": [
              {
                "action": "showModal",
                "options": {
                  "body": "This modal is followed by a route change.",
                  "icon": "success",
                  "options": {},
                  "overlayTheme": "dark",
                  "text": "This is a Modal"
                }
              },
              {
                "action": "path",
                "options": {
                  "path": "/dash"
                }
              }
            ]
          }
        ]
      }
    ]
  }
]
```

## Notes

- Navigation visibility is evaluated from the site/app context, not a page-specific form model.
- If you just need to route somewhere, prefer `path`.
- If you need a menu item to run a workflow first, use `actions` and include a `path` action in that workflow when needed.
- For route/action behavior details, see [path](../actions-processor/actions_overview/path.md) and [Named Actions](../actions-processor/actions_named.md).
