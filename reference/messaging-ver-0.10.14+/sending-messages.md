---
description: >-
  Once your users are subscribed to a channel or two, you can send messages to
  them!
---

# Sending messages

Think of a message as a standard [**BF Action**](../actions-processor/actions\_overview/) that is triggered externally. It can even contain data to populate the page, but you don't have to wait for a user to click a button, run a utility hook, or even poll your server for updates on a set interval.

## BF Action

### Authenticated Channels

The BF action **messageSend** can be used to send a message to channel or channels. It requires a **channel** key to be set under options.

#### Example

* options.channels

```yaml
// This will send a showAlert action
// to channels "channel1", "channel2" and "channel3"
[
  {
    "action": "messageSend",
    "options": {
      "actions": [
        {
          "action": "showAlert",
          "options": {
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
      "channels": ["channel1", "channel2", "channel3"]
    }
  }
]
```

#### Full action reference:

{% content-ref url="../actions-processor/actions_overview/messagesend.md" %}
[messagesend.md](../actions-processor/actions\_overview/messagesend.md)
{% endcontent-ref %}

### Anonymous channel

The BF action **messageSendAnonChannel** can be used to send a message to channel or channels. It requires a **channels** key to be set under options.

#### Example

* options.channels

```yaml
// This will send a showAlert action
// to channels "channel1", "channel2" and "channel3"
[
  {
    "action": "messageSendAnonChannel",
    "options": {
      "actions": [
        {
          "action": "showAlert",
          "options": {
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
      "channels": ["channel1", "channel2", "channel3"]
    }
  }
]
```

#### Full action reference:

{% content-ref url="../actions-processor/actions_overview/messagesendanonchannel.md" %}
[messagesendanonchannel.md](../actions-processor/actions\_overview/messagesendanonchannel.md)
{% endcontent-ref %}

## FileMaker Script

The script is available in Helper file and is called **API - Send Message**. This script accepts an object with four keys **message**, **channels**, **apiKey** and **domain**.

* `message`: it accepts an object with:
  * `actions`: array of BF action objects;
  * `model`: object with model data;
  * `app`: object with app model data.
* `channels`: string of channel name or array of strings;
* `apiKey`: API key from corresponding app;
* `domain`: domain to send message to.

#### Example Parameter

```yaml
{
  "message": {
    "actions": [
      {
        "action": "showAlert",
        "options": {
          "text": "Alert from FM",
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
    }
  },
  "channels": ["channel1", "channel2"],
  "apiKey": "BFAPI_XXXX-YYYY-XXXX",
  "domain": "my.domain.com"
}
```

## API endpoint /message/sendmessage

{% swagger baseUrl="https://yourdomain.com" path="/message/sendmessage" method="post" summary="API: Send Message" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="accept" type="string" required="false" %}
application/json
{% endswagger-parameter %}

{% swagger-parameter in="header" name="content-type" type="string" required="false" %}
application/json
{% endswagger-parameter %}

{% swagger-parameter in="body" name="apiKey" type="string" required="false" %}
the API key for the corresponding app
{% endswagger-parameter %}

{% swagger-parameter in="body" name="channels" type="array" required="false" %}
array of channel names
{% endswagger-parameter %}

{% swagger-parameter in="body" name="message" type="string" required="false" %}
JSON object to be sent
{% endswagger-parameter %}

{% swagger-parameter in="body" name="message.actions" type="array" required="false" %}
JSON for an array of BF action objects
{% endswagger-parameter %}

{% swagger-parameter in="body" name="message.model" type="object" required="false" %}
JSON object with data to be merged to model data
{% endswagger-parameter %}

{% swagger-parameter in="body" name="message.app" type="array" required="false" %}
JSON object with data to be merged to app model data
{% endswagger-parameter %}

{% swagger-response status="201" description="This request will return the data that was sent as body of the request." %}
```
```
{% endswagger-response %}
{% endswagger %}

#### Example request body

```yaml
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
    ],
    "model": {
      "myModelData": "modelData"
    },
    "app": {
      "myAppData": "appModelData"
    }
  },
  "channels": ["channel1", "channel2"],
  "apiKey": "BFAPI_GENERATED-API-KEY"
}
```
