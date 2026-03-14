# DateTime Picker Element

The live `dateTimePicker` field is a text input enhanced by the jQuery Bootstrap DateTimePicker plugin.

## Common Configuration Properties

| Property | Type | Description |
| :-- | :-- | :-- |
| `type` | `String` | Must be `"dateTimePicker"` |
| `label` | `String` | Field label |
| `model` | `String` | Model key that stores the input value |
| `placeholder` | `String` | Placeholder text |
| `disabled` | `Boolean` | Disables the input |
| `readonly` | `Boolean` | Makes the input read-only |
| `fieldOptions` | `Object` | Options passed directly to the Bootstrap DateTimePicker plugin |

## `fieldOptions`

The component passes `fieldOptions` directly into `$(el).datetimepicker(...)`.

If you do not provide a `format`, the field uses the component's default input format from the shared date helper.

Example:

```json
{
  "type": "dateTimePicker",
  "label": "Appointment Time",
  "model": "appointmentDateTime",
  "placeholder": "Select date and time",
  "fieldOptions": {
    "format": "MM/DD/YYYY hh:mm A"
  }
}
```

## Runtime Notes

- The component requires the Bootstrap DateTimePicker library to be loaded globally.
- The field stores the input text value selected in the picker.
- A calendar icon addon is rendered on the right side of the input.

## Full Property Reference

This element is implemented in the sibling `vue-form-generator` source as `fieldDateTimePicker.vue` and uses the Bootstrap DateTimePicker jQuery plugin.
