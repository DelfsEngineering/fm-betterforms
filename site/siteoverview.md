# Site Model
The site model is the JSON object that controls the top level of the app (web site) function and look. This model contains things like navigation, authentication methods and `CSS` code.

##Content
The `content` key within the site object contains data related to the site look and feel mainly. 

#### Slots (`content.slots`)
Slots are definable HTML templates that can be inserted into various areas of BetterForms. Slots can be used for customizing the header area, navigation and footer areas (footer not developed yet).
Slots can accept HTML and VueJs HTML.

Slot scope for VueJS HTML will depend on the slot location.

Slot locations:
    * headerLeft
    * headerMiddle
    * headerRight

```
// content.slots
    "slots": [{
        "html": "<h1>This is a slot!</h1>",
        "slot": "headerLeft"
    }]

```
