# Misc Page Settings

## Form Types

Pages can have various types that define the initial behavior and appearance of the page. The form type is set with the `formtype` key in the Misc tab of the page editor.

The 4 form types currently supported are:

* **formblank** - default style for new pages
* **formwidget** - removes the white background color of a page. Looks great with [panel](../components-overview/grouping-elements/untitled-1.md) elements to create the look of a widget in the middle of your page
* **formwizard** - enables various hooks to support pages using the wizard form schema&#x20;
* **formplain** - legacy version of formblank

## isForm

Entire pages or certain elements can be made into more standard forms where a "submit" action is executed when the user presses the **Enter** key. This customization is most common for [Custom Login Pages](../users-and-authentication/custom-login-pages.md).

To enable this functionality, add `"isForm": true` to one of the following elements:

* [panel](../components-overview/grouping-elements/untitled-1.md) element
* [accordion](../components-overview/grouping-elements/accordion.md) element
* misc tab of the page editor (for an entire page to become a form)

In order for this feature to function properly, you must have a [button](../components-overview/common/button.md) defined within the same context as the `isForm` flag. That button element must also have `"submit": true` defined within its schema. There can only be 1 button with the `submit` flag set for each element that is defined as a form.
