---
description: Ver +bf-0.01.4
---

# throttle

`throttle` controls the _rate_ of execution of actions based on a time, the frequency of invocation does not affect how frequent  It makes the actions wait until nothing is happening.

This action is based on [https://lodash.com/docs/4.17.15\#throttle](https://lodash.com/docs/4.17.15#throttle)

Actions that follow the throttle action will be queued until the wait time expires and there is no namedAction key.

| Key | Type | Description |
| :--- | :--- | :--- |
| action | `"throttle"` | Action Name |
| options.name |  _string_ | { optional } This key is needed when you have multiple debounce or throttle actions in your application. |
| options.wait | _number_ | time in mS to wait |
| options.leading | boolean | { optional }  default to false, if true, the first invocation of the action will cause it to fire. |
| options.trailing | _boolean_ | { optional } defaults to true, if true the action will be invoked when the time out period has expired. |
| options.namedAction | _string_ | { optional } If supplied the named Action that is passed with be executed when the action triggers. |

```yaml
// example throttle action object
{
  "action": "throttle",
  "options": {
    "name": "myThrottle1",
    "leading": true,
    "trailing": false,
    "wait": 10000
  }
},{ 
   ... more actions
}
```



