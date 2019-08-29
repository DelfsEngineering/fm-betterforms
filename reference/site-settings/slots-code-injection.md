---
description: >-
  There are many ways to inject code throughout your site. Slots are the primary
  method for doing this
---

# Slots / Code Injection

**Slots** are definable HTML templates that can be inserted into various areas of BetterForms. Slots can be used for customizing the header area, navigation and footer areas \(footer not developed yet\).  
Slots can accept HTML and VueJs HTML.

Slot scope for VueJS HTML content will depend on the slot location. All slots can see `window.formGen` from there you can access `formGen.formSchema.model` etc. 

Slots replace default slot content if there is a default content \(Eg. `logout`\) 

To edit your site's slots, go to the **Appearance &gt; Slots** tab of your [site settings](./).

### Slot Locations:

| Slot Name | Description |
| :--- | :--- |
| `headerBrandLeft` | To the left of the logo brand block |
| `headerBrand` | Company Name / Logo Area, if set, replaces default text |
| `headerSidebarToggle` | Replaces default sidebar hamburger toggle is set |
| `headerLeft` | Top Header area left most position to the right of the brand |
| `headerMiddle` |  |
| `headerRight` |  |
| `logout` | Replaces the default logout code _\(This slot hides conditionally depending if the user is authenticated\)_ |
| `formFooter` | Footer area of page body |
| `appFooter` | Footer area of entire page |
| `sidebarLeftTop` | Left navigation menu above menu items |
| `sidebarLeftBottom` | Left navigation menu below menu items |
| `sidebarLeftFooter` | Left navigation menu footer area, good for logos, You will need to add CSS to bottom align this \`div\` |

## DOM Header Insertion

If you need to insert HTML in the header of every page in your site, go to the **Environment &gt; DOM Header Insertions** tab in your [site settings](./). This feature is useful for installing custom fonts or a [favicon](../../usage/stylingverview/favicon.md) for the browser tab. You may also need to use it for certain [Custom Form Elements](../components-overview/3rd-party-elements.md)



