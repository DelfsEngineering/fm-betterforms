# TextArea Element

The TextArea element provides a multi-line plain-text editing control, suitable for capturing longer pieces of text like comments, descriptions, or detailed notes.

In BetterForms, this is the standard choice when you need users to input more than a single line of text.

## Common Configuration Properties

Below are some of the most common properties used when configuring a TextArea element in BetterForms:

| Property       | Type    | Description                                                                                                |
| :------------- | :------ | :--------------------------------------------------------------------------------------------------------- |
| `type`         | `String`| Must be set to `"textArea"`.                                                                              |
| `label`        | `String`| The text displayed above or next to the textarea to describe its purpose.                                  |
| `model`        | `String`| The key in your BetterForms data model where the textarea's string value will be stored.                     |
| `placeholder`  | `String`| Placeholder text displayed within the textarea when it is empty.                                             |
| `rows`         | `Number`| A hint to the browser for the number of visible text lines.                                                |
| `maxlength`    | `Number`| The maximum number of characters allowed in the textarea.                                                    |
| `disabled`     | `Boolean`| If `true`, the textarea will be visible but not interactive. Defaults to `false`.                            |
| `readonly`     | `Boolean`| If `true`, the textarea content will not be editable. Defaults to `false`.                                   |
| `hint`         | `String`| Additional helper text displayed with the textarea.                                                        |
| `required`     | `Boolean`| If `true`, the form will require this field to have a value for submission. Defaults to `false`.             |
| `featured`     | `Boolean`| Can be used by themes to apply special styling.                                                            |
| `styleClasses` | `String` / `Array` | CSS class(es) to apply to the textarea wrapper for custom styling.                                         |

### fieldOptions

The following options can be placed inside the `fieldOptions` object on the schema:

| Property       | Type     | Description                                                                                                |
| :------------- | :------- | :--------------------------------------------------------------------------------------------------------- |
| `rows`         | `Number` | Number of visible text rows (default `2`).                                                                 |
| `min`          | `Number` | Minimum character length (`minlength` attribute).                                                          |
| `max`          | `Number` | Maximum character length (`maxlength` attribute).                                                          |
| `autoExpand`   | `Boolean`| When `true`, the textarea automatically grows taller as the user types so all content is visible without scrolling. Defaults to `false`. |
| `maxHeight`    | `Number` | Optional pixel limit for auto-expansion. Once the content exceeds this height the textarea stops growing and shows a scrollbar instead. Only applies when `autoExpand` is `true`. |

### Example Schema Snippet

```json
{
  "type": "textArea",
  "label": "Additional Comments",
  "model": "userComments",
  "placeholder": "Enter any additional comments here...",
  "rows": 4,
  "maxlength": 500,
  "hint": "Maximum 500 characters."
}
```

### Auto-Expand Example

Use `autoExpand` to make the textarea grow with its content. Add `maxHeight` to cap the expansion at a fixed pixel height:

```json
{
  "type": "textArea",
  "label": "Biography",
  "model": "bio",
  "placeholder": "Tell us about yourself...",
  "fieldOptions": {
    "rows": 4,
    "max": 500,
    "autoExpand": true,
    "maxHeight": 240
  }
}
```

When `autoExpand` is enabled:
- The textarea starts at the height defined by `rows`.
- As the user types and content exceeds the visible area, the textarea grows to fit.
- If `maxHeight` is set (in pixels), the textarea stops growing at that height and a vertical scrollbar appears for any additional content.
- When content is deleted, the textarea shrinks back down automatically.

## BetterForms Specific Notes

*   This element is intended for plain text. If you need rich text editing (WYSIWYG), look for a dedicated rich text editor component in BetterForms or consider integrating one as a custom element.
*   The `min` and `max` properties in the underlying library sometimes refer to character count for textAreas; however, `maxlength` is the more standard HTML attribute for this purpose.
*   **v3.3.0+**: The `autoExpand` and `maxHeight` options were added. These require VFG v3.3.0 or later.

## Full Property Reference

This element is based on a standard form generation library. For a comprehensive list of all available properties, advanced configuration options, and the full technical specification, please refer to the [TextArea Field Documentation](https://vue-generators.gitbook.io/vue-generators/fields/core-fields/textArea). 