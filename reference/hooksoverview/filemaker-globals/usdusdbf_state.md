---
description: The state object holds various data related to the browser environment.
---

# \$$BF\_State

### Controlling Data Merge Mode

To reduce data transfer and increase performance and flexibility you can control the merge mode of the data in utility hooks. 

**Default Behavior (as of v3.x):** When a utility hook returns a model, BetterForms will automatically **merge** the returned data with the existing client-side model. This preserves client-only reactive properties (like component state) and is safer for most use cases.

`state.modelUpdateMode` Controls the way returned data is handled in the client.

| Key               | Value                                           | Description                                                                                                                                                                                                                      |
| ----------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `modelUpdateMode` | <p><code>merge</code> <br>or not supplied</p> | **Default behavior.** Merge will use an `Object.assign` to merge the data keys supplied by the model with the current data model in the client. This preserves client-side properties and allows you to keep the current data in the app and only update (and send) the smaller changes. |

#### Important Notes for Developers

**Clearing/Removing Model Keys:**
To remove or clear a model key, you must explicitly set it to `null`, `""`, or `[]` in the returned model. Simply omitting a key will leave the existing value unchanged (merge behavior).

```javascript
// To clear a key, FileMaker must return:
{
  "model": {
    "someKey": null,           // Explicitly null
    "someArray": [],           // Explicitly empty array
    "someString": ""           // Explicitly empty string
  }
}
```

**Backward Compatibility:**
- Existing hooks that rely on `modelFilterKeys` or explicitly set `modelUpdateMode: 'merge'` continue to work as before
- No changes needed to existing FileMaker scripts in most cases
- The change only affects utility hooks that return a model without explicitly setting a mode

In addition to reducing the data model, other payload keys can optionally be removed. The `form` `pages` and `options` keys can also be removed. These key are normally populated with form schema data and generally do not get mutated by the hook scripts. If the keys are empty the BetterForms client will continue to use the existing values significantly reducing the hook payload size and increasing performance.

To reduce the data sent by the client to your FileMaker Server on each hook call, see this page:

{% content-ref url="../env_vars.md" %}
[env\_vars.md](../env\_vars.md)
{% endcontent-ref %}
