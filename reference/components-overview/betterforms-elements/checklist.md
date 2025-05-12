# Checklist Element

The Checklist element allows users to select multiple options from a predefined list. Each option is typically represented by a checkbox.

In BetterForms, this is ideal for scenarios where a user can choose one or more items from a set of available choices, such as selecting multiple interests, toppings, or features.

## Common Configuration Properties

Below are some of the most common properties used when configuring a Checklist element in BetterForms:

| Property       | Type    | Description                                                                                                |
| :------------- | :------ | :--------------------------------------------------------------------------------------------------------- |
| `type`         | `String`| Must be set to `"checklist"`.                                                                            |
| `label`        | `String`| A general label for the entire checklist group.                                                              |
| `model`        | `String`| The key in your BetterForms data model where the array of selected values will be stored.                    |
| `values`       | `Array` | An array of strings or objects defining the individual options in the checklist. If objects, they usually have `name` (display) and `value` (stored) properties. |
| `listBox`      | `Boolean`| If `true`, displays the checklist in a style resembling a list box, often with a border. Defaults to `false`. |
| `disabled`     | `Boolean`| If `true`, all checkboxes in the list will be visible but not interactive. Defaults to `false`.              |
| `hint`         | `String`| Additional helper text displayed with the checklist group.                                                   |
| `required`     | `Boolean`| If `true`, the form will require at least one option to be selected. Defaults to `false`.                   |
| `featured`     | `Boolean`| Can be used by themes to apply special styling to the checklist group.                                     |
| `styleClasses` | `String` / `Array` | CSS class(es) to apply to the checklist wrapper for custom styling.                                        |

### Example Schema Snippet

```json
{
  "type": "checklist",
  "label": "Select your interests:",
  "model": "userInterests",
  "values": [
    { "name": "Sports", "value": "sports" },
    { "name": "Music", "value": "music" },
    { "name": "Technology", "value": "tech" },
    { "name": "Travel", "value": "travel" }
  ],
  "listBox": true,
  "hint": "Choose as many as you like."
}
```

## BetterForms Specific Notes

*   The `model` property should map to a field in your BetterForms data model that can store an array of the selected values.
*   The `values` array is fundamental for defining the options available to the user.

## Full Property Reference

This element is based on a standard form generation library. For a comprehensive list of all available properties, advanced configuration options, and the full technical specification, please refer to the [Checklist Field Documentation](https://vue-generators.gitbook.io/vue-generators/fields/core-fields/checklist). 