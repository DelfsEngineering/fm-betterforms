# Advanced Select (selectEx) Element

The live `selectEx` field uses the Bootstrap Select (`selectpicker`) jQuery plugin, not `vue-multiselect`.

## Common Configuration Properties

| Property | Type | Description |
| :-- | :-- | :-- |
| `type` | `String` | Must be `"selectEx"` |
| `label` | `String` | Field label |
| `model` | `String` | Model key that stores the selected value |
| `values` | `Array` / `Function` | Available choices. If a function is used, it is called with `(model, schema)` |
| `placeholder` | `String` | Placeholder/title shown by the selectpicker |
| `disabled` | `Boolean` | Disables the select |
| `fieldOptions` | `Object` | Options passed into `$(el).selectpicker(...)` |

## `values` and Object Items

If `values` contains objects:

- `fieldOptions.value` defines which key becomes the stored value
- `fieldOptions.name` defines which key is shown as the option label

If those keys are omitted, the component falls back to:

- `id` for the stored value
- `name` for the visible label

## Multi-Select

Set:

```json
{
  "fieldOptions": {
    "multiSelect": true
  }
}
```

This maps to the rendered select element's `multiple` attribute.

## Example Schema Snippet

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
  "placeholder": "Search or select a category",
  "fieldOptions": {
    "value": "id",
    "name": "name"
  }
}
```

## Runtime Notes

- The component requires the Bootstrap Select library to be loaded globally.
- The field refreshes the selectpicker UI when the model changes.
- For single-select mode, the component renders a blank option with `null` value unless `multiSelect` is enabled.

## Full Property Reference

This element is implemented in the sibling `vue-form-generator` source as `fieldSelectEx.vue` and uses the Bootstrap Select jQuery plugin.
