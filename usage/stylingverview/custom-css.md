---
description: You can apply custom CSS styles on a per-site basis
---

# Custom CSS

{% hint style="info" %}
Site wide CSS is configured via the **Appearance > CSS** tab of the [site editor](../../reference/site-settings/).
{% endhint %}

All elements within a form schema can have a styleClasses key that can take a string of space separated CSS classes. The below example adds the class `my-red-box` to an input element.

```yaml
{
  "inputType": "text",
  "label": "My Input",
  "model": "field1",
  "styleClasses": "col-md-3 my-red-box",
  "type": "input"
}
```

This class is defined in the CSS section of the Site / Appearance as follows:

```css
.my-red-box {
    border-width: 2px;
    border-color: red;
    border-style: solid;
    padding: 20px;
}
```

### Page scoped classes

To target specific forms in your app, you can add a `styleClasses` key. This will allow you to still keep your CSS in a single location and theme pages separately.

![Only this Dashboard page with have the \`dash-red\` class applied.](../../.gitbook/assets/screen-shot-2018-07-06-at-1.11.03-pm.png)

Resulting is something similar to the following:

![](../../.gitbook/assets/image.png)
