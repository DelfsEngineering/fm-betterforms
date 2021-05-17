---
description: >-
  Similar to adding users, you can remove users either by a REST API call, or
  via a FileMaker script in your helper file.
---

# Removing users from channels

## Removing users using a FileMaker script

The script is available in Helper file and is called **API - Leave Channel**. This script accepts an object with two keys **`users`** and **`channels`**.

* `users`: it accepts a string with an **user ID** or an **array of users ID**
* `channels`: it accepts an object with **name** and **mode \(optional\)** or an **array of objects**, with the same shape.

#### Examples

{% tabs %}
{% tab title="Single User/Channel" %}
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

{% api-method method="post" host="https://yourdomain.com" path="/message/removeuser" %}
{% api-method-summary %}
API: Remove User from Channel
{% endapi-method-summary %}

{% api-method-description %}
You can use this method to remove one or more users from channels. You must pass the API key generated for your app to authenticate this reqeust.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="content-type" type="string" required=true %}
application/json
{% endapi-method-parameter %}

{% api-method-parameter name="accept" type="string" required=true %}
application/json
{% endapi-method-parameter %}
{% endapi-method-headers %}

{% api-method-body-parameters %}
{% api-method-parameter name="apiKey" type="string" required=true %}
The API key generated for your BF app
{% endapi-method-parameter %}

{% api-method-parameter name="users" type="array" required=true %}
array of user IDs and channels to be removed for those users
{% endapi-method-parameter %}

{% api-method-parameter name="users\[0\].id" type="string" required=true %}
BF user id from the users table in the helper file
{% endapi-method-parameter %}

{% api-method-parameter name="users\[0\].channels" type="array" required=true %}
any array of channel objects
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=201 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
    "users": [
        "USER_1_ID",
        "USER_2_ID"
    ]
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

## Leaving Anonymous Channels

Users can only be removed from anonymous channels directly from the browser. The current browser tab that executes the action will be the one removed from the channel.

A user can be joined to an anonymous channel via a [BF action ](../actions-processor/)called **channelLeaveAnon.**

**Example:**

```text
{
    "action": "channelLeaveAnon",
    "options": {
        "channel": "anonymousChatRoom"
    }
}
```

**Learn more:**

{% page-ref page="../actions-processor/actions\_overview/channelleaveanon.md" %}

