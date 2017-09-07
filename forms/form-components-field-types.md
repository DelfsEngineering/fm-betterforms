# Form Components \(Field Types\)

In additional to regular field type there are several custom types.

![](/assets/Screen Shot 2017-09-06 at 11.39.51 PM.png)

## vTab - Vertical Tabs

Tabs give you the ability to contain repeating records \(tab\) of data and allow the user to add additional tabs.

| Key | Type | Description |
| :--- | :--- | :--- |
| tabLabelModel | string | Point this to the data model.field. It will be used to display on the tab. |
| max | number | {optional} The maximum number of tabs the user is allowed to create. |
| model | array | the data model must be initialized as an array. '_**\[  \]'**_ |
| schema | object | the schema object follows the same construct as schema of its parent. It only needs to contain a _**fields**_ array.  |

## Accordion



