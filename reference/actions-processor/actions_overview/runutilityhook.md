# runUtilityHook

Calls the scoped `onUtility` server hook. You can pass additional parameters in `options`, and BetterForms includes them in the hook payload sent to FileMaker.

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
      <td style="text-align:left">Containing values that are also passed into the FileMaker hook payload</td>
    </tr>
    <tr>
      <td style="text-align:left">options.hookSetName</td>
      <td style="text-align:left">
        <p>string</p>
        <p>(optional)</p>
      </td>
      <td style="text-align:left">
        <p>If passed, this overrides the page's default scoped hook set name. This is useful when you want to trigger the `onUtility` server hook from one page but route it through another scoped hook set. It is also useful for global named actions, because they are not associated with a specific form.</p>
        <p>Helper File &gt;Ver 0.1.2</p>
      </td>
    </tr>
  </tbody>
</table>

```yaml
// action object for 'runUtilityHook'
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

In the above example, `type` is an arbitrary key you can inspect in FileMaker to branch between different `onUtility` behaviors for the same page or hook set.

You can access the entire action object under the `hookPackage` key.

`runUtilityHook` is an **action**, not a hook by itself:

- the action runs in the browser
- BetterForms packages the payload
- the server-side `onUtility` hook runs in FileMaker

If you want browser-side workflows such as `onFormLoad` or `onAppLoad`, see [Lifecycle Hooks](../../hooksoverview/lifecycle-hooks.md).
