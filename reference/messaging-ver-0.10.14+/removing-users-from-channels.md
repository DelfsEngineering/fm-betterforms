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

{% swagger baseUrl="https://yourdomain.com" path="/message/removeuser" method="post" summary="API: Remove User from Channel" %}
{% swagger-description %}
You can use this method to remove one or more users from channels. You must pass the API key generated for your app to authenticate this reqeust.
{% endswagger-description %}

{% swagger-parameter in="header" name="content-type" type="string" %}
application/json
{% endswagger-parameter %}

{% swagger-parameter in="header" name="accept" type="string" %}
application/json
{% endswagger-parameter %}

{% swagger-parameter in="body" name="apiKey" type="string" %}
The API key generated for your BF app
{% endswagger-parameter %}

{% swagger-parameter in="body" name="users" type="array" %}
array of user IDs and channels to be removed for those users
{% endswagger-parameter %}

{% swagger-parameter in="body" name="users[0].id" type="string" %}
BF user id from the users table in the helper file
{% endswagger-parameter %}

{% swagger-parameter in="body" name="users[0].channels" type="array" %}
any array of channel objects
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

## Leaving Anonymous Channels

Users can only be removed from anonymous channels directly from the browser. The current browser tab that executes the action will be the one removed from the channel.

A user can be joined to an anonymous channel via a [BF action ](../actions-processor/)called **channelLeaveAnon.**

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

{% content-ref url="../actions-processor/actions_overview/channelleaveanon.md" %}
[channelleaveanon.md](../actions-processor/actions\_overview/channelleaveanon.md)
{% endcontent-ref %}
