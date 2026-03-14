# Input Element

The live `input` field is the standard single-line field for text, numbers, dates, email, passwords, and similar browser input types.

## Common Configuration Properties

| Property | Type | Description |
| :-- | :-- | :-- |
| `type` | `String` | Must be `"input"` |
| `label` | `String` | Field label |
| `model` | `String` | Model key that stores the value |
| `placeholder` | `String` | Placeholder text |
| `disabled` | `Boolean` | Disables the field |
| `readonly` | `Boolean` | Makes the field read-only |
| `required` | `Boolean` | Marks the field as required |
| `styleClasses` | `String` / `Array` | CSS classes for the field wrapper |
| `fieldOptions` | `Object` | V3+ input configuration, including `inputType` and standard input attributes |

## `fieldOptions`

The live V3+ field reads its HTML input configuration from `fieldOptions`.

Common keys include:

| Key | Type | Description |
| :-- | :-- | :-- |
| `inputType` | `String` | Browser input type such as `text`, `password`, `email`, `number`, `url`, `tel`, `date`, `datetime-local`, `color`, or `range` |
| `autocomplete` | `String` | Browser autocomplete mode |
| `min` | `Number` / `String` | Minimum value for numeric/date-like inputs |
| `max` | `Number` / `String` | Maximum value for numeric/date-like inputs |
| `step` | `Number` / `String` | Step increment for numeric/range inputs |
| `maxlength` | `Number` | Maximum length for text-like inputs |
| `minlength` | `Number` | Minimum length for text-like inputs |
| `pattern` | `String` | HTML input pattern |
| `accept` | `String` | Accepted file types when using file-style inputs |

## Example Schema Snippet

```json
{
  "type": "input",
  "label": "Full Name",
  "model": "fullName",
  "placeholder": "Enter your full name",
  "required": true,
  "hint": "Please provide your first and last name.",
  "fieldOptions": {
    "inputType": "text",
    "maxlength": 100
  }
}
```

## Number Input Example

```json
{
  "type": "input",
  "label": "Quantity",
  "model": "itemQuantity",
  "default": 1,
  "hint": "Enter a number between 1 and 100.",
  "fieldOptions": {
    "inputType": "number",
    "min": 1,
    "max": 100,
    "step": 1
  }
}
```

## Runtime Notes

- `fieldOptions.inputType` is the canonical V3+ shape. BetterForms can migrate legacy top-level `inputType`, but docs should prefer `fieldOptions`.
- For `number` and `range`, the field parses user input into numeric values.
- For `date`, `datetime`, and `datetime-local`, the field applies date parsing and formatting logic before writing back to the model.
- If `schema.format` is supplied for date-like input types, it is used when formatting the stored value.

## Full Property Reference

This element is implemented in the sibling `vue-form-generator` source as `fieldInput.vue`.