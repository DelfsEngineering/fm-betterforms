# panel

`panel` allows better organization of fields and data. Panel elements can hold other BF elements. 

| Key | Value\(s\) | Type | Description |
| ---: | :--- | :---: | :--- |
| `type` | panel | _string_ |  |
| `model` |  | _object_ | unused |
| `title` | _text_ | _string_ | Text string that will appear at the top of the panel |
| `footer` | _text_ | _string_ | Text that appears at the bottom of the footer. |
| `schema` | {} | _object_ | Contains nested form schema |
| `schema.fields` | \[\] | _array_ | Field elements to appear inside the panel |
| `isOpen` |  | _boolean_ | The current state of the panels display |
| `credentials` | {} | _object_ | credential object |
| `isForm` |  | _boolean_ | Defines the panel as a form. [Learn more](../../form-settings/misc-page-settings.md#isform) |

### Reference

```yaml
// sample panel object
{
  "schema": {
    "fields": [
      {
        "inputType": "text",
        "label": "My Input",
        "model": "field1",
        "styleClasses": "col-md-12",
        "type": "input"
      }
    ]
  },
  "slots": [],
  "styleClasses": "col-md-6",
  "type": "panel"
}
```

### 

