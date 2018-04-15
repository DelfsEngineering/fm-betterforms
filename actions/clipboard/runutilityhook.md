# Action: runUtilityHook

Allows the `onUtilityHook` hook to execute. You have the ability to pass any additional parameters.

| Key | Description |
| :--- | :--- |
| action | runUtilityHook |
| options | `string` that you want to be placed on the clipboard |

```
// action  object for 'cllipboard'
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

You can access the entire action object under the `hookPackage` key. 



