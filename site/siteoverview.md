# Site Model
The site model is the JSON object that controls the top level of the app (web site) function and look. This model contains things like navigation, authentication methods and `CSS` code.

##Content
The `content` key within the site object contains data related to the site look and feel mainly. 

#### Slots (`content.slots`)
Slots are definable HTML templates that can be inserted into various areas of BetterForms. Slots can be used for customizing the header area, navigation and footer areas (footer not developed yet).
Slots can accept HTML and VueJs HTML.

Slot scope for VueJS HTML will depend on the slot location. All slots can see `window.formGen` from there you can access formGen.formSchema.model.

#### Slot Locations:
    * headerBrandLeft - To the left of the logo brand block
    * headerBrand
    * headerSidebarTogglee - replaces default sidebar hamburger toggle
    * headerLeft
    * headerMiddle
    * headerRight
    * formFooter
    * appFooter
    * leftNavFooter - left navigation menu footer area, good for logos

```
// content.slots
    "slots": [{
        "html": "<h1>This is a slot!</h1>",
        "slot": "headerLeft"
    }]

```
