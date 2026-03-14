# runUtilityHook

Calls the scoped `onUtility` server hook.

`runUtilityHook` is a browser-side action that packages a payload and sends it to FileMaker through `formsService.onUtility`.

## Action Shape

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
      <td style="text-align:left">Additional values passed into the `hookPackage` that FileMaker receives</td>
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
    <tr>
      <td style="text-align:left">options.model</td>
      <td style="text-align:left">object</td>
      <td style="text-align:left">Optional custom outgoing model payload. If supplied, it replaces the normal outgoing page model for this hook call.</td>
    </tr>
    <tr>
      <td style="text-align:left">options.modelFilterKeys</td>
      <td style="text-align:left">array</td>
      <td style="text-align:left">Optional list of model keys to keep from the current page model before sending the hook payload.</td>
    </tr>
    <tr>
      <td style="text-align:left">options.query</td>
      <td style="text-align:left">object</td>
      <td style="text-align:left">Optional query override. If omitted, BetterForms sends the current page query parameters.</td>
    </tr>
  </tbody>
</table>

```json
{
  "action": "runUtilityHook",
  "options": {
    "type": "save",
    "someKey": "some passed info"
  }
}
```

In the example above, `type` is just an arbitrary key you can inspect in FileMaker to branch between different `onUtility` behaviors for the same page or hook set.

You can inspect the full action object in FileMaker under `hookPackage`.

## Payload Behavior

By default, BetterForms starts from the current page schema/model payload.

If the page does **not** have `Send full schema in utility hooks` enabled, BetterForms trims the outgoing payload and keeps only a lightweight `form` object with the current `hookSetName`.

For payload-size details, see [Reducing Payload Size](../../hooksoverview/env_vars.md).

## Response Behavior

When FileMaker returns from `onUtility`, BetterForms can apply:

- returned `actions`
- returned `model`
- returned `app`
- returned `pages` / `form` updates

Returned actions are inserted back into the active action thread.

### Model Merge Rules

If the response includes `result.model`:

- BetterForms defaults to `merge` behavior unless `state.modelUpdateMode` is explicitly set
- `options.model` and `options.modelFilterKeys` also mark the request for merge behavior
- explicit `state.modelUpdateMode = "replace"` is required when you want a full model replacement

This preserves client-only reactive keys while still letting FileMaker update the page model.

### App Sync

If a returned model key is configured with `appSync`, BetterForms keeps the page model and app model aligned.

When both the returned `app` object and returned `model` object provide the same `appSync` key, the returned `app` value wins for the final synced value.

## Hook Boundary

`runUtilityHook` is an **action**, not a hook by itself:

- the action runs in the browser
- BetterForms packages the payload
- the server-side `onUtility` hook runs in FileMaker

If you want browser-side workflows such as `onFormLoad` or `onAppLoad`, see [Lifecycle Hooks](../../hooksoverview/lifecycle-hooks.md).
