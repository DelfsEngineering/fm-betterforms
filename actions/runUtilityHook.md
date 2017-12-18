#Action: runUtilityHook

Executes a server side workflow via the `onUtilityHook` hook. You can add additional parameters that can be passed into the hook also. 


| Key | Description |
| :--- | :--- |
| action | 'runUtilityHook' |
| options | Object to be passed into hook |

Data in the `options` object will surface in the hook in the `$$BF_HookPackage` var.

 
### Example

```
// action  object for runUtilityHook
{
  "action" : "runUtilityHook",
  "options" : 
  {
    "key" : "The quick bron fox"
  }
}
```

#### FileMaker Custom Function
```
BF_SetAction_runUtilityHook( options) 
```





