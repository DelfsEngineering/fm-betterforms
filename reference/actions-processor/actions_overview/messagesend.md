# messageSend

Sends a message to a given channel.

#### Function Action Object

| Key | value | Description |
| :--- | :--- | :--- |
| action | 'channelJoinAnonymous' | Action name |
| options.actions | {array} | Array of BF actions |
| options.channels | {array} | Array of channel names |

### Examples

* options.channels

```yaml
// This will send a showAlert action
//to channels "channel1", "channel2" and "channel3"
[
    {
        "action": "messageSend",
        "options": {
            "actions": [
                {
                    "action": "showAlert",
                    "options":{
                        "text": "Hello from Message",
                        "title": "Hello World",
                        "type": "information"
                    }
                }
            ],
            "channels": ["channel1, channel2, channel3"]
        }
    }
]
```

