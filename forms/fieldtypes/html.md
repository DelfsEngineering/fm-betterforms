## html - Custom HTML

`html` Allows you to merge any HTML and inline CSS into your form layout. HTML source data can be in either \(or both\) the data `model` or the field `scmema`

| Key | Value\(s\) | Type | Description |
| :--- | :--- | :--- | :--- |
| type | html | string |  |
| html |  | string | raw HTML. if both a model and body code are supplied, the body code goes first. |
| model |  | string | raw HTML code |
| dataModelScope | {optional} | string |if defined, the scope of the `model` object within the html will root to this data model path. This is used when you are building things that edit other things and want live data rendering. This is used in the HTML builder page of the admin site. |

##### 

##### Example

```
// you can use either body or model or both keys for HTML source code

{
  "html": "<h1>This is some HTML</h1> It will display ahead of the model HTML",
  "model": "mySourceHtml",
  "type": "html"
},
```

### Injecting VueJS syntax

### Formatting Date and Time with `Moment`

`{{moment().format() }}`  
[https://momentjs.com/docs/](https://momentjs.com/docs/)



### Formatting numbers will \`numeral.js\`

`{{numeral().format() }}`

http://numeraljs.com/\#format



