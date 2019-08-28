---
description: Card modals display other pages as their content.
---

# Card / Window Modals

{% hint style="info" %}
This element is based on the [**vue js modal**](https://github.com/euvl/vue-js-modal#properties) module. 
{% endhint %}

Card Modals are opened with an `showCardModal` action and hidden with a `hideCardModal` action. 

```javascript
// Minimal settings
{
    "action": "showCardModal",
    "options": {
        "slug": "some_page_slug" // note: slug names must be URL comaptible
    }
}
```

| Key | Type / Value | Description |
| :--- | :--- | :--- |
| action | `"showCardModal"` |  |
| options.name | _string_ | { optional } defaults to "modal" Can be used to target window for other actions.  |

Changing paths / page contents, use a `path` action with added `windowName`  key to target the correct window, in this case the name of this modal. 

Setting the drag handle

You can optionally set a string for the `draggable` key. This string should be a valid `CSS` selector \( id, class, elementType \). For example to only allow the header portion of a window to be dragable set `"draggable": ".pageheader"` 

Fancy Sample

```yaml
{
    "action": "showCardModal",
    "options": {
        "clickToClose": false,
        "draggable": false,
        "height": "auto",
        "model" : {
            "key" : 123
        },
        "query": {},
        "resizable": false,
        "scrollable": true,
        "slug": "managestaffedit",
        "type": "modal",
        "width": "800px"
    }
}
```

#### Example

TODO:

| Option Key | Type | Description / Purpose |
| ---: | :---: | :--- |
| `name` | string | Add a name to the card window |
| `slug` | string | Must match a site navigation slug of the page to show in the card |
| `idForm` | string | \(optional - instead of slug\) UUID of the page to show in the card |
| `model` | object | if set, this data will be used for the page data model. If an `onForRequest` hook is enabled, this content will NOT be passed into the hook. |
| `query` | object | Data passed to FMS as if it were a query param \(more below\) |
| `onBeforeClosed_actions` | array | Array of actions to be run when the card window is closed. This  and the \`onClosed\` is useful if you want to run actions when a user clicks outside the modal without explicitly clicking a button. |
| `onClosed_actions` | array | Array of actions run _after_ the modal has been closed. |

#### Passing Parameters

Often you need to pass some params to the modal form the parent page. These fall within situations, with or without the `onFormRequest` hook enabled.

#### With `onFormRequest` enabled

When called from another \(parent\) page. If you need `onFormRequest` params, use the `query` key as you would with other pages and read via the `$$BF_Query` global in your hook script. 

#### Without  `onFormRequest` enabled

When showing a modal and you don't need to call a server hook script you can still pass data to modal several ways.

1. Via the `model` key. data in the key will appear in the `model` for the modal. This is useful when you want to edit some detail information that the parent form already has.
2. Via the `app` object. By setting a key within the `app` object, and then later reading that when the form loads, you can pass anything back and forth between parent and modal.



