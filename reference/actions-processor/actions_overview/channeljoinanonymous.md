---
description: Adds user to anonymous channel (non-authenticated users)
---

# channelJoinAnonymous

Adds non-authenticated user to anonymous channel.

#### Function Action Object

| Key | value | Description |
| :--- | :--- | :--- |
| action | 'channelJoinAnonymous' | Action name |
| options.apiKey |  {string} | API key generated for app |
| options.channel | {string} | Channel name |

### Example

```yaml
// This will join a non-authenticated user to "chatRoom"
[
  {
    "action": "channelJoinAnonymous",
    "options": {
      "apiKey": "BFAPI_GENERATED-API-KEY",
      "channel": "chatRoom"
    }
  }
]
```

