# path - Action

`path` redirect the user to a different area, form or layout. Path can even be used to log a user out. \( `/logout` \)

**note:** _path_ must be last item \( processor does not check for subsequent ones after path \)

| Key | Type | Description |
| :--- | :--- | :--- |


| action | `"path"` | Action Name |
| :--- | :--- | :--- |


<table>
  <thead>
    <tr>
      <th style="text-align:left">options.windowName</th>
      <th style="text-align:left"> <em>string</em>
      </th>
      <th style="text-align:left">
        <p>{ optional } If specified the <code>options</code> object will be used to
          update the target window that has the specified name. This is useful for
          changing things like card modal forms without destroying th modal and recreating
          again. Can also target windows by <code>id</code>
        </p>
        <p>via<code>options.id</code>
        </p>
        <p>ver 0.8.2+</p>
      </th>
    </tr>
  </thead>
  <tbody></tbody>
</table><table>
  <thead>
    <tr>
      <th style="text-align:left">options.path</th>
      <th style="text-align:left"><em>string</em>
      </th>
      <th style="text-align:left">
        <p>{ optional } URN path that follows the # (hash)
          <br />eg:</p>
        <p>&quot;/&quot; - index page</p>
        <p>&quot;/form/:id - a form with id</p>
      </th>
    </tr>
  </thead>
  <tbody></tbody>
</table>| options.url |  | { optional } will open page url in a new tab |
| :--- | :--- | :--- |


| options.sameWindow |  | { optional } If true, will open url replacing the BetteForms app \(same tab\) |
| :--- | :--- | :--- |


// This will replace the BetterForms page with the URL 'www.delfsengineering.ca' { "action" : "path", "options" : { "sameWindow" : true, "url" : "[http://www.delfsengineering.ca](http://www.delfsengineering.ca)" }

}

```text
## FileMaker Custom Function

```text
    BF_SetAction_Path("/form/123-1234-5678") // takes user to form 123...
```

