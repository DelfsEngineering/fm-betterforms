# runUtilityHook

Allows the `onUtilityHook` hook to execute. You have the ability to pass any additional parameters.

| Key | Description |
| :--- | :--- |
| action | runUtilityHook |
| options | `string` that you want to be placed on the clipboard |

```text
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

In the above example `type` is an arbitrary key used to parse multiple hook methods from the same page.

You can access the entire action object under the `hookPackage` key.

