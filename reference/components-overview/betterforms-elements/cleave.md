# Cleave.js Input Masking Element

The Cleave.js element provides formatted input masks for various types of data, such as phone numbers, credit card numbers, dates, and custom patterns. It enhances user experience by guiding input format and providing immediate visual feedback.

In BetterForms, this element is used when you need to enforce a specific input format for a text field.

**Note:** This element uses `type: "cleave"` in its schema definition, and its masking behavior is controlled by `fieldOptions`.

## Common Configuration Properties

| Property        | Type    | Description                                                                                              |
| :-------------- | :------ | :------------------------------------------------------------------------------------------------------- |
| `type`          | `String`| Must be set to `"cleave"`. The Cleave.js functionality is configured through `fieldOptions`.        |
| `label`         | `String`| The label for the input field.                                                                           |
| `model`         | `String`| The key in your BetterForms data model where the (potentially unmasked) input value will be stored.        |
| `placeholder`   | `String`| Placeholder text.                                                                                        |
| `disabled`      | `Boolean`| Disables the input.                                                                                      |
| `readonly`      | `Boolean`| Makes the input read-only.                                                                               |
| `hint`          | `String`| Helper text.                                                                                             |
| `required`      | `Boolean`| Marks the field as required.                                                                               |
| `styleClasses`  | `String` / `Array` | CSS classes for styling.                                                                                 |
| `fieldOptions` | `Object`| **Crucial property.** Options passed directly into `new Cleave(...)`. |

### Example: Phone Number Mask

```json
{
  "type": "cleave",
  "label": "Phone Number",
  "model": "phoneNumber",
  "placeholder": "(999) 999-9999",
  "fieldOptions": {
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
  "fieldOptions": {
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
  "fieldOptions": {
    "creditCard": true
  }
}
```

## BetterForms Specific Notes

*   The live field writes back `cleave.properties.result` when available, or falls back to the input's current value.
*   If you omit settings, the component supplies defaults such as `phoneRegionCode: "AU"`, `datePattern: ["d", "m", "Y"]`, `delimiter: " "`, and `numeralDecimalScale: 2`.
*   `fieldOptions` supports the standard Cleave.js configuration keys such as `creditCard`, `phone`, `date`, `numeral`, `blocks`, `delimiter`, `prefix`, `uppercase`, and `lowercase`.

## Full Property Reference

This element leverages the Cleave.js library. For the available `fieldOptions`, refer to:
*   [VFG Cleave Field Documentation](https://vue-generators.gitbook.io/vue-generators/fields/optional-fields/cleave)
*   [Official Cleave.js Documentation](https://nosir.github.io/cleave.js/) 
