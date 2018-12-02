# vtab,

Vertical Tabs give you the ability to contain repeating records \(tab\) of data and allow the user to add additional tabs.

v-tab's can contain full form schema. This means you can build forms within forms!

![](../../.gitbook/assets/screen-shot-2017-09-06-at-11.39.51-pm.png)

| Key | Type | Description |
| :--- | :--- | :--- |
| tabLabelModel | string | Point this to the data model.field. It will be used to display on the tab. |
| min | number | {optional} The minimum number of tabs the user is allowed to create. The delete icon will had when this number is reached. |
| max | number | {optional} The maximum number of tabs the user is allowed to create. The add icons will hide when this number is reached. |
| model | array | the data model must be initialized as an array. '_**\[  \]'**_ |
| schema | object | the schema object follows the same construct as schema of its parent. It only needs to contain a _**fields**_ array. |

### Notes

Set the min and max values to the same number to permanently hide the add and delete icons. Data within your data models array will still render rows accordingly.

```text
// typical v-tab object

{
  "hint": "You can set the 'max' property to limit number of records",
  "label": "Enter Some Contacts (4 max)",
  "min": 1,
  "max": 4,
  "model": "contacts",
  "schema": {
    "fields": [
      {
        "inputType": "text",
        "label": "First Name",
        "model": "nameFirst",
        "styleClasses": "col-md-6",
        "type": "input"
      },
      {
        "inputType": "text",
        "label": "Last Name",
        "model": "nameLast",
        "styleClasses": "col-md-6",
        "type": "input"
      },
      {
        "inputType": "select",
        "label": "Street 1",
        "model": "street1",
        "styleClasses": "col-md-12",
        "type": "input"
      }
    ]
  },
  "styleClasses": "col-md-8",
  "tabLabelModel": "nameFirst",
  "type": "vtabs"
}
```

## Accordion

