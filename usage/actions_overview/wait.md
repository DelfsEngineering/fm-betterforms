# wait

Wait for time or event

#### Function Action Object

| Key | value | Description |
| :--- | :--- | :--- |
| action | 'wait' | Action name |
| options.ms |  {milliSeconds} | if specified, waits the  |

**Note:**  The `function` key can also be used in any other action that originates from the client. This means actions generated in a hook call do not get the function run when arriving at the server.

Javascript is placed on a single JSON value line,  you must separate commands with a semicolon. Proper JSON escaping will always need to be applied.

#### Uses:

General purpose, sometimes you may want the following actions to wait until something is completed.

\*\*Example\*\*

```text
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

