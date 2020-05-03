# Globals Variables

When a hook script is called on your FileMaker Server, the following global variables are made available to your scripts. You can use them to view data sent from the client's browser and push data back to hydrate their web session.

This page contains a summary of all the variables; subsequent pages in this section go into more detail about how each one should be used.

| $$Var Name | Description |
| ---: | :--- |
| \*\*\*\*[**$$BF\_Model**](usdusdbf_model.md) | This is the forms entire data model |
| \*\*\*\*[**$$BF\_App**](usdusdbf_app.md) | Keys passed in will be merged with the current app model.  \(0.8.32+\) This global is not populated with the current `app` data, it is outbound only. |
| \*\*\*\*[**$$BF\_State**](usdusdbf_state.md)\*\*\*\* | The state object holds various data related to the browser environment. |
| **$$BF\_User** | The user object when a user has been authenticated. |
| **$$BF\_Query** | Key value pairs of the URL query parameters. Useful for direct linking \(smart links\) to a page. |
| **$$BF\_Cookie** | Object containing browser cookies  \(Helper &gt; v1.2\) |
| **$$BF\_Form** | The formSchema of the current page when applicable. This data may not be present of reduced payload options are set for the current layout. |
| **$$BF\_Payload** | This var has the entire payload object, most of it is over written at the end or the scripts, so if you mutate it, there is a good chance your data will be overwritten. |

