---
description: >-
  Similar to adding users, you can remove users either by a REST API call, or
  via a FileMaker script in your helper file.
---

# Removing users from channels

## Removing users using a FileMaker script

The script is available in Helper file and is called **API - Leave Channel**. This script accepts an object with two keys **`users`** and **`channels`**.

* `users`: it accepts a string with an **user ID** or an **array of users ID**
* `channels`: it accepts an object with **name** and **mode (optional)** or an **array of objects**, with the same shape.

#### Examples

{% tabs %}
{% tab title="Single User/Channel" %}
```
{
    "users": "USER_ID",
    "channels":
    {
        "name": "channel1",
        "mode": "ignore"
    }
}
```
{% endtab %}

{% tab title="Multiple Users/Channels" %}
```
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
            "mode": "ignore"
        }
    ]
}
```
{% endtab %}
{% endtabs %}

## API: Remove User from Channel

<mark style="color:green;">`POST`</mark> `https://portal.yourdomain.com/message/removeuser`

You can use this method to remove one or more users from channels. You must pass the API key generated for your app to authenticate this reqeust.

#### Headers

| Name         | Type   | Description      |
| ------------ | ------ | ---------------- |
| content-type | string | application/json |
| accept       | string | application/json |

#### Request Body

| Name               | Type   | Description                                                  |
| ------------------ | ------ | ------------------------------------------------------------ |
| apiKey             | string | The API key generated for your BF app                        |
| users              | array  | array of user/channel objects                                |
| users\[0].id       | string | BF user id from the users table in the helper file           |
| users\[0].channels | array  | any array of channel objects                                 |

{% tabs %}
{% tab title="201 " %}
```
{
    "users": [
        "USER_1_ID",
        "USER_2_ID"
    ]
}
```
{% endtab %}
{% endtabs %}

#### Example request body

```json
{
  "apiKey": "BFAPI_GENERATED-API-KEY",
  "users": [
    {
      "id": "USER_1_ID",
      "channels": [
        {
          "name": "channel1"
        }
      ]
    },
    {
      "id": "USER_2_ID",
      "channels": [
        {
          "name": "channel1"
        },
        {
          "name": "channel2"
        }
      ]
    }
  ]
}
```

## Notes

- The REST endpoint expects `users` to be an **array of objects**.
- Each object contains the user `id` plus the `channels` to remove for that user.
- This differs from the helper-file script shape earlier on this page, which accepts top-level `users` and `channels` keys separately.

## Leaving Anonymous Channels

Users can only be removed from anonymous channels directly from the browser. The current browser tab that executes the action will be the one removed from the channel.

A user can be removed from an anonymous channel via a [BF action ](../../reference/actions-processor/)called **channelLeaveAnon.**

**Example:**

```
{
    "action": "channelLeaveAnon",
    "options": {
        "channel": "anonymousChatRoom"
    }
}
```

**Learn more:**

{% content-ref url="../../reference/actions-processor/actions_overview/channelleaveanon.md" %}
[channelleaveanon.md](../../reference/actions-processor/actions_overview/channelleaveanon.md)
{% endcontent-ref %}
