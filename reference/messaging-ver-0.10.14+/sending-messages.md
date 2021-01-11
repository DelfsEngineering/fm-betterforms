# Sending messages

Once we have channels set, we can send messages on them. There are three different ways to send messages to a channel.

## BF action

The BF action **messageSend** can be used to send a message to channel or channels.

This action requires a channel key, which can be sent under options or action.options.

### Examples

* options.channel

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
            "channel": "channel1, channel2, channel3"
        }
    }
]
```

* options.actions\[ \].options.channel

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
                        "type": "information",
                        "channel": "channel1, channel2, channel3"
                    }
                }
            ]
        }
    }
]
```

More information about **messageSend** action can be found [here](../actions-processor/actions_overview/messagesend.md).

## FileMaker API script

The script is available in Helper file and is called **API - Send Channel**. This script accepts an object with four keys **message**, **channels**, **apiKey** and **domain**.

* message: it accepts an object with:
  * actions: array of BF object actions.
* channels: string of channel name or array of strings;
* apiKey: API key from corresponding app;
* domain: domain to send message to.

### Examples

```text
{
    message:{
        "actions": [
            {
                "action": "showAlert",
                "options": {    
                   "text": "Alert from FM",
                   "title": "Hello World",
                   "type": "information"
               }
           }
       ]
   }
   "channels": ["channel1", "channel2"],
   "apiKey": "BFAPI_XXXX-YYYY-XXXX",
   "domain": "my.domain.com"
}
```

## API endpoint /message/sendmessage

In order to send messages on channels via API endpoint, an API needs to be generated for the app. This API key needs to be sent in the body of the POST request with **message** and **channels**, as shown in the example below.

* Address: https://**YOUR.DOMAIN.com/message/sendmessage**;
* Set headers:
  * Accept = application/json
  * Content-type = application/json
* Body content:

```text
{
    "message": {
        "actions": [
            {
                "action": "showAlert",
                "options": {
                    "text": "Alert from Jhon",
                    "title": "Hello World",
                    "type": "information"
                }
            }
        ]
    },
    "channels": ["channel1", "channel2"],
    "apiKey": "BFAPI_GENERATED-API-KEY"
}
```

