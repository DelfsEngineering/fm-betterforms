# path - Action

`path` redirect the user to a different area, form or layout. Path can even be used to log a user out. \( `/logout` \)

**note:** _path_ must be last item \( processor does not check for subsequent ones after path \)

<table>
  <thead>
    <tr>
      <th style="text-align:left">Key</th>
      <th style="text-align:left">Type</th>
      <th style="text-align:left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">action</td>
      <td style="text-align:left"><code>&quot;path&quot;</code>
      </td>
      <td style="text-align:left">Action Name</td>
    </tr>
    <tr>
      <td style="text-align:left">options.windowName</td>
      <td style="text-align:left"> <em>string</em>
      </td>
      <td style="text-align:left">
        <p>{ optional } If specified the <code>options</code> object will be used to
          update the target window that has the specified name. This is useful for
          changing things like card modal forms without destroying th modal and recreating
          again. Can also target windows by <code>id </code>
        </p>
        <p>via<code>options.id</code>
        </p>
        <p>ver 0.8.2+</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">options.path</td>
      <td style="text-align:left"><em>string</em>
      </td>
      <td style="text-align:left">
        <p>{ optional } URN path that follows the # (hash)
          <br />eg:</p>
        <p>"/" - index page</p>
        <p>"/form/:id - a form with id</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">options.url</td>
      <td style="text-align:left"></td>
      <td style="text-align:left">{ optional } will open page url in a new tab</td>
    </tr>
    <tr>
      <td style="text-align:left">options.sameWindow</td>
      <td style="text-align:left"></td>
      <td style="text-align:left">{ optional } If true, will open url replacing the BetteForms app (same
        tab)</td>
    </tr>
  </tbody>
</table>```yaml
// example path action object
{
"action" :"path",
    {
        url
    }
}

// This will replace the BetterForms page with the URL 'www.delfsengineering.ca'
{
"action" : "path",
    "options" :
    {
        "sameWindow" : true,
        "url" : "http://www.delfsengineering.ca"
    }

}
```

## FileMaker Custom Function

```text
    BF_SetAction_Path("/form/123-1234-5678") // takes user to form 123...
```

