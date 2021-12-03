# Get connected users

The API endpoint `/message/users` will return all users connected to all or specific active channels, which means channels that currently have at least one user listening to it.

A channel is considered active if there is at least one client connected to it.

{% swagger baseUrl="https://yourdomain.com" path="/message/users" method="post" summary="API: Return connected users" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="accept" type="string" %}
application/json
{% endswagger-parameter %}

{% swagger-parameter in="header" name="content-type" type="string" %}
application/json
{% endswagger-parameter %}

{% swagger-parameter in="body" name="apiKey" type="string" %}
the API key for your BF app 
{% endswagger-parameter %}

{% swagger-parameter in="body" name="channel" type="string" %}
if set, will only return users connected to this channel
{% endswagger-parameter %}

{% swagger-response status="201" description="Returns an object with an array of users for each current active channel. The array consists of objects with user ID and email.
For anonymous channels, it returns the total of clients connected to each channel." %}
```yaml
{
    "authenticated": [
        {
            "id": "USER1-HELPER-FILE-ID",
            "email": "user1@email.com"
        },
        {
            "id": "USER2-HELPER-FILE-ID",
            "email": "user2@email.com"
        },
        {
            "id": "USER3-HELPER-FILE-ID",
            "email": "user3@email.com"
        }
    ],
    "myChannel": [
        {
            "id": "USER1-HELPER-FILE-ID",
            "email": "user1@email.com"
        },
        {
            "id": "USER4-HELPER-FILE-ID",
            "email": "user4@email.com"
        }
    ],
    "tab|connectionID1": [
        {
            "id": "USER1-HELPER-FILE-ID",
            "email": "user1@email.com"
        }
    ]
    "tab|connectionID2": 1,
    "tab|connectionID3": 1
    "anonymous": 2,
    "myAnonymousChannel": 4
}
```
{% endswagger-response %}
{% endswagger %}
