# Customizing and Styling

## Optional components

You can hide or show various parts of the user interface

* Left Navigation Bar
* Header
* Title Block

Controls for elements are found under the `Appearance` tab of the site editor.

## Navigation

Navigation menu options can be configured in the navigation tab of the site editor.

## Slots

Slots allow you to inject custom code fragments into various locations around the UI,

Slots See Slots documentation.

### Integration Methods

Your apps can being deployed or integrated with several methods.

* Regular domain / direct access app - This is a basic web site style page, most common.
* Embedded `iFrame` app using a code snippet like this to embed your application into an existing web site. Styles from the parent site will not alter styles within your App. &lt;iframe src="[https://hms.fmbetterforms.com/](https://hms.fmbetterforms.com/)" width="100%" height="800px" style="font-size: 110%; border: 0; "&gt;&lt;/iframe&gt;`<iframe src="https://myapp.fmbetterforms.com/" width="100%" height="800px" style="font-size: 110%; border: 0; "></iframe>`
* Button Launch - By adding a button on an existing site, you can open a new tab to launch your app.

## Loaders

Custom loader / spinners can be added. Animated SVG's or HTML can be injected via the `appearance -> loaders` tab of the site editor.

## Default Theme Colors

BetterForms has several default site theme colors. This can act as a starting point for your app. Themes are selected under site / appearance.

## CSS

Site wide CSS is configured via the `appearance -> CSS` section the BF editor.

#### Schema Element Classes

All elements within a form schema can have a styleClasses key that can take a string of space separated CSS classes. The below example adds the class `my-red-box` to an input element.

```text
{
  "inputType": "text",
  "label": "My Input",
  "model": "field1",
  "styleClasses": "col-md-3 my-red-box",
  "type": "input"
}
```

This class is defined in the CSS section of the Site / Appearance as follows:

```text
.my-red-box {
    border-width: 2px;
    border-color: red;
    border-style: solid;
    padding: 20px;
}
```

Resulting is something similar to the following:

![](../.gitbook/assets/image.png)

#### Form/ page Classes

You can target specific forms \(pages\) by adding class\(es\) to the `styleClasses` key of the `formSchema.form` section on the `misc.` tab of the form editor.

![](../.gitbook/assets/screen-shot-2018-07-06-at-1.11.03-pm.png)

#### Other Classes

Some elements have an additional classes key for targeting internal components to that element. Buttons are an example of this. The `buttonClasses` key in this case allows you to target the button itself and not the wrapping object around the button.

### Favicon

The `favicon` is the custom icon that is located in the tab of the browser. Adding the Favicon is easy and can be done one of two ways.

1. The icon must be hosted from a secure HTTPS site of most browsers will prevent it from loading.  
2. An alternate to hosting the favicon is to b64 inline encode it. This site allows you to easily convert a favicon to a `<>` tag that can be placed in the Header Insertions area of your site editor. [https://xaviesteve.com//pro/base64.php](https://xaviesteve.com//pro/base64.php)

![](../.gitbook/assets/screen-shot-2018-11-28-at-12.39.43-am.png)

```markup
// Sample b64 link tag 
<link rel="shortcut icon" href="data:image/x-icon;base64,AAABAAE">
```

