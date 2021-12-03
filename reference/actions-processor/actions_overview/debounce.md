---
description: Ver +bf-0.01.4
---

# debounce

`debounce` controls the execution of actions based on a period of inactivity, It makes the actions wait until nothing is happening.

This action is based on [https://lodash.com/docs/4.17.15\#debounce](https://lodash.com/docs/4.17.15#debounce)

Actions that follow the throttle action will be queued until the wait time expires and there is no namedAction key.

| Key | Type | Description |
| :--- | :--- | :--- |
| action | `"debounce"` | Action Name |
| options.name |  _string_ | { optional } This key is needed when you have multiple debounce or throttle actions in your application. |
| options.wait | _number_ | time in mS to wait |
| options.leading | boolean | { optional }  default to false, if true, the first invocation of the action will cause it to fire. |
| options.trailing | _boolean_ | { optional } defaults to true, if true the action will be invoked when the time out period has expired. |
| options.namedAction | _string_ | { optional } If supplied the named Action that is passed with be executed when the action triggers. |

```yaml
// example debounce action object
{
  "action": "debounce",
  "options": {
    "name": "myDebounce1",
    "leading": false,
    "trailing": true,
    "wait": 600
  }
},{
  ... more actions to run later
}

// example calling a namedAction
{
  "action": "debounce",
  "options": {
    "name": "myDebounce2",
    "wait": 600,
    "namedAction" : "saveApplication"
  }
} // no more actinos after here
```

