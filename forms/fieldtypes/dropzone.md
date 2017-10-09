## dropzone - File Uploading 

`dropzone` Allows you to easily add a drag and drop file upload component to any form. Files are posted to any upload service such as [file.io](https://www.file.io/#one) and [uploadcare](https://uploadcare.com). The data model is passed back all relevant meta information.  


| Key | Value\(s\) | Type | Description |
| :--- | :--- | :--- | :--- |
| type | dropzone | string |  |
| model |   | string | raw HTML. if both a model and body code are supplied, the body code goes first. |
| model |  | string | raw HTML code |
| options | { ... } | object | object of additional options. These will override defaults. |

##### 

### Minimal Usage Eample

```
{
  "label": "Upload File(s)",
  "model": "files",
  "styleClasses": "col-md-8",
  "type": "dropzone",
  "options": {	
    // all additional items and overrides go here
  } 
}
```
