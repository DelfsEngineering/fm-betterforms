# Navigation

Most of the navigation in BetterForms is handled is handled with the URL path. By using actions and / or custom navigation menus,you can completely control the users movement.

Ways to change user navigation:

* Custom navigation menus
* Actions passed back from hooks
* Actions linked to form objects

## Custom Navigation Menus

You can define a navigation object in the site settings. This allows you to create dropdown drop down menus and thier their children.

### Navigtion Item Types and Key Descriptions

| Type | Description |
| :--- | :--- |
| navigation | this key contains an array \(usually only one element\) of the menu sections. |
| sectionLabel | This label describes what the menu section context is. It is not selectable. |
| label | This label is the text area of each menu item |
| path | navigational sub path e.g.: /forms/123 Use this to gain direct access to another part of your app. This can also also be accomplished with a path action |
| parent menu | This is a dropdown style parent menu that will hold sub menus. BettterForms looks to see a \`subs\` key and if present will consider this the parent. |
| actions | If a navigation item has a 'actions' key then it is considered an actions type. The actions\[ \] array can contain several actions that are chained together and passed to the actions processor. Typical actions include Modals, Alerts and path navigation. |
| visible | {optional} Controls if item is visible, will accept a `visible_calc` function. Note, the scope of the function is bound to the site and not the specific form.  |

TODO: need examples of `visible_calc`

```text
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

