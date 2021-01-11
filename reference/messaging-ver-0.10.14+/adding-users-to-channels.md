# Adding users to channels

## Authenticated channels

A new field **channels** needs to be added to the users table \(Helper file\). This field must save a JSON object in string format.

There are two different ways to add users to channels by directly calling our API endpoint or using our FileMaker API script.

Channels can be set to three different modes \(**authenticated channels only, anonymous channels use ignore mode**\): ignore, listen or receive.

* **ignore**: messages sent from browser to browser, not passing through FileMaker Server;
* **listen**: messages are sent from browser to browser but FileMaker Server receives the message as well;
* **receive**: messages are sent from browser to FileMaker Server, and messages can be sent later via /message/sendmessage endpoint.

### FileMaker API script

The script is available in Helper file and is called **API - Join Channel**. This script accepts an object with two keys **users** and **channels**.

* users: it accepts a string with a **user ID** or an **array of user IDs**;
* channels: it accepts an object with **name** and **mode** or an **array of objects**, with the same shape.

#### Examples

* Users as string and channels as one object

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

### API endpoint /message/adduser

In order to add users to channels via API endpoint, an API needs to be generated for the app. This API key needs to be sent in the body of the POST request with an array of users, as shown in the example below.

* Address: https://**YOUR.DOMAIN.com/message/adduser**;
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

A user can be joined to an anonymous channel via a BF action called **channelJoinAnonymous**. This action requires two options:

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

