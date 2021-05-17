# messageSendAnonChannel

Sends a message to a given anonymous channel\(s\).

#### Function Action Object

| Key | value | Description |
| :--- | :--- | :--- |
| action | 'messageSendAnonChannel' | Action name |
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
        "action": "messageSendAnonChannel",
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
            "model": {
              "myModelData": "modelData"
            },
            "app": {
              "myAppData": "appModelData"
            },
            "channels": ["channel1, channel2, channel3"]
        }
    }
]
```

