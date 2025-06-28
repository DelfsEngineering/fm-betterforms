# Masked Input Element

The Masked Input element allows for controlled text entry by defining a specific format or pattern (mask) that the user must follow. This is useful for inputting data like phone numbers, postal codes, dates, or any other formatted text.

In BetterForms, this element helps ensure data consistency and can improve user experience by guiding data entry. It utilizes the `vue-text-mask` library or a similar masking engine.

## Common Configuration Properties

| Property        | Type    | Description                                                                                                |
| :-------------- | :------ | :--------------------------------------------------------------------------------------------------------- |
| `type`          | `String`| Must be set to `"masked"`.                                                                                 |
| `label`         | `String`| The label for the masked input field.                                                                        |
| `model`         | `String`| The key in your BetterForms data model where the (potentially unmasked) input value will be stored.        |
| `mask`          | `Array` / `Function` / `String` | **Crucial property.** Defines the input mask. Can be an array of characters and regexps (e.g., `['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]`), a function that returns a mask array, or a string for simple masks (support may vary). |
| `placeholder`   | `String`| Placeholder text for the input field, often showing the desired format (e.g., "(___) ___-____").         |
| `guide`         | `Boolean`| If `true` (default), the mask pattern is shown in the input field as the user types. If `false`, it is not. |
| `pipe`          | `Function`| A function that can transform the user's input before it's set to the model.                               |
| `keepCharPositions` | `Boolean`| If `true`, the cursor will try to maintain its position relative to the mask characters.             |
| `disabled`      | `Boolean`| If `true`, the input will be visible but not interactive. Defaults to `false`.                             |
| `readonly`      | `Boolean`| If `true`, the input cannot be edited. Defaults to `false`.                                               |
| `required`      | `Boolean`| If `true`, a value must be entered. Defaults to `false`.                                                  |
| `hint`          | `String`| Additional helper text.                                                                                    |
| `styleClasses`  | `String` / `Array` | CSS classes for styling the wrapper.                                                                       |

### Example Schema Snippet (Phone Number Mask)

```json
{
  "type": "masked",
  "label": "Phone Number",
  "model": "userPhoneNumber",
  "placeholder": "(555) 555-5555",
  "mask": ["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/],
  "guide": true,
  "required": true
}
```

### Example Schema Snippet (Date Mask)

```json
{
  "type": "masked",
  "label": "Date of Birth (MM/DD/YYYY)",
  "model": "userDOB",
  "placeholder": "MM/DD/YYYY",
  "mask": [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/],
  "guide": true
}
```

## BetterForms Specific Notes

*   The actual value stored in the `model` might be the raw input or the masked input depending on the underlying library's behavior and any `pipe` function used. Test to confirm.
*   Complex masking or dynamic masks might require defining the `mask` as a function.
*   This element is excellent for improving data entry accuracy for fixed-format fields.

## Full Property Reference

This element is based on standard Vue Form Generator capabilities, often integrating `vue-text-mask` or a similar library. For detailed technical specifications, and more advanced masking options (like using functions for `mask` or `pipe`), refer to:
*   [VFG Masked Field Documentation](https://vue-generators.gitbook.io/vue-generators/fields/optional-fields/masked)
*   [vue-text-mask Documentation](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme) (for advanced mask features, `pipe`, etc.) 
