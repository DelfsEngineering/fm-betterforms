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
| `values`       | `Array` | An array of strings or objects defining the options in the dropdown. If objects, they usually have `name` (display text) and `id` or `value` (stored value) properties. Grouped items can also be provided. |
| `disabled`     | `Boolean`| If `true`, the select element will be visible but not interactive. Defaults to `false`.                    |
| `hint`         | `String`| Additional helper text displayed with the select element.                                                    |
| `required`     | `Boolean`| If `true`, the form will require an option to be selected. Defaults to `false`.                            |
| `featured`     | `Boolean`| Can be used by themes to apply special styling.                                                            |
| `styleClasses` | `String` / `Array` | CSS class(es) to apply to the select element wrapper for custom styling.                                   |
| `fieldOptions` | `Object` | Advanced options for the V3+ field shape, including `noneSelectedText`, `hideNoneSelectedText`, and custom object key mapping with `value` / `name`. |

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
  "fieldOptions": {
    "noneSelectedText": "-- Please select a country --"
  },
  "hint": "Choose your country of residence."
}
```

## BetterForms Specific Notes

*   The `model` stores the chosen option value.
*   For object items, the V3+ field uses `fieldOptions.value` and `fieldOptions.name` when you want keys other than the default `id` and `name`.
*   The `values` array can also include `group` on object items, which the runtime renders as `<optgroup>` sections.
*   For very long lists of options that might benefit from searching or type-ahead functionality, consider more advanced select components like `vueMultiSelect` (an optional VFG field) or custom solutions if available in BetterForms.

## Full Property Reference

This element is based on a standard form generation library. For a comprehensive list of all available properties, advanced configuration options (like optgroups), and the full technical specification, please refer to the [Select Field Documentation](https://vue-generators.gitbook.io/vue-generators/fields/core-fields/select). 