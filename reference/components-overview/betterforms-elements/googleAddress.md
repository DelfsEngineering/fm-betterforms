# Google Address Autocomplete Element

The live `googleAddress` field is a text input enhanced by `google.maps.places.Autocomplete`.

## Common Configuration Properties

| Property | Type | Description |
| :-- | :-- | :-- |
| `type` | `String` | Must be `"googleAddress"` |
| `label` | `String` | Field label |
| `model` | `String` | Model key that stores the selected formatted address |
| `placeholder` | `String` | Placeholder text |
| `disabled` | `Boolean` | Disables the input |
| `readonly` | `Boolean` | Makes the input read-only |
| `fieldOptions.onPlaceChanged` | `Function` | Optional callback fired after a place is selected |

## Runtime Notes

- The component requires the Google Maps JavaScript API with the `places` library loaded globally.
- The model value is set to `place.formatted_address`.
- On focus, the component attempts to use browser geolocation to bias autocomplete results near the user.
- The autocomplete instance is created with `types: ["geocode"]`.

If `fieldOptions.onPlaceChanged` is provided, it is called with:

```text
(formattedAddress, parsedAddressData, place, model, schema)
```

`parsedAddressData` may include keys such as:

- `street_number`
- `route`
- `country`
- `administrative_area_level_1`
- `administrative_area_level_2`
- `locality`
- `postal_code`

## Example Schema Snippet

```json
{
  "type": "googleAddress",
  "label": "Street Address",
  "model": "userAddress",
  "placeholder": "Start typing your address..."
}
```

## Full Property Reference

This element is implemented in the sibling `vue-form-generator` source as `fieldGoogleAddress.vue` and uses the Google Places Autocomplete API.
