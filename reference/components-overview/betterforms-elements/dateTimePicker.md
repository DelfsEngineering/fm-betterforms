# DateTime Picker Element

The DateTime Picker element allows users to select a date, a time, or both, from a calendar and time selection interface. It simplifies date and time input and reduces entry errors.

In BetterForms, this is used for capturing specific moments, such as appointment times, event dates, or deadlines.

## Common Configuration Properties

| Property                | Type    | Description                                                                                                |
| :---------------------- | :------ | :--------------------------------------------------------------------------------------------------------- |
| `type`                  | `String`| Must be set to `"dateTimePicker"`.                                                                         |
| `label`                 | `String`| The label for the date/time picker field.                                                                    |
| `model`                 | `String`| The key in your BetterForms data model where the selected date/time (as an ISO 8601 string) will be stored. |
| `placeholder`           | `String`| Placeholder text for the input field.                                                                      |
| `disabled`              | `Boolean`| If `true`, the picker will be visible but not interactive. Defaults to `false`.                            |
| `required`              | `Boolean`| If `true`, a value must be selected. Defaults to `false`.                                                  |
| `hint`                  | `String`| Additional helper text.                                                                                    |
| `styleClasses`          | `String` / `Array` | CSS classes for styling the wrapper.                                                                       |
| `dateTimePickerOptions` | `Object`| **Crucial property.** An object containing options for the underlying `vue-datetime` component. See examples. |

### `dateTimePickerOptions` common settings:

| Option          | Type   | Description                                                                                                                                 |
| :-------------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `type`          | `String` | Type of picker: `"date"` (default), `"datetime"`, or `"time"`.                                                                              |
| `format`        | `String` | Display format for the date/time (uses Luxon tokens). E.g., `"YYYY-MM-DD hh:mm a"`.                                                            |
| `valueZone`     | `String` | Timezone of the value stored in the model (e.g., `"UTC"`, `"local"`). It's often best to store dates in UTC.                                 |
| `zone`          | `String` | Timezone for displaying the date/time to the user (e.g., `"local"`, specific IANA timezone like `"America/New_York"`). Defaults to `"local"`.      |
| `minDatetime`   | `String` | The minimum allowed date/time in ISO 8601 format (e.g., `"2023-01-01T00:00:00.000Z"`).                                                        |
| `maxDatetime`   | `String` | The maximum allowed date/time in ISO 8601 format.                                                                                           |
| `inputClass`    | `String` | CSS class to apply directly to the input field within the picker.                                                                           |
| `auto`          | `Boolean`| If `true`, the calendar will close after selecting a date/time.                                                                               |

### Example Schema Snippet (Date & Time)

```json
{
  "type": "dateTimePicker",
  "label": "Appointment Time",
  "model": "appointmentDateTime",
  "placeholder": "Select date and time",
  "required": true,
  "dateTimePickerOptions": {
    "type": "datetime",
    "valueZone": "UTC",
    "zone": "local",
    "format": "MM/DD/YYYY hh:mm a",
    "minDatetime": "2024-01-01T00:00:00.000Z"
  }
}
```

## BetterForms Specific Notes

*   The value stored in the `model` is typically an ISO 8601 formatted string.
*   Properly configuring `valueZone` (for storage) and `zone` (for display) is important for handling timezones correctly, especially if your users or data span multiple timezones.

## Full Property Reference

This element utilizes the `vue-datetime` component. For a comprehensive list of all `dateTimePickerOptions` and detailed technical specifications, please refer to:
*   [VFG dateTimePicker Field Documentation](https://vue-generators.gitbook.io/vue-generators/fields/optional-fields/datetimepicker)
*   [vue-datetime Library Documentation](https://github.com/mariomka/vue-datetime) (for props like `week-start`, `minute-step`, etc.) 
