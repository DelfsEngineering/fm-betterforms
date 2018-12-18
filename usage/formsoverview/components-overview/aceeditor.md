# aceeditor

`aceeditor` Allows you to merge any HTML and inline CSS into your form layout. HTML source data can be in either \(or both\) the data `model` or the field `scmema`

| Key | Value\(s\) | Type | Description |
| :--- | :--- | :--- | :--- |
| type | aceeditor | string |  |
| lang |  | string | code language options: html, javascript, markdown, plain\_text, css, json |
| model |  | string, object or array | the field or JSON node of the model used for the source |
| getAsJSON | _optional_ | boolean | if true, the model is stringified for editing. This allows you to edit the JSON directly in the MODEL \(vs it being stored as a string \(all other languages\) |
| height | _optional_ | string | default of 700px else element height can be specified '300px', '70%' are valid values. |

TODO add support for options {}

## Example

```yaml
// Sample JSON editor ( will put stringified text into the model field
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

