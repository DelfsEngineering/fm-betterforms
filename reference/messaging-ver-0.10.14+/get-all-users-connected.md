# Get connected users

The API endpoint `/message/users` will return all users connected to all or specific active channels, which means channels that currently have at least one user listening to it.

A channel is considered active if there is at least one client connected to it.

{% api-method method="post" host="https://yourdomain.com" path="/message/users" %}
{% api-method-summary %}
API: Return connected users
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
the API key for your BF app 
{% endapi-method-parameter %}

{% api-method-parameter name="channel" type="string" required=false %}
if set, will only return users connected to this channel
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=201 %}
{% api-method-response-example-description %}
Returns an object with an array of users for each current active channel. The array consists of objects with user ID and email.  
For anonymous channels, it returns the total of clients connected to each channel.
{% endapi-method-response-example-description %}

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
    ]
    "anonymous": 2,
    "myAnonymousChannel": 4
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

