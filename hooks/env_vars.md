## Environmental Variables

There are defiend $\$BF_xxx  global variables available to all scripts. Use these to mutate data and hydrate pages.

| $$Var Name | Description |
| :--- | :--- |
| $\$BF_Model | This is the forms entire data model |
| $\$BF_State | The state object holds various data related to the browser environment. |
| $\$BF_User | The user object when a user has been authenticated. |
| $\$BF_Query | Key value pairs of the URL query parameters. Useful for direct linking (smart links) to a page. |
| $\$BF_Form | The formSchema of the current page when applicable. This data may not be present of reduced payload options are set for the current layout.  |
| $\$BF_Payload | This var has the entire payload lobect, most of it is over written at the end or the scripts, so if you mutate it, there is a good chance your data will be overwritten. |



