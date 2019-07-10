---
description: pause the actions queue for an amount of time specified
---

# wait

Wait for time or event

#### Function Action Object

| Key | value | Description |
| :--- | :--- | :--- |
| action | 'wait' | Action name |
| options.ms |  {milliSeconds} | if specified, waits the  |

Javascript is placed on a single JSON value line,  you must separate commands with a semicolon. Proper JSON escaping will always need to be applied.

#### Uses:

General purpose, sometimes you may want the following actions to wait until something is completed.

\*\*Example\*\*

```yaml
// This will wait for 2 seconds 
[
  {
    "action": "wait",
    "options": {
      "ms": 2000
    }
  }
  ...
  // other actions here will run after 2 seconds
]
```

