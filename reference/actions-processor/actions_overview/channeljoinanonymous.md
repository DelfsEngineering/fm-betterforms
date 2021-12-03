---
description: Adds user to anonymous channel
---

# channelJoinAnon

Adds users to anonymous channel.

#### Function Action Object

| Key | value | Description |
| :--- | :--- | :--- |
| action | 'channelJoinAnon' | Action name |
| options.channel | {string} | Channel name |

### Example

```yaml
// This will join a user to "chatRoom"
[
  {
    "action": "channelJoinAnon",
    "options": {
      "channel": "chatRoom"
    }
  }
]
```



