---
description: Removes user from anonymous channel
---

# channelLeaveAnon

Removes user from anonymous channel


Removes users from anonymous channel.

#### Function Action Object

| Key | value | Description |
| :--- | :--- | :--- |
| action | 'channelLeaveAnon' | Action name |
| options.channel | {string} | Channel name |

### Example

```yaml
// This will remove a user to "chatRoom"
[
  {
    "action": "channelLeaveAnon",
    "options": {
      "channel": "chatRoom"
    }
  }
]
```

