# 2.4 Adding Elements to Your Page

You've successfully [created your first page](create-page.md) and even added a "Data Model Inspector" to see some raw data. Now, let's explore how to add more structured and interactive elements to your page using the Page Schema editor.

The "Page Builder" or Schema Editor in BetterForms is your primary tool for this. It allows you to define, configure, and organize all the components that make up your user interface.

## Understanding the Page Schema for Elements

As you learned, the **Page Schema** is a JSON structure that defines everything on your page. The `fields` array within the schema is where you'll list the individual elements.

```json
{
    "schema": {
        "fields": [
            // Elements like inputs, buttons, HTML blocks, etc., go here
        ]
    },
    // ... other page settings ...
}
```

Each object you add to the `fields` array represents a distinct element on your page.

## Using Snippets to Add Elements

The easiest way to add common pre-configured elements is by using the **Snippet Library** in the Schema Editor.

1. **Locate Snippets:** In the Schema Editor interface, you should find a section or search bar for "Snippets."
2. **Find an Element:** Search for the type of element you want to add (e.g., "button," "input," "HTML").
3. **Copy and Paste:** Select the desired snippet and copy it. Then, paste this JSON snippet into the `fields` array in your Page Schema. Remember to add a comma (`,`) after the preceding element if you're adding to an existing list.

This is how you added the "HTML - Data Model Inspector" in the previous step. You can use the same process to add input fields, buttons, and more.

## Organizing Elements with Groups

For more complex pages, you can organize your `fields` into logical `groups`. This helps in structuring your schema and can sometimes influence layout.

```json
{
    "schema": {
        "groups": [
            {
                "title": "User Information", // An optional title for the group
                "_note": "Section for user details", // A note for schema organization
                "fields": [
                    { "type": "input", "model": "nameFirst", "label": "First Name" },
                    { "type": "input", "model": "nameLast", "label": "Last Name" }
                ]
            },
            {
                "title": "Actions",
                "fields": [
                    { "type": "button", "label": "Save", "action": "submitData" }
                ]
            }
        ]
    },
    // ...
}
```

* `_note`: This property is purely for your organizational purposes within the schema and doesn't render on the page.

## Common Element Properties

Each element you add will have various properties to configure its behavior and appearance:

* `type`: Specifies the kind of element (e.g., "input", "button", "html"). This is fundamental.
* `label`: Text displayed as the label for an element (e.g., for an input field).
* `model`: For input fields, this links the element to a specific key in your [Page Data Model](create-page.md#1-the-data-model).
* `styleClasses`: Allows you to apply CSS classes (e.g., Bootstrap classes like `col-md-6` for layout, or custom classes) to style the element.
* `visible`: Can be set to `false` to hide an element statically.
* `visible_calc`: For dynamic visibility, you can use a calculation based on your data model, e.g., `"visible_calc": "model.isUserAdmin"`.

You'll find many more properties specific to each element type in the [BetterForms Elements reference documentation](../../../reference/components-overview/).

## Basic Input Field Validation

For input fields, you can add validation rules:

* `validator`: Specify a validator type (e.g., `"string"`, `"number"`, `"email"`).
* `validator_calc`: For dynamic validation conditions.
* `errorMsg`: A custom message to display if validation fails.

Example:

```json
{
    "type": "input",
    "model": "email",
    "label": "Email Address",
    "validator": "email",
    "errorMsg": "Please enter a valid email address."
}
```

Validation can also be triggered by actions, like a button click.

## Tools for Managing the JSON Schema

The Schema Editor provides tools to help you work with the JSON structure, especially for complex pages:

* **Folding/Unfolding:** Look for controls (often in a toolbar or near line numbers) to collapse or expand different levels of your JSON schema. This is very helpful for navigating large schemas.
* **Formatting:** There's usually an option to automatically format your JSON, keeping it neat and readable.

## Editing HTML Content Within Elements

If you add an "html" type element (or other elements that embed HTML), the Schema Editor often provides a dedicated HTML editor:

* **Accessing the Editor:** Typically, clicking on the line number of an HTML field in the schema will open up a more user-friendly HTML editing interface.
* **Features:** This editor might offer features like syntax highlighting, and sometimes even direct data model editing or an AI assistant for HTML generation.
* **Saving:** Remember to save changes within the HTML editor, and then save the overall page schema.

## Next Steps

You now have a basic understanding of how to add and configure elements on your BetterForms page using the Page Schema editor. The key is to:

1. Use snippets to add elements quickly.
2. Understand the basic properties like `type`, `model`, and `label`.
3. Refer to the detailed documentation for each specific element type.

Explore the [BetterForms Elements reference](../../../reference/components-overview/) to see the wide variety of available elements and their specific configuration options. As you build out your first application, you'll become more familiar with these tools and properties.
