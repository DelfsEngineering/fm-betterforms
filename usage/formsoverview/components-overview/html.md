# html

`html` Allows you to merge any HTML and inline CSS into your form layout. HTML source data can be in either \(or both\) the data `model` or the field `scmema`

| Key | Value\(s\) | Type | Description |
| :--- | :--- | :--- | :--- |
| type | html | string |  |
| html |  | string | raw HTML. if both a model and \`html\` code are supplied, the \`html\` code goes first. |
| model |  | string | raw HTML \(VueJS\) code |
| dataModelScope | {optional} | string | if defined, the scope of the `model` object within the html will root to this data model path. This is used when you are building things that edit other things and want live data rendering. This is used in the HTML builder page of the admin site. |

### Example

```text
// you can use either body or model or both keys for HTML source code

{
  "html": "<h1>This is some HTML!</h1> It will display ahead of the model HTML",
  "model": "mySourceHtml",
  "type": "html"
},
```

## Injecting VueJS syntax

You can harness the full power of VueJS the html rendering engine inside of BetterForms but simply adding Vue html syntax into your `HTML` code.

**Things you can do using VueJS Syntax:**

* Render merged data from the `data` model. Eg: `My name is {{ modelnameFirst }}.`
* Build tables and other repeating data.
* Execute all actions and pass data to those actions.

## Formatting Date and Time with `MomentJS`

MomentJS is a super powerful library you can access to format data and times.

`{{moment().format() }}`

See: [https://momentjs.com/docs/](https://momentjs.com/docs/)

## Formatting numbers with `MomentJS`

Numeral is like moment but for numbers, currency.

`{{numeral().format() }}`

See: [http://numeraljs.com/\#format](http://numeraljs.com/#format)

