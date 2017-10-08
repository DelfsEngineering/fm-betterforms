# Navigation
Most of the navigation in BetterForms is handled is handled with the URL path. By using actions and / or custom navigation menus,you can completely control the users movement.

## Custom Navigation Menus
You can define a navigation object in the site settings. This allows you to create dropdown drop down menus and thier their children.

### Navigtion Item Types
### path
 


```
// Navigation Object examples

```


```
// Full Navigation example
{
  "layouts": {
    "dash": {
      "headerTitle": "Welcome to BetterForms",
      "headerText": "This is the dashboard. You can configure this area as well as add widgets (coming soon)"
    }
  },
  "navigation": [
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
}
```