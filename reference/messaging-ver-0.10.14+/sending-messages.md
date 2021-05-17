---
description: >-
  Once your users are subscribed to a channel or two, you can send messages to
  them!
---

# Sending messages

Think of a message as a standard [**BF Action**](../actions-processor/actions_overview/) that is triggered externally. It can even contain data to populate the page, but you don't have to wait for a user to click a button, run a utility hook, or even poll your server for updates on a set interval.

## BF Action

### Authenticated Channels

The BF action **messageSend** can be used to send a message to channel or channels. It requires a **channel** key to be set under options.

#### Example

* options.channel

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

{% page-ref page="../actions-processor/actions\_overview/messagesend.md" %}

### Anonymous channel

The BF action **messageSendAnonChannel** can be used to send a message to channel or channels. It requires a **channel** key to be set under options.

#### Example

* options.channel

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

{% page-ref page="../actions-processor/actions\_overview/messagesendanonchannel.md" %}

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

{% api-method method="post" host="https://yourdomain.com" path="/message/sendmessage" %}
{% api-method-summary %}
API: Send Message
{% endapi-method-summary %}

{% api-method-description %}

{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="accept" type="string" required=true %}
application/json
{% endapi-method-parameter %}

{% api-method-parameter name="content-type" type="string" required=true %}
application/json
{% endapi-method-parameter %}
{% endapi-method-headers %}

{% api-method-body-parameters %}
{% api-method-parameter name="apiKey" type="string" required=true %}
the API key for the corresponding app
{% endapi-method-parameter %}

{% api-method-parameter name="channels" type="array" required=true %}
array of channel names
{% endapi-method-parameter %}

{% api-method-parameter name="message" type="string" required=true %}
JSON object to be sent
{% endapi-method-parameter %}

{% api-method-parameter name="message.actions" type="array" required=false %}
JSON for an array of BF action objects
{% endapi-method-parameter %}

{% api-method-parameter name="message.model" type="object" required=false %}
JSON object with data to be merged to model data
{% endapi-method-parameter %}

{% api-method-parameter name="message.app" type="array" required=false %}
JSON object with data to be merged to app model data
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=201 %}
{% api-method-response-example-description %}
This request will return the data that was sent as body of the request.
{% endapi-method-response-example-description %}

```

```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

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

