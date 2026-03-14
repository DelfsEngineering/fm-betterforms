# path

`path` navigates the user to another route, opens an external URL, or retargets an existing BetterForms window.

The old rule that "`path` must always be the last action" is too absolute for the current runtime.

What actually happens depends on which navigation mode you use.

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
        <p>{ optional } If specified, BetterForms updates the target card/modal window with the matching name instead of opening a normal route or URL navigation. This is useful when you want to retarget an existing BetterForms window.
        </p>
        <p>ver 0.8.2+</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">options.path</td>
      <td style="text-align:left"><em>string</em>
      </td>
      <td style="text-align:left">
        <p>{ optional } Internal BetterForms route, for example <code>/</code>, <code>/dash</code>, or <code>/form/:id</code>.</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">options.url</td>
      <td style="text-align:left"></td>
      <td style="text-align:left">{ optional } External URL to open.</td>
    </tr>
    <tr>
      <td style="text-align:left">options.sameWindow</td>
      <td style="text-align:left"></td>
      <td style="text-align:left">{ optional } If true with <code>options.url</code>, BetterForms replaces the current browser tab instead of opening a new one.</td>
    </tr>
    <tr>
      <td style="text-align:left">options.name</td>
      <td style="text-align:left"><em>string</em>
      </td>
      <td style="text-align:left">Target name used by <code>window.open()</code> when opening an external URL. If omitted, BetterForms uses <code>_blank</code>. ( Ver 0.10.22+ )</td>
    </tr>
    <tr>
      <td style="text-align:left">options.features</td>
      <td style="text-align:left"><em>string</em>
      </td>
      <td style="text-align:left">Window features as described in <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/open#window_features">MDN here</a>.
        ( Ver 0.10.22+ )</td>
    </tr>
  </tbody>
</table>

## Runtime Behavior

| Mode | Key(s) used | What BetterForms does | Action thread continues? |
| --- | --- | --- | --- |
| Internal route | `options.path` | Calls the Vue router | Yes |
| External URL, new tab/window | `options.url` | Calls `window.open()` | Yes |
| External URL, same tab | `options.url` + `sameWindow: true` | Replaces the current browser location | No |
| Existing BetterForms window | `options.windowName` | Updates the target BetterForms window | Yes |

For same-window external navigation, treat `path` as the last meaningful action because the browser is leaving the BetterForms app.

For internal routes and new-tab external links, the action queue can continue after navigation.

```json
{
  "action": "path",
  "options": {
    "path": "/invoiceList"
  }
}
```

```json
{
  "action": "path",
  "options": {
    "url": "https://docs.fmbetterforms.com/",
    "sameWindow": true
  }
}
```

```json
{
  "action": "path",
  "options": {
    "url": "https://example.com/report.pdf",
    "name": "_blank",
    "features": "noopener,noreferrer"
  }
}
```

## FileMaker Custom Function

```text
BF_SetAction_Path("/form/123-1234-5678")
```

