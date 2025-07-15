# 2.8 Understanding Page Data Flow

In BetterForms, the **Page Data Model** and **Hooks** are fundamental to how data flows within your application. This guide will help you understand how these components work together to manage data on your page.

## The Page Data Model

The **Data Model** is a JSON structure that stores all data accessible to the current page. It serves as the foundation for data binding, ensuring that elements like inputs and dynamic content are connected to the underlying data.

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

### Default and Development Data Model

* **Default Data Model:** This contains the production data that will be loaded into the page's model when the page is first rendered. This data is sent to your FMS via the `onFormRequest` hook.
* **Development Data Model:** This is for data used only in the BetterForms IDE. The development data is merged with the default data model during previews, allowing you to work with mock data while building the page.

## Hooks and Data Flow

Hooks are scripts that can be triggered at specific points in the page lifecycle, such as when the page is first loaded or when a utility action is performed.

### onFormRequest Hook

The `onFormRequest` hook is used to pull data from the backend and integrate it into the data model. This hook is triggered when the page is first loaded, allowing you to populate the data model with initial data from your FileMaker Server.

### onUtility Hook

The `onUtility` hook is the most common type of scoped hook and is called with the `runUtilityHook` action. This hook allows you to perform actions like saving data back to your FileMaker database.

### Controlling Data Sent from the Browser

To reduce data transfer and improve performance, you can control what data is sent from the browser to the server using methods like `modelFilterKeys` or `model` to filter the data model.

## Integration Settings

The **Integration** tab allows you to manage hooks and validation settings for your page:

* **Enable onFormRequest Hook:** When enabled, this will trigger the `onFormRequest` hook script. For most pages that have data coming from the backend, this should be ticked on.
* **Send Full Schema in Utility Hooks:** Sends the entire formSchema on hooks, providing more control but may increase transfer time on large schemas. Leave unchecked for better performance unless necessary.

## Next Steps

You now have a basic understanding of how the Page Data Model and Hooks work together to manage data flow within your BetterForms application. As you build out your first application, you'll become more familiar with these components and how to use them effectively.

Explore the [BetterForms Elements reference](../../../reference/components-overview/) to see the wide variety of available elements and their specific configuration options.
