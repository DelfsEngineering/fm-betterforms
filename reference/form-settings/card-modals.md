# Card / Window Modals

{% hint style="danger" %}
_**Preliminary, subject to change ver 0.8.3+**_
{% endhint %}

Modals display other pages as their content.  

This Modal is based on the [vue js modal](https://github.com/euvl/vue-js-modal#properties) module. 

Card Modals are opened with an `showCardModal` action and hidden with a `hideCardModal` action. 

```javascript
// Minimal settings
{
    "action": "showCardModal",
    "options": {
        "slug": "some_page_slug"// note: slug names must be URL comaptible
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
| `onBeforeClosed_actions` | array | Array of actions to be run when the card window is closed |





**TODO:**

#### Passing Parameters

Parameters can be passed to the Modal via the `params` object set in an action function. When called from another page. If you need `onFormRequest` params, use the `wuery` key as you would with other pages and read via the `$$BF_Query` global.

Often you will want to show a detail modal when clicking on a parent element. This modal will need to know some params to pass to the `onFormRequest` hook so it can return correct data to display. You can pass params with a `query` key in the elements schema. This data will surface in the `$$BF_Query` global in the script.



