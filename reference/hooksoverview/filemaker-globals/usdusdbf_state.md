---
description: The state object holds various data related to the browser environment.
---

# \$$BF\_State

### Controlling Data Merge Mode

To reduce data transfer and increase performance and flexibility you can control the merge mode of the data in utility hooks. The default mode has the \$$BF\_Model data replace the current web pages model, but certain workflows may warrant that only some data is updated within the model.

`state.modelUpdateMode` Controls the way returned data is handled in the client.

| Key               | Value                                           | Description                                                                                                                                                                                                                      |
| ----------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `modelUpdateMode` | <p><code>replace</code> <br>or not supplied</p> | If not supplied (default) or `replace` then the returned data from the hook will replace all of the current data model.                                                                                                          |
| `modelUpdateMode` | `merge`                                         | Merge will use an `Object.assign` to merge the data keys supplied by the model with the current data model in the client.This will allow you to keep the current data in the app and only update (and send) the smaller changes. |

In addition to reducing the data model, other payload keys can optionally be removed. The `form` `pages` and `options` keys can also be removed. These key are normally populated with form schema data and generally do not get mutated by the hook scripts. If the keys are empty the BetterForms client will continue to use the existing values significantly reducing the hook payload size and increasing performance.

To reduce the data sent by the client to your FileMaker Server on each hook call, see this page:

{% content-ref url="../env_vars.md" %}
[env\_vars.md](../env\_vars.md)
{% endcontent-ref %}
