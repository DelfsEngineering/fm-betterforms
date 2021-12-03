# tables2

{% hint style="info" %}
This component is based on [Vue-Tables-2](https://github.com/matfish2/vue-tables-2#readme) Refer to source code for additional documentation.
{% endhint %}

## Additional keys:

| Additional Keys | Type | Description |
| ---: | :---: | :--- |
| `model` | _string_ | The key of an array in your data model containing the data to display in the table |
| `options` | _object_ | Various options as defined in the source code _\(see link above\)_ |
| `actions_onRowClick` | _array_ | \(optional\) Array of actions to execute when row is clicked |
| `slots` | _array_ | \(optional\) Array of objects, allows insertion of HTML content _\(see below\)_ |

## Slots Example

Add the `slots` key to this element to define HTML regions to be displayed with the table. The `slot` key within each object defines the name of the slot, which can be referenced in the `columns` key.

If you name a slot `child_row`, that HTML content will be displayed when the row of the table is expanded. _\(see CSS trick_ [_below_](https://delfs-engineering.gitbook.io/betterforms/usage/formsoverview/components-overview/tables2#child-rows) _for how to customize the look of the child row icon\)_

```yaml
"columns": ["name", "title", "slot_name", "button_slot"],
"slots": [{
    "html": "<h1>{{model.title}}</h1>",
    "slot": "title"
}, {
    "html": "<h6>{{model.description}}</h6>",
    "slot": "slot_name"
}, {
    "html": "<button class=\"btn btn-info\" v-on:click=\"namedAction('myNamedAction'; {row: props.row})\"><i class=\"fa fa-check\"></i> OK</button>",
    "slot": "button_slot"
}, {
    "html": "{{props.row.productList}}",
    "slot": "child_row"
}]
```

{% hint style="info" %}
When referencing row data within slots, use `props.row` instead of the usual `model` keyword.
{% endhint %}

## Slots

Slots allow you to insert you own custom HTML in predefined positions within the component Slots with respect the BF Forms render engine and render VueJS code also:

* `beforeTable`: Before the table wrapper. After the controls row
* `afterTable`: Before the table wrapper.
* `beforeFilter`: Before the global filter \(`filterByColumn: false`\)
* `afterFilter`: After the global filter
* `beforeLimit`: Before the per page control
* `afterLimit`: After the per page control
* `beforeFilters`: Before the filters row \(`filterByColumn: true`\)
* `afterFilters`: After the filters row
* `beforeBody`: Before the `<tbody>` tag
* `afterBody`: After the `<tbody>` tag
* `prependBody`: Prepend to the `<tbody>` tag
* `appendBody`: Append to the `<tbody>` tag

If a slot has the same name as a column, it will replace the columns contents. You can class the rows object \(data object for that row\) via `model.row.myField`

## Accessing Data in slots

### row

Each rows data can be found in the `props.row` variable when using custom html slots.

eg: `{{props.row.nameFirst}}` would render the first name field

### data model

Sometimes you may want to reference the parent data model \(The model that was used for the form, or the container element\). You can reference to parents data model with the variable `model`

eg: `{{model.isLocked}}` would render the isLocked field in the parent data model

## Child Rows

Add the following CSS to your site to change how the icon to open or close the child row

```css
.VueTables__child-row-toggler {

    width: 16px;

    height: 16px;

    line-height: 16px;

    display: block;
    margin: auto;

    text-align: center;
}



.VueTables__child-row-toggler--closed::before {
    content: "►";
}

.VueTables__child-row-toggler--open::before {

    content: "▼";
}
```

## Interacting with the Table \( Row Click Actions\)

**actions\_onRowClick**

Table2 supports `actions_onRowClick` actions. This allows you to programatically control what happens when a user clicks an row.

The following is an example that will pas the key `id` from the table row into the URN

```text
"actions_onRowClick": [{
   "action": "path",
   "options": {
      "path_calc": "'/sitedetail?id=' + this.params.row.id"
    }
  ]
```

This key can be retrieved in the `onFormRequest` script as follows:

`Set Variable $id = JSONGetElement ( $$BF_Query ; "id" )`

\`\`

