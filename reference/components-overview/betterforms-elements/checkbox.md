# Checkbox Element

The Checkbox element presents an option that can be toggled on (checked) or off (unchecked), typically representing a boolean choice (true/false).

In BetterForms, this is commonly used for yes/no questions, agreement to terms, or selecting individual binary options.

## Common Configuration Properties

Below are some of the most common properties used when configuring a Checkbox element in BetterForms:

| Property       | Type    | Description                                                                                                |
| :------------- | :------ | :--------------------------------------------------------------------------------------------------------- |
| `type`         | `String`| Must be set to `"checkbox"`.                                                                               |
| `label`        | `String`| The text displayed next to the checkbox to describe its purpose.                                             |
| `model`        | `String`| The key in your BetterForms data model where the checkbox's boolean value (true/false) will be stored.         |
| `disabled`     | `Boolean`| If set to `true`, the checkbox will be visible but not interactive. Defaults to `false`.                     |
| `default`      | `Boolean`| The initial state of the checkbox (e.g., `true` for checked, `false` for unchecked).                       |
| `hint`         | `String`| Additional helper text displayed with the checkbox, often as a tooltip or small text below.                |
| `required`     | `Boolean`| If set to `true`, the form will require this checkbox to be checked for submission (less common for checkboxes unless it's an agreement). |
| `featured`     | `Boolean`| Can be used by themes to apply special styling, often making the element more prominent.                   |
| `styleClasses` | `String` / `Array` | CSS class(es) to apply directly to the checkbox wrapper for custom styling.                                |

### Example Schema Snippet

```json
{
  "type": "checkbox",
  "label": "I agree to the terms and conditions",
  "model": "agreedToTerms",
  "default": false,
  "required": true,
  "hint": "You must agree to proceed."
}
```

## BetterForms Specific Notes

*   The `model` property is crucial and must map to a field in your BetterForms data model designed to store a boolean value.
*   For scenarios requiring a user to select multiple items from a list of checkboxes, consider using the `checklist` element instead.

## Full Property Reference

This element is based on a standard form generation library. For a comprehensive list of all available properties, advanced configuration options, and the full technical specification, please refer to the [Checkbox Field Documentation](https://vue-generators.gitbook.io/vue-generators/fields/core-fields/checkbox). 