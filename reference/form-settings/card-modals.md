---
description: Card modals display other pages as their content.
---

# Card / Window Modals

{% hint style="info" %}
This element is based on the [**vue js modal**](https://github.com/euvl/vue-js-modal#properties) module. 
{% endhint %}

Card Modals are a special type of modal that show the contents of another page as their contents. 

They are opened with an `showCardModal` action and hidden with a `hideCardModal` action. 

```yaml
// Minimal settings
{
    "action": "showCardModal",
    "options": {
        "slug": "some_page_slug" // note: slug names must be URL comaptible
    }
}
```

## Options

The following items can exists in the options object for the `showCardModal` action. Either `slug` or `idForm` must be present to identify the page loaded in the card modal.

| Option Key | Type | Description / Purpose |
| ---: | :---: | :--- |
| `name` | string | Add a name to the card window. If not set, it will default to "modal". You can use the modal to target the window for other actions. |
| `slug` | string | Must match a site navigation slug of the page to show in the card |
| `idForm` | string | \(optional - instead of slug\) UUID of the page to show in the card |
| `model` | object | if set, this data will be used for the page data model. If an `onFormRequest` hook is enabled, this content will NOT be passed into the hook. |
| `query` | object | Data passed to FMS as if it were a query param \(more below\) |
| `onBeforeClosed_actions` | array | Array of actions to be run when the card window is closed. This  and the \`onClosed\` is useful if you want to run actions when a user clicks outside the modal without explicitly clicking a button. |
| `onClosed_actions` | array | Array of actions run _after_ the modal has been closed. |
| `clickToClose` | boolean | defaults true. If false, you will not be able to click outside of the modal to close it. |
| `draggable` | boolean | defines a CSS selector for an element that should be allowed to drag the entire model if clicked on by the user |
| `height` | string | pixel or % value to define the height of the modal |
| `width` | string | pixel or % value to define the width of the modal |
| `resizable` | boolean | defaults false. If true, the model can be resized by the user |
| `scrollable` | boolean | defaults true. If false, the modal's content will be fixed in view \(user cannot scroll down the page\) |

Changing paths / page contents, use a `path` action with added `windowName`  key to target the correct window, in this case the name of this modal. 

## Passing Parameters

Often you need to pass some params to the modal from the parent page. These fall within situations, with or without the `onFormRequest` hook enabled.

#### With `onFormRequest` enabled

When called from another \(parent\) page. If you need `onFormRequest` params, use the `query` key as you would with other pages and read via the `$$BF_Query` global in your hook script. 

#### Without  `onFormRequest` enabled

When showing a modal and you don't need to call a server hook script you can still pass data to modal several ways.

1. Via the `model` key. data in the key will appear in the `model` for the modal. This is useful when you want to edit some detail information that the parent form already has.
2. Via the `app` object. By setting a key within the `app` object, and then later reading that when the form loads, you can pass anything back and forth between parent and modal.



