# Environmental Globals

There are defined $$BF\_xxx global variables available to all scripts. Use these to mutate data and hydrate pages.

| $$Var Name | Description |
| :--- | :--- |
| $$BF\_Model | This is the forms entire data model |
| $$BF\_App | Keys passed in will be merged with the current app model.  \(0.8.32+\) |
| $$BF\_State | The state object holds various data related to the browser environment. |
| $$BF\_User | The user object when a user has been authenticated. |
| $$BF\_Query | Key value pairs of the URL query parameters. Useful for direct linking \(smart links\) to a page. |
| $$BF\_Form | The formSchema of the current page when applicable. This data may not be present of reduced payload options are set for the current layout. |
| $$BF\_Payload | This var has the entire payload lobect, most of it is over written at the end or the scripts, so if you mutate it, there is a good chance your data will be overwritten. |

