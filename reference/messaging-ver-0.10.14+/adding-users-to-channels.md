---
description: >-
  You can add users to channels either by calling a FileMaker script in the
  Helper File, or by calling a REST API endpoint of your BetterForms domain.
---

# Adding users to channels

## The Channel Object

| key  | description                                                     |
| ---- | --------------------------------------------------------------- |
| name | The name of the channel. It should be unique among your app     |
| mode | One of `ignore`, `listen`, or `receive`. See Chanel Modes below |

```yaml
// example Channel Object
{
  "name": "channel1",
  "mode": "listen"
}
```

### Channel Modes

Channels can be set to three different modes: **ignore**, **listen** or **receive**.

* **ignore**: messages sent from browser to browser, not passing through FileMaker Server;
* **listen**: messages are sent from browser to browser but FileMaker Server receives the message as well;
* **receive**: messages are sent from browser to FileMaker Server, and messages can be sent later via /message/sendmessage endpoint.

| Mode        | Scope                    | Description                                                                                                                                                                                |
| ----------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **ignore**  | anonymous, authenticated | messages sent from browser to browser, not passing through FileMaker Server.                                                                                                               |
| **listen**  | authenticated only       | messages are sent from browser to browser but FileMaker Server receives the message as well.                                                                                               |
| **receive** | authenticated only       | messages are sent from browser to FileMaker Server and not broadcasted directly to the channel. Messages can be sent later via the FM messages script API:`/message/sendmessage` endpoint. |

## Adding users using a FileMaker Script

{% hint style="warning" %}
**Requires Helper File Changes**\
You will need to update your helper file to the latest version to support the new channels API.
{% endhint %}

The **`API - Join Channel`** script accepts an object with two keys **users** and **channels**.

* `users`: it accepts a string with a **user ID** _or_ an **array of user IDs**
* `channels`: it accepts an object with **name** and **mode** _or_ an **array of objects**, with the same shape.

{% hint style="success" %}
**TIP**: The user `id` is the id of the user in the helper file, not your business file.
{% endhint %}

#### Example Script Parameters

{% tabs %}
{% tab title="Data shape" %}
```yaml
{
    "users": [
        {
            "id": "USER_ID",
            "channels": [
                {
                    "name": "channelName",
                    "mode": "ignore"
                }
            ]
        }
    ],
    "apiKey": "BF_APP_API-KEY"
}
```
{% endtab %}
{% endtabs %}

{% swagger baseUrl="https://yourdomain.com" path="/message/adduser" method="post" summary="API: Add User to Channel" %}
{% swagger-description %}
You can use this method to join users to one or more channels. This is an authenticated request using the API key for the BetterForms network.
{% endswagger-description %}

{% swagger-parameter in="header" name="content-type" type="string" required="false" %}
application/json
{% endswagger-parameter %}

{% swagger-parameter in="header" name="accept" type="string" required="false" %}
application/json
{% endswagger-parameter %}

{% swagger-parameter in="body" name="apiKey" type="string" required="false" %}
BetterForms network API key
{% endswagger-parameter %}

{% swagger-parameter in="body" name="users" type="string" required="false" %}
array of user IDs and channels to join those users to
{% endswagger-parameter %}

{% swagger-parameter in="body" name="users[0].id" type="string" required="false" %}
BF user id from helper file
{% endswagger-parameter %}

{% swagger-parameter in="body" name="users[0].channels" type="array" required="false" %}
an array of channel objects
{% endswagger-parameter %}

{% swagger-response status="201" description="" %}
```
{
    "users": [
        "USER_1_ID",
        "USER_2_ID"
    ]
}
```
{% endswagger-response %}
{% endswagger %}

## Joining Anonymous Channels

Users can only be joined to anonymous channels directly from the browser. The current browser tab that executes the action will be the one added to the channel.

A user can be joined to an anonymous channel via a [BF action ](../actions-processor/)called **channelJoinAnon.**

**Example:**

```
{
    "action": "channelJoinAnon",
    "options": {
        "channel": "anonymousChatRoom"
    }
}
```

**Learn more:**

{% content-ref url="../actions-processor/actions_overview/channeljoinanonymous.md" %}
[channeljoinanonymous.md](../actions-processor/actions\_overview/channeljoinanonymous.md)
{% endcontent-ref %}
