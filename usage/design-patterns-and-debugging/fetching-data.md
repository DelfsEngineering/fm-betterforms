# Handling Data

## Preparing Data

## asJSON

**TODO** information on how and why `asJSON` calcs are used

## Fetching Data

Gathering and compiling a JSON based data object from a found set of FM records can be challenging. as costly in compute cycles. We recommend using some of the provided custom functions that are installed when you integrate FM BetterForms into your app.

`getColumn` Is a CF that wraps and execute SQL statement at its core. It returns a list of field results \(first arg\) when the 2nd arg is equal to the 3rd arg. This is great for returning a single record too and thats how it works best for BF.

`getColumnAsArray` is simular to `getColumn` but is design to return a JSON array of the found records. The returned object is an JSON Array and works perfectly for any BF element that renders repeating data \( Data tables, ListRow's etc.

#### Complex Finds

On some rare occasions you may need to perform more complex finds. In this case, FileMaker's find commands will serve you best. Add a `summaryAsJSON`  field to your table that is a _summary_ field type with the option `List of` pointing to the `asJSON` calculation. 

This will return a found set _list_ of the \`asJSON\` results. This field is not true JSON and you will need to convert the line returns to commas and make it an array with square braces to form a proper JSON array.

```text
// Example to convert a list of asJSON to true JSON
JSONFormatElements ( 
"[" & Substitute ( People::summaryAsJSON ; ¶ ; "," ) & "]"
)
```

### Writing Data

There are two approaches to writing returned data from BF. Single records and Arrays.

### Single Record Writes

When possible it is much easier and more readable to create code that writes single records at a time. This requires you UI to also account for this. Basically, from an array of records you select a single record and display that. The user edits the data and triggers a save action. This hook will have the UID for the record and you can simply find the record and make the changes and commit it. The finding of the record can also be handled with a Select-Connector style design pattern. \(Just the selector is needed\).

### Multiple Record Writes

If your UI gives the user the ability to made data changes to multiple records at a time \( eg: a list with a checkboxes and the use picks several records to check\) then you will need to loop over the returned array of data and find and mutate each record. For these scenarios, the Select design approach is the easiest. This also has the benefit making the write a single transaction.

### New Record vs Edit Record

Many interfaces have the ability to create a new record as well as edit an existing record. A simple design approach that works nicely with BF is to use the same code and layout \(form\) that saves an existing record to create the new record. If you are editing an existing record then there will already be a UID in the data model for the record. The presence of this can be used to tell your script whether to create aa new record or edit an existing one. Again, the selector design pattern can handle this automatically.

