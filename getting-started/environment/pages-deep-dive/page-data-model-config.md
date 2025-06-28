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

You can choose to sync this cached data with the app to ensure consistency across sessions. [See more details](../managing-environments-deep-dive.md).
