# Handling Data

### Preparing Data

### asJSON

**TODO** information on how and why `asJSON` calcs are used

### Fetching Data

Gathering and compiling a JSON based data oject from a found set of FM records can be challenging. as costly in compute cycles. We reccomend using some of the provided custom functions that are installed when you integrate FM BetterForms into your app.

`getColumn` Is a CF that wraps and execute SQL statement at its core. It returns a list of field results \(first arg\) when the 2nd arg is equal to the 3rd arg. This is great for returning a single record too and thats how it works best for BF. 

`getColumnAsArray` is simular to `getColumn` but is design to return a JSON array of the found records. The returned object is an JSON Array and works perfectly for any BF element that renders repeating data \( Data tables, ListRow's etc.

### Writing Data

There are two apprioaches to writing returned data from BF. Single records and Arrays.

#### Single Record Writes

When possible it is much easier and more readable to create code that writes single records at a time. This requires you UI to also account for this. Basically, from an array of records you select a single record and dispaly that. The user edits the data and triggers a save action. This hook will have the UID for the record and you can simply find the record and make the changes and commit it. The finding of the record can allso be handled with a Select-Connector style design pattern. \(Just the selector is needed\). 

#### Multiple Record Writes

If your UI gives the user the ability to made data changes to multiple records at a time \( eg: a list with a checkboxes and the use picks several records to check\) then you will need to loop over the returned array of data and find and mutate each record. For these scenarios, the Select design approach is the easiest. This also has teh benefit making the write a single transaction.

#### New Record vs Edit Record

Many interfaces have the ability to create a new record as well as edit an existing reocrd. A simple design approach that works nicely with BF is to use the same code and layout \(form\) that saves an existing reocrd to create the new record. If you are editing an exisitng record then there will already abe a UID in the data model for the record. The presence of this can be used to tell your script whether to create aa new record or edit an exisitng one. Again, the selector design pattern can handle this automatically.





