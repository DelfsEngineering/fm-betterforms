# accordion2

The accordion allows collapsable data rows, much like a portal.

Accordion2 version adds slots that can replace the row header.&#x20;

<table><thead><tr><th width="205">Key</th><th width="147.33333333333331">Type</th><th>Description</th></tr></thead><tbody><tr><td>bfId</td><td>object</td><td>a BetterForms UUID is generated and added to all browser side created records to help in post processing</td></tr><tr><td>defaultModel</td><td>object</td><td>when provided will be used to populate browser side created rows.</td></tr><tr><td>min</td><td>number</td><td>{optional} The minimum number of tabs the user is allowed to create. The delete icon will had when this number is reached.</td></tr><tr><td>max</td><td>number</td><td>{optional} The maximum number of tabs the user is allowed to create. The add icons will hide when this number is reached.</td></tr><tr><td>model</td><td>array</td><td>the data key the tab row data resides in. <code>model</code> must be initialized as an array. <code>[]</code></td></tr><tr><td>schema</td><td>object</td><td>the schema object follows the same construct as schema of its parent. It only needs to contain a <em><strong>fields</strong></em> array.</td></tr><tr><td>slots</td><td>array</td><td>Array of slot objects. Slot names: <code>tabLabel</code><br><code>`row._index`</code> contains the current rows index</td></tr><tr><td>tabLabelModel</td><td>string</td><td>Point this to the data model.field. It will be used to display on the tab.</td></tr></tbody></table>

### Usage

```
{
                "label": "Enter Some Contacts (min. 1 max 4)",
                "max": 4,
                "min": 1,
                "model": "contacts",
                "slots": [{
                    "html": "This is row:{{row._index +1}}, with the full name: {{model.nameFirst}} {{model.nameLast}}`",
                    "slot": "tabLabel"
                }],
                "schema": {
                    "fields": [{
                        "inputType": "text",
                        "label": "First Name",
                        "model": "nameFirst",
                        "styleClasses": "",
                        "type": "input"
                    },{
                        "inputType": "text",
                        "label": "Last Name",
                        "model": "nameLast",
                        "styleClasses": "",
                        "type": "input"
                    }]
                },
                "styleClasses": "col-md-6",
                "type": "accordion2"
            }
```

## Notes

Set the min and max values to the same number to permanently hide the add and delete icons. Data within your data models array will still render rows accordingly.
