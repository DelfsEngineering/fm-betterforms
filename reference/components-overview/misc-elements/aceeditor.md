# Plain Text / Code Editor

The `aceeditor` element is great for editing HTML, CSS, JSON, or any other type of code in your app. This is the same element that is used by throughout the BetterForms interface.

| Key | Value\(s\) | Type | Description |
| ---: | :---: | :---: | :--- |
| `type` | `aceeditor` | _string_ |  |
| `lang` |  | _string_ | code language options: html, javascript, markdown, plain\_text, css, json |
| `model` |  | _string, object or array_ | the field or JSON node of the model used for the source |
| `getAsJSON` | _optional_ | _boolean_ | if true, the model is stringified for editing. This allows you to edit the JSON directly in the MODEL \(vs it being stored as a string \(all other languages\) |
| `height` | _optional_ | _string_ | default of 700px else element height can be specified `300px`, `70%` are valid values. |
| `theme` | _optional_ | _string_ | The theme used in the editor |
| `readOnly` | _optional_ | _boolean_ | If true, the editor content cannot be edited. |
| `foldDepth` | _optional_ | _number_ | Applies code folding when the editor first loads. |
| `gutterclick` | _optional_ | _function_ | Callback fired when the gutter is clicked and the current line can be parsed as a JSON key/value pair. |

Notes:

- Supported languages in the component include `html`, `javascript`, `markdown`, `plain_text`, `css`, and `json`.
- Built-in themes loaded by BetterForms include `chrome`, `solarized_light`, and `dracula`.
- When `getAsJSON` is `true`, the editor reads and writes the model as parsed JSON rather than a plain string.

## Example

```yaml
// Sample JSON editor ( will put stringified json text into the model field )
{
  "getAsJSON": false,
  "height": "500px",
  "label": "EDIT Some JSON",
  "lang": "json",
  "model": "sourceCode",
  "styleClasses": "col-md-12",
  "type": "aceeditor"
}
```

