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

The following items can exist in the options object for the `showCardModal` action. Either `slug` or `idForm` must be present to identify the page loaded in the card modal.  See [source docs](https://euvl.github.io/vue-js-modal/Properties.html) for a complete list of additional parameters.

<table><thead><tr><th width="300.3333333333333" align="right">Option Key</th><th width="110" align="center">Type</th><th>Description / Purpose</th></tr></thead><tbody><tr><td align="right"><code>name</code></td><td align="center">string</td><td>Add a name to the card window. If not set, it will default to "modal". You can use the modal to target the window for other actions.</td></tr><tr><td align="right"><code>clickToClose</code></td><td align="center">boolean</td><td>defaults true. If false, you will not be able to click outside of the modal to close it.</td></tr><tr><td align="right"><code>draggable</code></td><td align="center">boolean</td><td>defines a CSS selector for an element that should be allowed to drag the entire model if clicked on by the user</td></tr><tr><td align="right"><code>height</code></td><td align="center">string</td><td>pixel or % value to define the height of the modal</td></tr><tr><td align="right"><code>idForm</code></td><td align="center">string</td><td>(optional - instead of slug) UUID of the page to show in the card</td></tr><tr><td align="right"><code>model</code></td><td align="center">object</td><td>if set, this data will be used for the page data model. If an <code>onFormRequest</code> hook is enabled, this content will NOT be passed into the hook.</td></tr><tr><td align="right"><code>onBeforeClosed_actions</code></td><td align="center">array</td><td>Array of actions to be run when the card window is closed. This and the `onClosed` is useful if you want to run actions when a user clicks outside the modal without explicitly clicking a button.</td></tr><tr><td align="right"><code>onClosed_actions</code></td><td align="center">array</td><td>Array of actions run <em>after</em> the modal has been closed.</td></tr><tr><td align="right"><code>query</code></td><td align="center">object</td><td>Data passed to FMS as if it were a query param (more below)</td></tr><tr><td align="right"><code>resizable</code></td><td align="center">boolean</td><td>defaults false. If true, the model can be resized by the user</td></tr><tr><td align="right"><code>scrollable</code></td><td align="center">boolean</td><td>defaults true. If false, the modal's content will be fixed in view (user cannot scroll down the page)</td></tr><tr><td align="right"><code>slug</code></td><td align="center">string</td><td>Must match a site navigation slug of the page to show in the card</td></tr><tr><td align="right"><code>style</code></td><td align="center">string</td><td>Classes that will be applied to to modal window wrapper</td></tr><tr><td align="right"><code>width</code></td><td align="center">string</td><td>pixel or % value to define the width of the modal</td></tr></tbody></table>

Changing paths / page contents, use a `path` action with added `windowName` key to target the correct window, in this case the name of this modal.

## Passing Parameters

Often you need to pass some params to the modal from the parent page. These fall within situations, with or without the `onFormRequest` hook enabled.

#### With `onFormRequest` enabled

When called from another (parent) page. If you need `onFormRequest` params, use the `query` key as you would with other pages and read via the `$$BF_Query` global in your hook script.

#### Without `onFormRequest` enabled

When showing a modal and you don't need to call a server hook script you can still pass data to modal several ways.

1. Via the `model` key. data in the key will appear in the `model` for the modal. This is useful when you want to edit some detail information that the parent form already has.
2. Via the `app` object. By setting a key within the `app` object, and then later reading that when the form loads, you can pass anything back and forth between parent and modal.
