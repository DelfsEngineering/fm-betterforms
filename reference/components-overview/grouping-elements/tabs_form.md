---
description: Organize complex forms using a standard tab element
---

# Tabs

## Tab Modes

A tabs element can be constructed in either **Data Mode** or **Form Mode**. **Form mode** allows you to define each tab individually as its own form, very similar to how a tab element would work in FileMaker. **Data Mode** takes an array of data and generates a tab for each item in the array, with identical elements in each tab containers.

* To use Data Mode, set `"type": "vtabs"`
* To use Form Mode set `"type": "tabs_form2"` (preferred) or `"type": "tabs_form"`

Otherwise, all other parts of this page apply to both modes.

Additional Keys

|                       | Type          | Description                                                                   |
| --------------------- | ------------- | ----------------------------------------------------------------------------- |
| onTabClicked\_actions | actions array | this key accepts an array of actions that are executed when a tab is clicked. |

## Form Mode style classes (`tabs_form2`)

These keys control CSS classes on different parts of the tabs element. They are part of **basecode** (available to all apps once that basecode version is deployed).

| Key | Level | Description |
| --- | --- | --- |
| `styleClasses` | field | Classes on the outer VFG form-group around the tabs field. |
| `styleClassesWrapper` | field | Classes on the outer tab wrapper (`wrapper tab-wrapper panel panel-default` by default). **Overwrites** the default classes when set; omit to keep legacy defaults. Use this for height/flex layout (e.g. `flex flex-col flex-1 h-full`). *Available in basecode v3.5.58+*. |
| `styleClassesTabs` | field | Classes on the `<ul>` that wraps all tab labels. |
| `styleClassesTab` | field or tab | Classes on each tab label (`<li>`). Per-tab value overrides the field default. |
| `styleClassesTabActive` | field or tab | Classes added to the active tab label. Per-tab value overrides the field default. |
| `styleClassesBody` | field | Classes on the tab content container around the panes. |
| `styleClasses` | tab | Classes on that tab’s inner pane (`vue-form-generator`). Set on each object inside the tabs `schema` array. |
| `align` | field | Adds `tab-top`, `tab-left`, etc. on the wrapper (separate from `styleClassesWrapper`). |

### Height / flex tip

To make tabs fill parent height, put flex/height classes on the wrapper:

```json
{
  "type": "tabs_form2",
  "styleClasses": "h-full mb-0 relative",
  "styleClassesWrapper": "flex flex-col flex-1 h-full",
  "styleClassesBody": "flex flex-col flex-1 p-2 mb-0",
  "align": "top",
  "schema": [
    {
      "tabLabel": "Model",
      "styleClasses": "flex-1 h-full",
      "fields": []
    }
  ]
}
```

Vertical Tabs give you the ability to contain repeating records (tab) of data and allow the user to add additional tabs.

v-tab's can contain full form schema. This means you can build forms within forms!

!["Tabs Element"](<../../../.gitbook/assets/screen-shot-2017-09-06-at-11.39.51-pm (1).png>)

| Key           | Type   | Description                                                                                                                |
| ------------- | ------ | -------------------------------------------------------------------------------------------------------------------------- |
| tabLabelModel | string | Point this to the data model.field. It will be used to display on the tab.                                                 |
| min           | number | {optional} The minimum number of tabs the user is allowed to create. The delete icon will had when this number is reached. |
| max           | number | {optional} The maximum number of tabs the user is allowed to create. The add icons will hide when this number is reached.  |
| model         | array  | the data model must be initialized as an array. '_**\[ ]'**_                                                               |
| schema        | object | the schema object follows the same construct as schema of its parent. It only needs to contain a _**fields**_ array.       |

### Notes

Set the min and max values to the same number to permanently hide the add and delete icons. Data within your data models array will still render rows accordingly.

```yaml
// typical v-tab object
// DATA MODE

{
  "hint": "You can set the 'max' property to limit number of records",
  "label": "Enter Some Contacts (4 max)",
  "min": 1,
  "max": 4,
  "model": "contacts",
  "schema": {
    "fields": [
      {
        "label": "First Name",
        "model": "nameFirst",
        "styleClasses": "col-md-6",
        "fieldOptions": {
          "inputType": "text"
        },
        "type": "input"
      },
      {
        "label": "Last Name",
        "model": "nameLast",
        "styleClasses": "col-md-6",
        "fieldOptions": {
          "inputType": "text"
        },
        "type": "input"
      },
      {
        "label": "Street 1",
        "model": "street1",
        "styleClasses": "col-md-12",
        "fieldOptions": {
          "inputType": "text"
        },
        "type": "input"
      }
    ]
  },
  "styleClasses": "col-md-8",
  "tabLabelModel": "nameFirst",
  "type": "vtabs"
}
```
