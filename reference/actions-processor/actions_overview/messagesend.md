# messageSend

Sends a message to a given channel.

#### Function Action Object

| Key | value | Description |
| :--- | :--- | :--- |
| action | 'messageSend' | Action name |
| options.actions | {array} | Array of BF actions |
| options.channels | {array} | Array of channel names |
| options.model | {object} | Key value pairs from model data |
| options.app | {object} | Key value pairs from app model data |

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

