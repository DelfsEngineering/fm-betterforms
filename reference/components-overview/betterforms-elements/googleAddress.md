# Google Address Autocomplete Element

The Google Address Autocomplete element provides an input field that suggests and autocompletes street addresses as the user types, using the Google Places API. It helps ensure accurate address data entry.

In BetterForms, this is used to simplify address input and improve data quality by leveraging Google's address database.

**Note:** Using this element requires a properly configured Google Maps JavaScript API key with the Places API enabled for your project.

## Common Configuration Properties

| Property        | Type    | Description                                                                                                      |
| :-------------- | :------ | :--------------------------------------------------------------------------------------------------------------- |
| `type`          | `String`| Must be set to `"googleAddress"`.                                                                              |
| `label`         | `String`| The label for the address input field.                                                                           |
| `model`         | `String`| The key in your BetterForms data model where the selected address (typically the formatted address string) will be stored. |
| `placeholder`   | `String`| Placeholder text for the input field.                                                                            |
| `disabled`      | `Boolean`| If `true`, the input will be visible but not interactive. Defaults to `false`.                                   |
| `required`      | `Boolean`| If `true`, an address must be selected/entered. Defaults to `false`.                                               |
| `hint`          | `String`| Additional helper text.                                                                                          |
| `styleClasses`  | `String` / `Array` | CSS classes for styling the wrapper.                                                                               |
| `options`       | `Object`| Options passed to the Google Places Autocomplete service (e.g., for country restrictions). See example.        |

### `options` (Google Places Autocomplete options):

| Option         | Type   | Description                                                                                                                               |
| :------------- | :----- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `componentRestrictions` | `Object` | Restricts results to specific countries. E.g., `{ country: ['us', 'ca'] }` for US and Canada.                                          |
| `types`        | `Array`| Types of predictions to return. E.g., `['address']` for full street addresses, or `['(cities)']` for cities. Defaults to `['address']`. |

### Example Schema Snippet

```json
{
  "type": "googleAddress",
  "label": "Street Address",
  "model": "userAddress",
  "placeholder": "Start typing your address...",
  "required": true,
  "options": {
    "componentRestrictions": { "country": "us" },
    "types": ["address"]
  }
}
```

## BetterForms Specific Notes

*   **API Key**: Ensure your Google Maps JavaScript API key is correctly loaded and configured in your BetterForms application for this component to function. This is typically set globally.
*   The `model` usually stores the full formatted address string selected by the user. If you need individual address components (street, city, zip, etc.), you may need custom logic in BetterForms (e.g., in a hook script) to parse this information or use additional fields populated from the Places API result.

## Full Property Reference

This element integrates the Google Places Autocomplete functionality. For a comprehensive list of all available `options` for the Google Places Autocomplete service and detailed technical specifications, please refer to:
*   [VFG googleAddress Field Documentation](https://vue-generators.gitbook.io/vue-generators/fields/optional-fields/googleaddress)
*   [Google Places Autocomplete Options](https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest) 