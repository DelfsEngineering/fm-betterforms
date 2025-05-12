# Input Element

The Input element is a versatile field used for capturing various types of user input, such as text, numbers, email addresses, passwords, and more. Its specific behavior and appearance are determined by its `inputType` property.

In BetterForms, this is one of the most frequently used elements for gathering textual and numerical data from users.

## Common Configuration Properties

Below are some of the most common properties used when configuring an Input element in BetterForms:

| Property       | Type    | Description                                                                                                |
| :------------- | :------ | :--------------------------------------------------------------------------------------------------------- |
| `type`         | `String`| Must be set to `"input"`.                                                                                 |
| `inputType`    | `String`| Defines the type of input. Common values include `"text"`, `"password"`, `"email"`, `"number"`, `"url"`, `"tel"`, `"date"`. Defaults to `"text"`. |
| `label`        | `String`| The text displayed above or next to the input field to describe its purpose.                               |
| `model`        | `String`| The key in your BetterForms data model where the input value will be stored.                                 |
| `placeholder`  | `String`| Placeholder text displayed within the input field when it is empty.                                          |
| `disabled`     | `Boolean`| If `true`, the input field will be visible but not interactive. Defaults to `false`.                         |
| `readonly`     | `Boolean`| If `true`, the input field will not be editable, though its content can be selected/copied. Defaults to `false`. |
| `hint`         | `String`| Additional helper text displayed with the input field.                                                     |
| `required`     | `Boolean`| If `true`, the form will require this field to have a value for submission. Defaults to `false`.             |
| `featured`     | `Boolean`| Can be used by themes to apply special styling.                                                            |
| `styleClasses` | `String` / `Array` | CSS class(es) to apply to the input field wrapper for custom styling.                                      |
| `maxlength`    | `Number`| For text-based input types, the maximum number of characters allowed.                                      |
| `min`, `max`, `step` | `Number` | For `inputType: "number"`, these define the minimum, maximum, and step increment values.                   |

### Example Schema Snippet (Text Input)

```json
{
  "type": "input",
  "inputType": "text",
  "label": "Full Name",
  "model": "fullName",
  "placeholder": "Enter your full name",
  "required": true,
  "hint": "Please provide your first and last name."
}
```

### Example Schema Snippet (Number Input)

```json
{
  "type": "input",
  "inputType": "number",
  "label": "Quantity",
  "model": "itemQuantity",
  "default": 1,
  "min": 1,
  "max": 100,
  "step": 1,
  "hint": "Enter a number between 1 and 100."
}
```

## BetterForms Specific Notes

*   The `inputType` property is critical for defining the behavior and validation of the input field.
*   Always ensure the `model` property correctly maps to an appropriate field in your BetterForms data model.

## Full Property Reference

This element is based on a standard form generation library. For a comprehensive list of all available properties (including other `inputType` options like `color`, `search`, `month`, etc.), advanced configuration, and the full technical specification, please refer to the [Input Field Documentation](https://vue-generators.gitbook.io/vue-generators/fields/core-fields/input). 