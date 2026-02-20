# Data Model

The **Data Model** tab contains all data accessible to the current page in JSON format.

### Understanding the Data Model

The data model is a JSON structure that stores data used by elements on your page. It serves as the foundation for data binding, ensuring that elements like inputs and dynamic content are connected to the underlying data.

### Binding Data to Page Elements

For instance, if your data model includes:

```json
"user": {
  "firstName": ""
}
```

You can bind this data to an input field using the following snippet:

```json
{
  "inputType": "text",
  "label": "First Name",
  "model": "user.firstName",
  "styleClasses": "",
  "type": "input"
}
```

Or, in an HTML content field:

```html
<input type="text" v-model="model.user.firstName" />
<p>Your first name is: {{ model.user.firstName }}</p>
```

These examples show how the data model connects to elements on the page, allowing for dynamic interaction and updates.

### Default Data Model

This editor contains the production data that will be loaded into the page's model when the page is first rendered. This data is sent to your FMS via the <mark style="color:red;">`onFormRequest`</mark> hook.

### Development Data Model

This editor is for data used only in the BetterForms IDE. The development data is merged with the default data model during previews, allowing you to work with mock data while building the page.

#### Caching and Syncing

In the **Models** tab, each key can be configured under **Key Caching**:

- **Cache in browser** = local storage
- **Cache in tab** = session storage
- **Sync with app** = keep that page model key synced with the global app model key

This is configured directly in the UI (you do not need to edit JSON paths manually in this screen).

![Key Caching with Sync with app enabled](../../../../../assets/key-caching-sync-with-app.png)

Example of a page model key (`pet`) that has **Sync with app** enabled:

![Default Data Model with synced key](../../../../../assets/default-data-model-sync-example.png)

For detailed app model behavior and caching notes, see [App Model](../../../../../reference/site-settings/app-model.md).

{% hint style="warning" %}
**When returning both App + Model from a hook:**

If a key is set to **Sync with app** and your hook returns that same key in both `$$BF_App` and `$$BF_Model`, the values can conflict.  
To avoid unexpected results, return the key in only one place unless you intentionally want precedence behavior.
{% endhint %}
