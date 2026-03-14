# Masked Input Element

The live `masked` field uses the jQuery Masked Input plugin.

## Common Configuration Properties

| Property | Type | Description |
| :-- | :-- | :-- |
| `type` | `String` | Must be `"masked"` |
| `label` | `String` | Field label |
| `model` | `String` | Model key that stores the input value |
| `placeholder` | `String` | Placeholder text |
| `disabled` | `Boolean` | Disables the input |
| `readonly` | `Boolean` | Makes the input read-only |
| `fieldOptions.mask` | `String` | Mask pattern passed to `$(el).mask(...)` |
| `fieldOptions.maskOptions` | `Object` | Optional plugin options passed as the second argument |

## Example Schema Snippet

```json
{
  "type": "masked",
  "label": "Phone Number",
  "model": "userPhoneNumber",
  "placeholder": "(999) 999-9999",
  "fieldOptions": {
    "mask": "(999) 999-9999"
  }
}
```

## Runtime Notes

- The component requires the jQuery Masked Input library to be loaded globally.
- On mount, the component runs `unmask().mask(fieldOptions.mask, fieldOptions.maskOptions)`.
- On destroy, it removes the mask with `unmask()`.

## Full Property Reference

This element is implemented in the sibling `vue-form-generator` source as `fieldMasked.vue` and uses the jQuery Masked Input plugin.
