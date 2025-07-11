# Cleave.js Input Masking Element

The Cleave.js element provides formatted input masks for various types of data, such as phone numbers, credit card numbers, dates, and custom patterns. It enhances user experience by guiding input format and providing immediate visual feedback.

In BetterForms, this element is used when you need to enforce a specific input format for a text field.

**Note:** This element uses `type: "cleave"` in its schema definition, and its masking behavior is controlled by the `cleaveOptions` property.

## Common Configuration Properties

| Property        | Type    | Description                                                                                              |
| :-------------- | :------ | :------------------------------------------------------------------------------------------------------- |
| `type`          | `String`| Must be set to `"cleave"`. The Cleave.js functionality is activated by the presence of `cleaveOptions`.        |
| `label`         | `String`| The label for the input field.                                                                           |
| `model`         | `String`| The key in your BetterForms data model where the (potentially unmasked) input value will be stored.        |
| `placeholder`   | `String`| Placeholder text.                                                                                        |
| `disabled`      | `Boolean`| Disables the input.                                                                                      |
| `readonly`      | `Boolean`| Makes the input read-only.                                                                               |
| `hint`          | `String`| Helper text.                                                                                             |
| `required`      | `Boolean`| Marks the field as required.                                                                               |
| `styleClasses`  | `String` / `Array` | CSS classes for styling.                                                                                 |
| `cleaveOptions` | `Object`| **Crucial property.** An object containing options for Cleave.js. See examples and VFG docs for details. |

### Example: Phone Number Mask

```json
{
  "type": "cleave",
  "label": "Phone Number",
  "model": "phoneNumber",
  "placeholder": "(999) 999-9999",
  "cleaveOptions": {
    "phone": true,
    "phoneRegionCode": "US"
  }
}
```

### Example: Date Mask (YYYY-MM-DD)

```json
{
  "type": "cleave",
  "label": "Date of Birth",
  "model": "dob",
  "placeholder": "YYYY-MM-DD",
  "cleaveOptions": {
    "date": true,
    "datePattern": ["Y", "m", "d"],
    "delimiter": "-"
  }
}
```

### Example: Credit Card

```json
{
  "type": "cleave",
  "label": "Credit Card Number",
  "model": "creditCardNum",
  "cleaveOptions": {
    "creditCard": true
  }
}
```

## BetterForms Specific Notes

*   The actual value stored in the `model` might be the raw, unmasked value or the masked value depending on Cleave.js settings and how BetterForms handles it. Refer to specific BetterForms behavior if this is critical.
*   The `cleaveOptions` object is powerful and has many sub-properties (`numeral`, `blocks`, `delimiters`, `prefix`, etc.) for custom formatting. It's highly recommended to consult the official Cleave.js documentation for advanced patterns.

## Full Property Reference

This element leverages the Cleave.js library. For a comprehensive list of all `cleaveOptions` and detailed technical specifications, please refer to:
*   [VFG Cleave Field Documentation](https://vue-generators.gitbook.io/vue-generators/fields/optional-fields/cleave)
*   [Official Cleave.js Documentation](https://nosir.github.io/cleave.js/) 
