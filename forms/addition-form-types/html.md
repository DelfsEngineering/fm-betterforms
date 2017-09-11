## html - Custom HTML 

`html` allows you to merge any HTML and inline CSS into your form layout. HTML source data can be in either \(or both\) the data `model` or the field `scmema`



| Key | Value\(s\) | Type | Description |
| :--- | :--- | :--- | :--- |
| type | html | string |  |
| body |   | string | raw HTML. if both a model and body code are supplied, the body code goes first. |
| model |  | string | raw HTML code |
| schema | { ... } | object | the schema object follows the same construct as schema of its parent. It only needs to contain a _**fields**_ array. |

##### 

##### Example

```
{
  "body": "<h1>This is some HTML</h1>",
  "model": "mySourceHtml",
  "type": "html"
},
```

