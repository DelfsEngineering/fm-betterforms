# App Model

The **App Model** functions similar to a page's [data model](../form-settings/data-model.md), except that it is accessible to every page in your site. You can also reference data in the App Model from elements that are not bound to a page, such as [Navigation menus](navigationoverview.md#custom-navigation-menus) and [slots](slots-code-injection.md). App data can be cached in local storage for fast performance.

### Referencing the App Model

The App model is simply a JSON object that can be globally referenced as `app.key`

* In a JavaScript function or calculation
  * `app.key`
* In VueJS template syntax \(within HTML code\)
  * `{{app.key}}`

### Inserting Data to the App Model

This can be done in several ways:

* Set the default data / keys in the **Environment &gt; App Model** tab in your [**site settings**](./).
* With a [**function action**](../actions-processor/actions_overview/function-1.md), use the code `app.key = 'value'` to change or set data
* In a **Hook Script** set/modify the [$$BF\_App ](../hooksoverview/filemaker-globals/usdusdbf_app.md)global variable using FileMaker's JSON functions

### Caching \(bf-v0.10.4+\)

The `app` data model keys can be individually cached in the browsers local or session storage.

This feature is enabled within the app model editing page of the page builder.

* **Use Local Storage** - This data will persist from session to session, and remain even after the browser has been closed.
* **Use Session Storage** - This data will survive a page refresh, but will not survive after the tab has been closed in the browser.

As your application loads, BetterForms will first check the **Session Storage** and if enabled, try to pull data from there, if that is not successful, it will check the **Local Storage** and attempt to populate data from there. By allowing separate control, you can have a given tabs context preserved.

Keys that are set for caching will automatically be saved locally as they are changed. There is nothing you need to do additionally to manage this.

