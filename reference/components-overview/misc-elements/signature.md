# signature

The `signature` element is a basic signature capture that is mobile compatible. The captured signature is converted to base 64 and added to the data model.

```yaml
// Signature capture pad
{
    "height": 150,
    "hint": "By signing this form you agree to the terms and conditions as stated somewhere else.",
    "label": "Sign your name ...",
    "model": "signature",
    "required": true,
    "styleClasses": "col-md-6",
    "type": "Signature",
    "validator": "string"
}
```

## Runtime Notes

- The saved value is a data URL string from the canvas, or an empty string when the pad is cleared.
- A built-in **Clear** button is rendered below the signature pad.
- `height` controls the canvas height; the width follows the container width.

