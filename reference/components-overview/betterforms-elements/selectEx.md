# Advanced Select (selectEx) Element

The Advanced Select (`selectEx`) element provides a feature-rich dropdown experience by integrating the `vue-multiselect` component. It supports functionalities like single/multiple selections, search/filtering within options, tagging (creating new options on the fly), and custom option templating.

In BetterForms, this element is ideal for scenarios requiring more than a simple dropdown, such as selecting multiple tags, choosing from a long list of searchable items, or allowing users to add new choices.

## Common Configuration Properties

| Property        | Type    | Description                                                                                                |
| :-------------- | :------ | :--------------------------------------------------------------------------------------------------------- |
| `type`          | `String`| Must be set to `"selectEx"`.                                                                               |
| `label`         | `String`| The label for the select field.                                                                              |
| `model`         | `String`| The key in your BetterForms data model where the selected option(s) will be stored.                          |
| `values`        | `Array` | An array of options to choose from. Each option can be a simple string/number or an object.                 |
| `disabled`      | `Boolean`| If `true`, the select will be visible but not interactive. Defaults to `false`.                              |
| `readonly`      | `Boolean`| Similar to `disabled`. If `true`, the value cannot be changed. Defaults to `false`.                       |
| `required`      | `Boolean`| If `true`, a selection must be made. Defaults to `false`.                                                    |
| `hint`          | `String`| Additional helper text.                                                                                      |
| `styleClasses`  | `String` / `Array` | CSS classes for styling the wrapper.                                                                       |
| `selectOptions` | `Object`| **Crucial property.** An object containing options for the underlying `vue-multiselect` component. See below. |

### `selectOptions` (for `vue-multiselect`)

This object is passed directly to `vue-multiselect`. Key `vue-multiselect` properties you might configure here include:

| `vue-multiselect` Option | Type    | Description                                                                                                  |
| :----------------------- | :------ | :----------------------------------------------------------------------------------------------------------- |
| `options`                | `Array` | The array of available options. Often, `values` from the main schema is mapped here.                         |
| `multiple`               | `Boolean`| Set to `true` for multi-select. Defaults to `false`.                                                       |
| `trackBy`                | `String`| Used when `options` are objects. Name of the property to use as the unique key for tracking selections.    |
| `label`                  | `String`| Used when `options` are objects. Name of the property to display as the option's text.                       |
| `searchable`             | `Boolean`| If `true` (default), allows users to search/filter options.                                                  |
| `clearOnSelect`          | `Boolean`| If `true` (default for single select), closes the dropdown after selection.                                  |
| `hideSelected`           | `Boolean`| If `true` (default for multi-select), hides already selected options from the list.                          |
| `placeholder`            | `String`| Placeholder text for the select input.                                                                       |
| `allowEmpty`             | `Boolean`| If `true` (default for single select), allows deselecting the current option.                                |
| `taggable`               | `Boolean`| If `true`, allows users to create new options (tags) if their input doesn't match existing options.         |
| `tagPlaceholder`         | `String`| Placeholder text when `taggable` is `true` (e.g., "Press enter to create a tag").                          |
| `max`                    | `Number`| Maximum number of options that can be selected (for multi-select).                                           |
| `loading`                | `Boolean`| Set to `true` to display a loading spinner (useful for async options).                                         |
| `optionHeight`           | `Number`| Height of each option in pixels (for performance with many options). Default `40`.                             |
| `showLabels`             | `Boolean`| If `true` (default), shows selected/noResult/noOptions messages.                                               |

Refer to the [vue-multiselect documentation](https://vue-multiselect.js.org/) for all available options.

### Example Schema Snippet (Single Select with Search)

```json
{
  "type": "selectEx",
  "label": "Choose a Category",
  "model": "selectedCategory",
  "values": [
    { "id": 1, "name": "Electronics" },
    { "id": 2, "name": "Books" },
    { "id": 3, "name": "Clothing" }
  ],
  "selectOptions": {
    "options": "self.schema.values", // Refers to the values array above
    "searchable": true,
    "placeholder": "Search or select a category",
    "label": "name",       // Property to display for each option
    "trackBy": "id"        // Property to use as unique key
  }
}
```

### Example Schema Snippet (Multi-Select with Tagging)

```json
{
  "type": "selectEx",
  "label": "Assign Tags",
  "model": "assignedTagsArray", // Model will store an array of selected tag objects
  "values": [
    { "code": "urgent", "desc": "Urgent Task" },
    { "code": "feature", "desc": "New Feature Request" }
  ],
  "selectOptions": {
    "options": "self.schema.values",
    "multiple": true,
    "taggable": true,
    "tagPlaceholder": "Add a new tag",
    "placeholder": "Select or create tags",
    "label": "desc",
    "trackBy": "code"
  }
}
```

## BetterForms Specific Notes

*   The `values` array in the main schema provides the source for options. You often reference this in `selectOptions.options` using a path like `"self.schema.values"` or by directly providing an array if the structure is different.
*   When `options` in `selectOptions` are objects (which is common), `trackBy` is essential to uniquely identify options, and `label` specifies which object property to display.
*   The value stored in the `model` will be a single selected option object (or its `trackBy` value, depending on configuration) for single select, or an array of selected option objects (or their `trackBy` values) for multi-select.
*   Ensure `vue-multiselect` is integrated into your BetterForms environment for this component to function. (User confirmed this is the case).

## Full Property Reference

This element is built upon Vue Form Generator and heavily utilizes `vue-multiselect`. For complete details on `selectOptions`:
*   [VFG selectEx Field Documentation](https://vue-generators.gitbook.io/vue-generators/fields/optional-fields/selectex)
*   [vue-multiselect Official Documentation](https://vue-multiselect.js.org/) (for all `selectOptions` props, events, and slots) 