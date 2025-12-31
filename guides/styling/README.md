---
description: >-
  There are many ways to customize a BetterForms site to suit the needs of your
  application!
---

# Customizing and Styling

BetterForms is built with Bootstrap CSS as the UI design framework. You can learn more about [Bootstrap here](https://getbootstrap.com/docs/3.3/).

## Custom Components

Create reusable, self-contained components that can integrate third-party JavaScript libraries:

- **[Creating Components with Third-Party Libraries](../integrations/creating-components-with-third-party-libraries.md)** - Complete guide with FullCalendar, Chart.js, and Leaflet examples
- **[Components Editor](./custom-components/components-editor.md)** - Using the component editor interface
- **[Component Best Practices](./custom-components/component-best-practices.md)** - Guidelines for component development

## styleClasses
Every field type can have CSS classes tied to it. This allows you to add any `Bootstrap CSS` or your own custom classes to any object.

### Optional Page Sections

You can hide or show various parts of the user interface

* Left Navigation Bar
* Header
* Title Block

Controls for elements are found under the `Appearance` tab of the [site editor](../../reference/site-settings/).

These optional components can also be controlled dynamically using JavaScript functions and triggered via a function action. See this page for an example.

### Navigation

Navigation menu options can be configured in the navigation tab of the site editor.

{% content-ref url="../../reference/site-settings/navigationoverview.md" %}
[navigationoverview.md](../../reference/site-settings/navigationoverview.md)
{% endcontent-ref %}

### Theme Template

The default theme template is your starting point for customization. To browse around the theme template, [click here](https://beta.fmbetterforms.com/template/), or use the **Theme Template** link from the navigation menu of the BetterForms interface. From here you can inspect the underlaying HTML of page objects such as buttons etc. This allows you to see the CSS classes and HTML code that is used to compose the element.

### Integration Methods

Your apps can being deployed or integrated with several methods.

* Regular **domain** / direct access app - This is a basic web site style page, most common.
* Embedded **iFrame** app using a code snippet like this to embed your application into an existing web site. Styles from the parent site will not alter styles within your App.\
  `<iframe src="https://myapp.fmbetterforms.com/" width="100%" height="800px" style="border: 0; "></iframe>`
* **Button** Launch - By adding a button on an existing site, you can open a new tab to launch your app.

### Default Theme Colors

BetterForms has several default site theme colors. This can act as a starting point for your app. Themes are selected under site / appearance.

Some elements have an additional classes key for targeting internal components to that element. Buttons are an example of this. The `buttonClasses` key in this case allows you to target the button itself and not the wrapping object around the button.
