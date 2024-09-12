# listrows

The `listrows` is used to display and manage a list of rows where each row consists of fields defined in the schema. This allows for the dynamic rendering of forms that include multiple rows of data inputs, such as address lists or contact details.

**Example Configuration**

{% hint style="info" %}
You can reference to [this example](https://examplesdev.fmbetterforms.com/#/form/4AE6421A-C3B9-4218-9DB8-7692A2486BD4).
{% endhint %}

The following example illustrates a `listrows` component where users can enter multiple contacts with specific fields for first name, last name, and address. It also demonstrates the flexibility of customizing the minimum and maximum number of entries.

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

**Key Attributes**

* **`model`**: The data model path where the array of rows is stored. In this case, `address` is the model where each row of contact data is kept.
* **`min`**: Defines the minimum number of rows required (e.g., 2).
* **`max`**: Defines the maximum number of rows allowed (e.g., 4).
* **`schema.fields`**: An array of field configurations that will be displayed in each row. Each field can have its label, model, input type, and layout styling.

**Notes**

* The `listrows` component is versatile and can handle different types of input fields like text, checkboxes, and dropdowns.
* The display of Add and Delete icons is automatically handled based on the defined `min` and `max` values.
