# Adding users to channels

## Authenticated channels

{% hint style="info" %}
**Helper Update Needed**  
You will need to update your helper file to the latest version to support the new channels API.
{% endhint %}

There are two different ways to add users to channels by directly calling the FM BetterForms network API endpoint or using the `messages`  FileMaker API scripts located in the helper file.

#### Channel Modes

Channels can be set to three different modes: **ignore**, **listen** or **receive**.

* **ignore**: messages sent from browser to browser, not passing through FileMaker Server;
* **listen**: messages are sent from browser to browser but FileMaker Server receives the message as well;
* **receive**: messages are sent from browser to FileMaker Server, and messages can be sent later via /message/sendmessage endpoint.

| Channel Mode | Scope | Description |
| :--- | :--- | :--- |
| **ignore** | anonymous, authenticated | messages sent from browser to browser, not passing through FileMaker Server. |
| **listen** | authenticated only | messages are sent from browser to browser but FileMaker Server receives the message as well. |
| **receive** | authenticated only | messages are sent from browser to FileMaker Server and not broadcast directly to the channel. Messages can be sent later via the FM messages script API:`/message/sendmessage` endpoint. |

### Adding users 

#### FileMaker Script: **API - Join Channel** 

The  **`API - Join Channel`** script  accepts an object with two keys **users** and **channels**.

* `users`: it accepts a string with a **user ID** _or_ an **array of user IDs**
* `channels`: it accepts an object with **name** and **mode** _or_ an **array of objects**, with the same shape.

{% hint style="warning" %}
**TIP**:  The user `id` is the id of the user in the helper file, not your business file.x
{% endhint %}

#### Example Script Parameters

* `users` as string and channels as one object

```text
{
    "users": "USER_ID",
    "channels":
    {
        "name": "channel1",
        "mode": "ignore"
    }
}
```

* Users and channels as arrays

```text
{
    "users":
    [
        "USER_ID_1",
        "USER_ID_2"
    ],
    "channels":
    [
        {
            "name": "channel1",
            "mode": "ignore"
        },
        {
            "name": "channel2",
            "mode": "receive"
        }
    ]
}
```

### API endpoint: /message/adduser

In order to add users to channels via BetterForms network API endpoint you must make an authenticated request to the BetterForms network and pass your app's API key.  This API key needs to be sent in the body of the POST request with an array of users, as shown in the example below.

* URL Address: https://**YOUR.DOMAIN.com/message/adduser**;
* Set headers:
  * Accept = application/json
  * Content-type = application/json
* Body content:

```text
{
    "users": [
        {
            "id": "USER-ID-FROM-USERS-TABLE",
            "channels": [
                {
                    "name": "channel1",
                    "mode": "ignore"
                },
                {
                    "name": "channel2",
                    "mode": "listen"
                }
            ]
        },
        {
            "id": "USER-ID-FROM-USERS-TABLE",
            "channels": [
                {
                    "name": "channel2",
                    "mode": "ignore"
                }
            ]
        }
    ],
    "apiKey": "BFAPI_GENERATED-API-KEY"
}
```

## Anonymous channels

This type of channel is not saved in the users table, as users connected to these channels are not authenticated. The current browser tab that executes the action will be the one added to the channel.

A user can be joined to an anonymous channel via a [BF action ](../actions-processor/)called **channelJoinAnonymous**. This action requires two options:

* apiKey
* channel

#### Example

```text
{
    "action": "channelJoinAnonymous",
    "options": {
        "apiKey": "BFAPI_GENERATED-API-KEY",
        "channel": "anonymousChatRoom"
    }
}
```

More information on **channelJoinAnonymous** action [here](../actions-processor/actions_overview/channeljoinanonymous.md).

