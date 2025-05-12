# Select (Dropdown) Element

The Select element, commonly known as a dropdown list, allows users to choose a single option from a predefined list. It's a compact way to present multiple choices when only one can be selected.

In BetterForms, this is frequently used for selecting a country, state, category, status, or any other scenario where a user needs to pick one item from a moderately long list of options.

## Common Configuration Properties

Below are some of the most common properties used when configuring a Select element in BetterForms:

| Property       | Type    | Description                                                                                                |
| :------------- | :------ | :--------------------------------------------------------------------------------------------------------- |
| `type`         | `String`| Must be set to `"select"`.                                                                               |
| `label`        | `String`| A label for the dropdown list.                                                                             |
| `model`        | `String`| The key in your BetterForms data model where the value of the selected option will be stored.                |
| `values`       | `Array` | An array of strings or objects defining the options in the dropdown. If objects, they usually have `name` (display text) and `id` or `value` (stored value) properties. Can also be grouped if `selectOptions` with `groups` is used. |
| `disabled`     | `Boolean`| If `true`, the select element will be visible but not interactive. Defaults to `false`.                    |
| `hint`         | `String`| Additional helper text displayed with the select element.                                                    |
| `required`     | `Boolean`| If `true`, the form will require an option to be selected. Defaults to `false`.                            |
| `featured`     | `Boolean`| Can be used by themes to apply special styling.                                                            |
| `styleClasses` | `String` / `Array` | CSS class(es) to apply to the select element wrapper for custom styling.                                   |
| `selectOptions`| `Object`| Advanced options for the select field, such as `multiple` (for multi-select, though less common with basic `select`), `noneSelectedText`, or defining `groups` for optgroups within the dropdown. |

### Example Schema Snippet

```json
{
  "type": "select",
  "label": "Select your country:",
  "model": "userCountry",
  "values": [
    { "id": "US", "name": "United States" },
    { "id": "CA", "name": "Canada" },
    { "id": "GB", "name": "United Kingdom" },
    { "id": "AU", "name": "Australia" }
  ],
  "selectOptions": {
    "noneSelectedText": "-- Please select a country --"
  },
  "hint": "Choose your country of residence."
}
```

## BetterForms Specific Notes

*   The `model` will store the `id` (or `value`) of the chosen option from the `values` array.
*   The `values` array is key. For simple lists, an array of strings can suffice. For more control over display text vs. stored value, use an array of objects (commonly with `id`/`value` and `name` keys).
*   For very long lists of options that might benefit from searching or type-ahead functionality, consider more advanced select components like `vueMultiSelect` (an optional VFG field) or custom solutions if available in BetterForms.

## Full Property Reference

This element is based on a standard form generation library. For a comprehensive list of all available properties, advanced configuration options (like optgroups), and the full technical specification, please refer to the [Select Field Documentation](https://vue-generators.gitbook.io/vue-generators/fields/core-fields/select). 