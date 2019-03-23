# Navigation

Most of the navigation in BetterForms is handled is handled with the URL path. By using actions and / or custom navigation menus, you can completely control the users movement.

#### Ways to change user navigation:

* Custom navigation menus
* Actions passed back from hooks
* Actions linked to form objects

## Custom Navigation Menus

You can define a navigation object in the site settings. This allows you to create dropdown drop down menus and their their children.

### Navigtion Item Types and Key Descriptions

| Key | Type | Description |
| ---: | :---: | :--- |
| `navigation` | _array_ | this key contains an array \(usually only one element\) of the menu sections. |
| `sectionLabel` | _string_ | This label describes what the menu section context is. It is not selectable. |
| `label` | _string_ | This label is the text area of each menu item |
| `path` | _string_ | navigational sub path e.g.: /forms/123 Use this to gain direct access to another part of your app. This can also also be accomplished with a path action |
| `subs` | _array_ | This is a dropdown style parent menu that will hold sub menus. BettterForms looks to see a \`subs\` key and if present will consider this the parent. |
| `actions` | _array_ | If a navigation item has a 'actions' key then it is considered an actions type. The actions\[ \] array can contain several actions that are chained together and passed to the actions processor. Typical actions include Modals, Alerts and path navigation. |
| `visible` | _boolean_ | {optional} Controls if item is visible, will accept a `visible_calc` function. Note, the scope of the function is bound to the site and not the specific form.  |
| `html` | _string_ | If key present, then the HTML value is inserted as the navigation menu item |

### Element Type Order

The navigation parser classifies the navigation elements in the following hierarchy:

* `actions` if key present, item treated as action trigger only
* `path` if path key present, item handled as regular router link
* `subs` If key present , item hand as a sub menu
* `html` If key present, item is handled as html

```yaml
// Full Navigation example
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
                  "text": "This is the Alert body, you will take to the dash",
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
                  "body": "This model has a second action, you willl be taken to the /dash",
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

In the same way that `visible_calc` works for fields, you can also apply to individual items or entire sections of the nav menu. Be aware that from the context of the nav menu, you don't have access to the data model of the page, and may need to reference site-global variables as set in the _Environment &gt; App Model_ section of your site settings.

TODO: need examples of `visible_calc, html` and `subs`

