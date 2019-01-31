# tables2

{% hint style="info" %}
This component is based on [Vue-Tables-2](https://github.com/matfish2/vue-tables-2#readme) Refer to source code for additional documentation.
{% endhint %}

## Keys:

| Additional Keys | Type | Description |
| ---: | :---: | :--- |
| `model` | _string_ | The key of an array in your data model containing the data to display in the table |
| `options` | _object_ | Various options as defined in the source code _\(see link above\)_ |
| `actions_onRowClick` | _array_ | \(optional\) Array of actions to execute when row is clicked |
| `slots` | _array_ | \(optional\) Array of objects, allows insertion of HTML content _\(see below\)_ |

### Slots Example

Add the `slots` key to this element to define HTML regions to be displayed with the table. The `slot` key within each object defines the name of the slot, which can be referenced in the `columns` key.

If you name a slot `child_row`, that HTML content will be displayed when the row of the table is expanded.

```yaml
"columns": ["name", "title", "slot_name"],
"slots": [{
    "html": "<h1>{{model.title}}</h1>",
    "slot": "title"
}, {
    "html": "<h6>{{model.description}}</h6>",
    "slot": "slot_name"
}, {
    "html": "{{props.row.productList}}",
    "slot": "child_row"
}]
```

{% hint style="info" %}
When referencing row data within slots, use `props.row` instead of the usual `model` keyword.
{% endhint %}

