# Radios Element

The Radios element presents a group of options where only one option can be selected at a time. This is commonly used for mutually exclusive choices.

In BetterForms, this is suitable for questions where the user must pick a single answer from a small, fixed set of options (e.g., gender, a rating scale, or a single preference).

## Common Configuration Properties

Below are some of the most common properties used when configuring a Radios element in BetterForms:

| Property       | Type    | Description                                                                                                |
| :------------- | :------ | :--------------------------------------------------------------------------------------------------------- |
| `type`         | `String`| Must be set to `"radios"`.                                                                               |
| `label`        | `String`| A general label for the entire radio button group.                                                           |
| `model`        | `String`| The key in your BetterForms data model where the value of the selected radio button will be stored.          |
| `values`       | `Array` | An array of strings or objects defining the individual radio button options. If objects, they usually have `name` (display) and `value` (stored) properties. |
| `disabled`     | `Boolean`| If `true`, all radio buttons in the group will be visible but not interactive. Defaults to `false`.        |
| `hint`         | `String`| Additional helper text displayed with the radio button group.                                                |
| `required`     | `Boolean`| If `true`, the form will require one option to be selected for submission. Defaults to `false`.              |
| `featured`     | `Boolean`| Can be used by themes to apply special styling to the radio group.                                         |
| `styleClasses` | `String` / `Array` | CSS class(es) to apply to the radio group wrapper for custom styling.                                      |

### Example Schema Snippet

```json
{
  "type": "radios",
  "label": "Preferred contact method:",
  "model": "contactPreference",
  "values": [
    { "name": "Email", "value": "email" },
    { "name": "Phone", "value": "phone" },
    { "name": "Mail", "value": "mail" }
  ],
  "default": "email",
  "hint": "Select only one option."
}
```

## BetterForms Specific Notes

*   The `model` property will store the `value` of the selected radio button option.
*   Ensure the `values` array is properly defined to present all necessary choices to the user.
*   For a large number of single-choice options, a `select` (dropdown) element might offer a more compact UI.

## Full Property Reference

This element is based on a standard form generation library. For a comprehensive list of all available properties, advanced configuration options, and the full technical specification, please refer to the [Radios Field Documentation](https://vue-generators.gitbook.io/vue-generators/fields/core-fields/radios). 