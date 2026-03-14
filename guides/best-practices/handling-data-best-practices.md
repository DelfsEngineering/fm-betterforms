# Handling Data

## Preparing Data

## asJSON

`asJSON` is a common FileMaker-side pattern for exposing records to BetterForms as structured JSON.

In practice, teams often add an `asJSON` calculation field to a table so a page hook can return a record, or a set of records, without manually building JSON in every script.

Why this helps:

- It keeps the shape of a record consistent across pages and hooks
- It reduces repeated JSON-construction logic in FileMaker scripts
- It works well with helper functions such as `getColumn` and `getColumnAsArray`
- It can be paired with caching when building large JSON objects becomes expensive

## Fetching Data

Gathering and compiling a JSON-based data object from a found set of FileMaker records can become expensive. When possible, use the helper custom functions installed during BetterForms integration.

`getColumn` is a custom function that wraps an SQL query. It returns a list of field results when the second argument matches the third. It is often most useful when returning a single record or a small lookup value for BetterForms.

`getColumnAsArray` is similar to `getColumn`, but is designed to return a JSON array of found records. That makes it a strong fit for BetterForms elements that render repeating data, such as tables and list-style components.

#### Complex Finds

On some occasions you may need a more complex found set than `getColumnAsArray` can easily provide. In those cases, use normal FileMaker finds and add a `summaryAsJSON` field that is a _summary_ field with `List of` pointing to your `asJSON` calculation.

This returns a found-set list of `asJSON` results. That field is not true JSON by itself, so you must convert line returns to commas and wrap the result in square brackets to form a proper JSON array.

```text
// Example to convert a list of asJSON to true JSON
JSONFormatElements ( 
"[" & Substitute ( People::summaryAsJSON ; ¶ ; "," ) & "]"
)
```

### Writing Data

There are two common approaches to writing data back from BetterForms: single-record writes and multi-record writes.

### Single Record Writes

When possible, it is simpler and easier to maintain code that writes one record at a time. A common pattern is:

- let the user choose a single record from a list
- load that record into the page model
- let the user edit it
- save it by finding that one record and committing the changes

### Multiple Record Writes

If your UI allows edits to multiple records at once, you will usually need to loop over the returned array, find each record, and apply the changes. In these scenarios, a selection-based design can still help keep the workflow predictable.

### New Record vs Edit Record

Many interfaces need to create new records as well as edit existing ones. A simple pattern is to use the same page and save logic for both:

- if the model already has the record UID, update the existing record
- if the UID is missing, create a new record instead

