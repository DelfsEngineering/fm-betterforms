---
description: >-
  There are many ways to inject code throughout your site. Slots are the primary
  method for doing this
---

# Slots / Code Injection

**Slots** are definable HTML templates that can be inserted into various areas of BetterForms. Slots can be used for customizing the header area, navigation and footer areas (footer not developed yet).\
Slots can accept HTML and VueJs HTML.

Slot scope for VueJS HTML content will depend on the slot location. All slots can see `window.formGen` from there you can access `formGen.formSchema.model` etc.

Slots replace default slot content if there is a default content (Eg. `logout`)

To edit your site's slots, go to the **Appearance > Slots** tab of your [site settings](./).



<figure><img src="../../.gitbook/assets/image (1) (1).png" alt=""><figcaption><p>Head Slot positions</p></figcaption></figure>

### Slot Locations:

| Slot Name             | Description                                                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `headerBrandLeft`     | To the left of the logo brand block                                                                                                  |
| `headerBrand`         | Company Name / Logo Area, if set, replaces default text                                                                              |
| `headerSidebarToggle` | Replaces default sidebar hamburger toggle is set                                                                                     |
| `headerLeft`          | Top Header area left most position to the right of the brand                                                                         |
| `headerMiddle`        |                                                                                                                                      |
| `headerRight`         |                                                                                                                                      |
| `logout`              | Replaces the default logout code _(This slot hides conditionally depending if the user is authenticated)_                            |
| `formHeader`          | Header (top) above the page body. This will show on every page within the app. You can add logic to hide on certain pages as needed. |
| `formFooter`          | Footer area below the page body. This will show on every page within the app. You can add logic to hide on certain pages as needed.  |
| `appFooter`           | Footer area of entire app                                                                                                            |
| `sidebarLeftTop`      | Left navigation menu above menu items                                                                                                |
| `sidebarLeftBottom`   | Left navigation menu below menu items                                                                                                |
| `sidebarLeftFooter`   | Left navigation menu footer area, good for logos, You will need to add CSS to bottom align this \`div\`                              |

##
