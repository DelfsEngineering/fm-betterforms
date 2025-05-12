# 2.7 Creating Your First List View

Now that you understand how to add elements and implement validation in your pages, let's explore how to create your first list view in BetterForms. This guide will walk you through the process of setting up and managing a list of rows in your application.

## Introduction to List Views

A list view in BetterForms is a dynamic way to display and manage multiple rows of data. Each row can consist of various fields, allowing you to create complex forms that handle multiple entries, such as address lists or contact details.

> **Note**: For more advanced table-based data display with features like sorting, filtering, and pagination, see [Working with Data Tables](working-with-data-tables.md).

## When to Use List Views

List views are ideal for:
- Simple multi-row data entry forms
- Contact lists or address books
- Product lists with basic information
- Any scenario where you need to add/remove rows of similar data

For more complex data display needs (sorting, filtering, pagination), consider using [Data Tables](working-with-data-tables.md) instead.

## Using the `listrows` Component

The `listrows` component is used to display and manage a list of rows where each row consists of fields defined in the schema. This allows for the dynamic rendering of forms that include multiple rows of data inputs.

### Example Configuration

Here's an example of how to configure a `listrows` component:

```json
[
    {
        "isCollapsable": false,
        "schema": {
            "fields": [
                {
                    "label": "Enter Some Contacts (min. 2 max 4)",
                    "max": 4,
                    "min": 2,
                    "model": "address",
                    "schema": {
                        "fields": [
                            {
                                "inputType": "text",
                                "label": "First Name",
                                "model": "nameFirst",
                                "styleClasses": "col-md-3",
                                "type": "input"
                            },
                            {
                                "inputType": "text",
                                "label": "Last Name",
                                "model": "nameLast",
                                "styleClasses": "col-md-3",
                                "type": "input"
                            },
                            {
                                "inputType": "text",
                                "label": "Street 1",
                                "model": "street1",
                                "styleClasses": "col-md-3",
                                "type": "input"
                            },
                            {
                                "inputType": "text",
                                "label": "Street 2",
                                "model": "street2",
                                "styleClasses": "col-md-3",
                                "type": "input"
                            }
                        ]
                    },
                    "styleClasses": "col-md-8",
                    "type": "listrows"
                }
            ]
        }
    }
]
```

### Key Attributes

* **`model`**: The data model path where the array of rows is stored. In this case, `address` is the model where each row of contact data is kept.
* **`min`**: Defines the minimum number of rows required (e.g., 2).
* **`max`**: Defines the maximum number of rows allowed (e.g., 4).
* **`schema.fields`**: An array of field configurations that will be displayed in each row. Each field can have its label, model, input type, and layout styling.

### Visual Example


- Each row contains four text input fields
- The [+][-] buttons allow adding/removing rows
- The component enforces a minimum of 2 and maximum of 4 rows

## Best Practices

1. **Set Appropriate Limits**: Always define `min` and `max` values to prevent users from creating too many or too few rows.
2. **Use Consistent Styling**: Apply consistent `styleClasses` to maintain a clean layout.
3. **Validate Each Field**: Consider adding validation rules to individual fields within the rows.
4. **Consider Mobile Layout**: Use responsive classes (like `col-md-3`) to ensure the form looks good on all devices.

## Notes

* The `listrows` component is versatile and can handle different types of input fields like text, checkboxes, and dropdowns.
* The display of Add and Delete icons is automatically handled based on the defined `min` and `max` values.
* Each row's data is stored as an object in the array specified by the `model` attribute.

## Next Steps

You now have a basic understanding of how to create a list view in BetterForms. As you build out your first application, you'll become more familiar with these components and how to use them effectively.

For more advanced data display needs, you can explore:
- [Working with Data Tables](working-with-data-tables.md) for complex table-based data display
- [BetterForms Elements reference](../../reference/components-overview/README.md) for all available components 