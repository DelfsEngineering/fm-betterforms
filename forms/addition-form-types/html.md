## html - Custom HTML 

`html` allows you to merge any HTML and inline CSS into your form layout. HTML source data can be in either (or both) the data `model` or the field `scmema` 

| Key | Value\(s\) | Type | Description |
| :--- | :--- | :--- | :--- |
| type | html | string |  |
| tabLabelModel |  | string | Point this to the data model.field. It will be used to display on the tab. |
| max |  | number | {optional} The maximum number of tabs the user is allowed to create. |
| model |  | array | the data model must be initialized as an array. \[ \] |
| schema | { ... } | object | the schema object follows the same construct as schema of its parent. It only needs to contain a _**fields**_ array. |

## Accordion

This is some text

# This

## this is h2



