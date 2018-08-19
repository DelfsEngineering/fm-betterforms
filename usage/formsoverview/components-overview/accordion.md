# accordion

The accordion allows collapsable data rows, much like a portal.

| Key | Type | Description |
| :--- | :--- | :--- |
| tabLabelModel | string | Point this to the data model.field. It will be used to display on the tab. |
| min | number | {optional} The minimum number of tabs the user is allowed to create. The delete icon will had when this number is reached. |
| max | number | {optional} The maximum number of tabs the user is allowed to create. The add icons will hide when this number is reached. |
| model | array | the data model must be initialized as an array. '_**\[ \]'**_ |
| schema | object | the schema object follows the same construct as schema of its parent. It only needs to contain a _**fields**_ array. |
| defaultModel | object | when provided will be used to populate browser side created rows. |
| bfId | object | a BetterForms UUID is generated and added to all browser side created records to help in post processing |

## Notes

Set the min and max values to the same number to permanently hide the add and delete icons. Data within your data models array will still render rows accordingly.

