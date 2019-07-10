# App Model

The **App Model** functions similar to a page's [data model](../form-settings/data-model.md), except that it is accessible to every page in your site. You can also reference data in the App Model from elements that are not bound to a page, such as [Navigation menus](navigationoverview.md#custom-navigation-menus) and [slots](slots-code-injection.md).

## Referencing the App Model

The App model is simply a JSON object that can be globally referenced as `app.key`

* In a JavaScript function or calculation
  * `app.key`
* In VueJS template syntax
  * `{{app.key}}`

## Inserting Data to the App Model

This can be done in several ways:

* Set the default data / keys in the **Environment &gt; App Model** tab in your [**site settings**](./).
* With a [**function action**](../actions-processor/actions_overview/function-1.md), use the code `app.key = 'value'` to change or set data
* In a **Hook Script** set/modify the [$$BF\_App ](../hooksoverview/filemaker-globals/usdusdbf_app.md)global variable using FileMaker's JSON functions

