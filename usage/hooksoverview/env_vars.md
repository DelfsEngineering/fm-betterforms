# Environmental Globals

There are defined $$BF\_xxx global variables available to all scripts. Use these to mutate data and hydrate pages.

| $$Var Name | Description |
| :--- | :--- |
| $$BF\_Model | This is the forms entire data model |
| $$BF\_App | Keys passed in will be merged with the current app model.  \(0.8.32+\) This global is not populated with the current `app` data, it is outbound only. |
| $$BF\_State | The state object holds various data related to the browser environment. |
| $$BF\_User | The user object when a user has been authenticated. |
| $$BF\_Query | Key value pairs of the URL query parameters. Useful for direct linking \(smart links\) to a page. |
| $$BF\_Form | The formSchema of the current page when applicable. This data may not be present of reduced payload options are set for the current layout. |
| $$BF\_Payload | This var has the entire payload object, most of it is over written at the end or the scripts, so if you mutate it, there is a good chance your data will be overwritten. |

## $$BF\_State

### Controlling Data Merge Mode

To reduce data transfer and increase performance and flexibility you can control the merge mode of the data in utility hooks. The default mode has the $$BF\_Model data replace the current web pages model. This is usually fine. 

`state.modelUpdateMode` Controls the way returned data is handled in the client.

| Key | Value | Description |
| :--- | :--- | :--- |
| \```modelUpdateMode``` | `replace`  or not supplied | If not supplied \(default\) or `replace` then the returned data from the hook will replace all of the current data model.  |
| \```modelUpdateMode``` | `merge` | Merge will use a `Object.assign` to merge the data keys supplied by the model with the current data model in the client.This will allow you to keep the current data in the app and only update \(and send\) the smaller changes. |



