# Site Model

The site model is the JSON object that controls the top level of the app \(web site\) function and look. This model contains things like navigation, authentication methods and `CSS` code.

## Content

The `content` key within the site object contains data related to the site look and feel mainly.

### Slots \(`content.slots`\)

Slots are definable HTML templates that can be inserted into various areas of BetterForms. Slots can be used for customizing the header area, navigation and footer areas \(footer not developed yet\).  
Slots can accept HTML and VueJs HTML.

Slot scope for VueJS HTML will depend on the slot location. All slots can see `window.formGen` from there you can access formGen.formSchema.model.

### Slot Locations:

| Slot Key | Description |
| :--- | :--- |
| headerBrandLeft | To the left of the logo brand block |
| headerBrand | Comapny Name / Logo Area, if set, replaces default text |
| headerSidebarToggle | Replaces default sidebar hamburger toggle is set |
| headerLeft | Top Header area left most position to the right of the brand |
| headerMiddle |  |
| headerRight |  |
| formFooter | Footer area of form body |
| appFooter | Footer area of entire page |
| sidebarLeftTop | Left navigation menu above menu items |
| sidebarLeftBottom | Left navigation menu below menu items |
| sidebarLeftFooter | Left navigation menu footer area, good for logos, You will need to add CSS to bottom align this \`div\` |

```text
// content.slots
    "slots": [{
        "html": "<h1>This is a slot!</h1>",
        "slot": "headerLeft"
    }]
```

