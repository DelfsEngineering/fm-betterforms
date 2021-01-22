---
description: >-
  BetterForm has a collection of helper Java Script functions that are used
  within JavaScript to allow  easy access to common complex code.
---

# BF Utility Functions

{% hint style="info" %}
Requires version 0.9.20 or later
{% endhint %}

### Errors

| Function |  |
| :--- | :--- |
| **Actions** |  |
| BF.actionsClear\(\) | Clears the action script buffer halting all subsequent actions \( current action completes\) |
|  |  |
| **Errors** |  |
| BF.errorClearAll\(\) | Clears the error cache |
| BF.errorThrow\(errorCode, errorDescription, info\) | Creates an error |
| BF.namedAction\(name, options\) | Runs a named action, options are propagated to all actions within the named action. |
| BF.rebuildReactivity\(object\) | This function is normally run upon a completion of a `function` .  It recursively scans the object passed, and adds new reactive keys to keys that do are new or do not have reactivity. You will not need to use this within a function unless that function has a callback that later mutates a reactive object. Eg: setTimeout\(\) which takes a callback. |
|  |  |
| **Misc** |  |
| BF.socketConnect\(\) | Connects the client to the BF server via a socket |
| BF.socketDisconnect\(\) | Disconnects the client from the BF servers  \( Goes off line\) |
| BF.getUUID\(\) | Returns a UUID |
| BF.getQueryParam\(key\)  | Returns the URL query key value |



