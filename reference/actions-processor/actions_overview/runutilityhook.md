# runUtilityHook

Allows the `onUtilityHook` hook to execute. You have the ability to pass any additional parameters.

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
      <td style="text-align:left">runUtilityHook</td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">options</td>
      <td style="text-align:left">object</td>
      <td style="text-align:left">containing options that are also passed into the FMS hook script</td>
    </tr>
    <tr>
      <td style="text-align:left">options.hookSetName</td>
      <td style="text-align:left">
        <p>string</p>
        <p>(optional)</p>
      </td>
      <td style="text-align:left">
        <p>If passed, will override the default hookSetName (scoped by the page the
          hook was called from. This key is handy when you want to have a hook run
          from Page 1 but run a script in the Page 2 handlers. This is also needed
          if you have global namedActions that calla onUtilityHook, as they are not
          associated with a specific form.</p>
        <p>Helper File &gt;Ver 0.1.2</p>
      </td>
    </tr>
  </tbody>
</table>

```yaml
// action  object for 'cllipboard'
[
 {
  "action": "runUtilityHook",
  "options": {
    "type": "save",
    "someKey": "some passed info"
  }
}
]
```

In the above example `type` is an arbitrary key used to parse multiple hook methods from the same page.

You can access the entire action object under the `hookPackage` key.
