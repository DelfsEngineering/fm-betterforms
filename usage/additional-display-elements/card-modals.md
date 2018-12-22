# Card / Window Modals

_**Preliminary, subject to change ver 0.8.3+**_

Modals display other form pages as their content.  

Card Modals are opened with an `showCardModal` action and hidden with a `hideCardModal` action. 



```javascript
// Minimal settings
{
    "action": "showCardModal",
    "options": {
        "slug": "some_form_slug"// note: slug names must be URL comaptible
    }
}
```

TODO:

`name` key to add a name, 

Changing paths / form contents, use a `path` action with added `name` or `wndw` key to target the correct window, in this case the name of this modal. 





