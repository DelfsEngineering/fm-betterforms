---
description: Displays a full screen modal dialogue with customizable buttons
---

# showModal / hideModal


::: info

This element is based off of [http://sweet-modal-vue.adepto.as](http://sweet-modal-vue.adepto.as)

:::


| Key | Value |
| :--- | :--- |
| `action` | showModal |
| `options.text` | Text to show within the modal, also accepts HTML code here |
| `options.options` | object - additional options to the parent options |

#### Example action object

```yaml
// action  object for 'showModal'
{
  "action": "showModal",
  "options": {
    "body": "This is a modal!",
    "icon": "warning",
    "options": {},
    "overlayTheme": "light",
    "text": "Welcome User",
    "slots" : []
  }
}
```

To hide the modal, use the `hideModal` action.

```yaml
{
  "action": "hideModal"
}
```


::: warning

**NOTE:** Modals are different than Card Modals, and require separate actions. You cannot use a `hideModal` action to close a Card Modal. 

:::


[card-modals.md](../../form-settings/card-modals.md)

## FileMaker Custom Function

You can call the "hideModal" action using FileMaker during a [hook script](../../hooksoverview/) using this function:

```text
Set Variable $$BF_Actions = BF_SetAction( "hideModal" ; "" )
```

